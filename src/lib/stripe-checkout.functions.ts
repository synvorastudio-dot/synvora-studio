import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { isProposalPayable } from "@/lib/project-proposal";
import {
  fetchProjectBriefByProjectId,
  fetchProjectProposal,
  fulfillProposalPayment,
  markProposalPaymentPending,
} from "@/lib/stripe/fulfillment";
import { getSiteUrl, isStripeConfigured } from "@/lib/stripe/env";
import { createStripeClient } from "@/lib/stripe/server";

const checkoutInputSchema = z.object({
  projectId: z
    .string()
    .trim()
    .regex(/^SYN-[0-9]{8}-[A-Z0-9]{6}$/),
  origin: z.string().url().optional(),
});

const confirmInputSchema = z.object({
  projectId: z
    .string()
    .trim()
    .regex(/^SYN-[0-9]{8}-[A-Z0-9]{6}$/),
  sessionId: z.string().trim().min(1).max(255),
});

function resolveOrigin(origin?: string): string {
  return (origin ?? getSiteUrl()).replace(/\/$/, "");
}

function depositToStripeCents(amountEur: number): number {
  return Math.round(amountEur * 100);
}

export const createStripeCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => checkoutInputSchema.parse(data))
  .handler(async ({ data }) => {
    if (!isStripeConfigured()) {
      throw new Error(
        "Secure payments are not configured yet. Please contact Synvora to complete your deposit.",
      );
    }

    const project = await fetchProjectBriefByProjectId(data.projectId);
    if (!project) {
      throw new Error("Project not found.");
    }

    const proposal = await fetchProjectProposal(project.id);
    if (!proposal || !isProposalPayable(proposal)) {
      throw new Error("This proposal is not ready for payment yet.");
    }

    const depositCents = depositToStripeCents(proposal.deposit_amount_eur);
    if (depositCents < 50) {
      throw new Error("Deposit amount must be at least €0.50.");
    }

    const origin = resolveOrigin(data.origin);
    const successUrl = `${origin}/my-project/${data.projectId}?payment=success&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/my-project/${data.projectId}?payment=cancelled`;

    const stripe = createStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "eur",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: depositCents,
            product_data: {
              name: proposal.title,
              description: `Project deposit · Total project ${proposal.total_price_eur.toLocaleString("en-IE", { style: "currency", currency: "EUR" })} · Delivery ${proposal.estimated_delivery}`,
            },
          },
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: project.project_id,
      metadata: {
        project_id: project.project_id,
        project_brief_id: project.id,
        proposal_id: proposal.id,
      },
    });

    if (!session.url) {
      throw new Error("Unable to start secure checkout. Please try again.");
    }

    await markProposalPaymentPending(proposal.id, session.id);

    return {
      url: session.url,
      sessionId: session.id,
    };
  });

export const confirmStripeCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => confirmInputSchema.parse(data))
  .handler(async ({ data }) => {
    if (!isStripeConfigured()) {
      return { ok: false as const, reason: "stripe_not_configured" as const };
    }

    const project = await fetchProjectBriefByProjectId(data.projectId);
    if (!project) {
      throw new Error("Project not found.");
    }

    const proposal = await fetchProjectProposal(project.id);
    if (!proposal) {
      return { ok: false as const, reason: "proposal_not_found" as const };
    }

    if (proposal.payment_status === "paid") {
      return { ok: true as const, alreadyPaid: true as const };
    }

    const stripe = createStripeClient();
    const session = await stripe.checkout.sessions.retrieve(data.sessionId);

    if (session.metadata?.project_id !== data.projectId) {
      throw new Error("Checkout session does not match this project.");
    }

    if (session.metadata?.proposal_id !== proposal.id) {
      throw new Error("Checkout session does not match this proposal.");
    }

    if (session.payment_status !== "paid") {
      return { ok: false as const, reason: "payment_not_completed" as const };
    }

    await fulfillProposalPayment(proposal.id, session.id);
    return { ok: true as const, alreadyPaid: false as const };
  });
