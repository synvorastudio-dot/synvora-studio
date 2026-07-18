import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import { fulfillProposalPayment, markProposalPaymentFailed, resetProposalPaymentToUnpaid } from "@/lib/stripe/fulfillment";
import { getStripeWebhookSecret, isStripeWebhookConfigured } from "@/lib/stripe/env";
import { createStripeClient } from "@/lib/stripe/server";

export const Route = createFileRoute("/api/stripe/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isStripeWebhookConfigured()) {
          return new Response("Stripe webhook is not configured.", { status: 503 });
        }

        const signature = request.headers.get("stripe-signature");
        if (!signature) {
          return new Response("Missing Stripe signature.", { status: 400 });
        }

        const payload = await request.text();
        const stripe = createStripeClient();
        const webhookSecret = getStripeWebhookSecret();

        if (!webhookSecret) {
          return new Response("Stripe webhook secret is missing.", { status: 503 });
        }

        let event: Stripe.Event;
        try {
          event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Invalid webhook signature.";
          console.error("[stripe] webhook signature verification failed", message);
          return new Response(message, { status: 400 });
        }

        try {
          if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const proposalId = session.metadata?.proposal_id;

            if (proposalId && session.payment_status === "paid") {
              await fulfillProposalPayment(proposalId, session.id);
            }
          }

          if (event.type === "checkout.session.async_payment_failed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const proposalId = session.metadata?.proposal_id;
            if (proposalId) {
              await markProposalPaymentFailed(proposalId);
            }
          }

          if (event.type === "checkout.session.expired") {
            const session = event.data.object as Stripe.Checkout.Session;
            const proposalId = session.metadata?.proposal_id;
            if (proposalId) {
              await resetProposalPaymentToUnpaid(proposalId);
            }
          }
        } catch (error) {
          console.error("[stripe] webhook handler failed", error);
          return new Response("Webhook handler failed.", { status: 500 });
        }

        return Response.json({ received: true });
      },
    },
  },
});
