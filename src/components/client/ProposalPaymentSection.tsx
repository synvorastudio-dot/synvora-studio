import { useState } from "react";
import { CheckCircle2, CreditCard, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import {
  formatEur,
  getPaymentStatusLabel,
  getProposalStatusLabel,
  isProposalPayable,
  isProposalVisibleToClient,
  type ProjectProposalRow,
} from "@/lib/project-proposal";
import { createStripeCheckoutSession } from "@/lib/stripe-checkout.functions";

type ProposalPaymentSectionProps = {
  projectId: string;
  proposal: ProjectProposalRow | null;
  paymentBanner?: "success" | "cancelled" | null;
};

export function ProposalPaymentSection({
  projectId,
  proposal,
  paymentBanner,
}: ProposalPaymentSectionProps) {
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  async function handlePaySecurely() {
    setPayError(null);
    setPaying(true);

    try {
      const result = await createStripeCheckoutSession({
        data: {
          projectId,
          origin: window.location.origin,
        },
      });

      window.location.href = result.url;
    } catch (error) {
      setPayError(
        error instanceof Error
          ? error.message
          : "Unable to start secure checkout. Please try again.",
      );
      setPaying(false);
    }
  }

  const showProposal = proposal && isProposalVisibleToClient(proposal);
  const isPaid =
    proposal?.payment_status === "paid" || proposal?.proposal_status === "paid";
  const canPay = proposal ? isProposalPayable(proposal) : false;

  return (
    <section className="relative overflow-hidden rounded-3xl glass-strong p-6 md:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.22 250 / 0.28), transparent 70%)",
        }}
      />

      <div className="relative flex items-start gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg hairline bg-[var(--surface-elevated)] text-[var(--electric)]">
          <CreditCard className="h-3.5 w-3.5" />
        </span>
        <div>
          <div className="font-display text-[16px] tracking-[-0.01em] text-foreground">
            Proposal &amp; Payment
          </div>
          <div className="mt-0.5 text-[12px] text-muted-foreground">
            Review your tailored scope and secure your project deposit.
          </div>
        </div>
      </div>

      {paymentBanner === "success" && (
        <div className="relative mt-6 rounded-2xl border border-[color:var(--electric)] bg-[oklch(0.72_0.22_250/0.08)] px-4 py-3 text-[13px] text-foreground">
          <div className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--electric)]" />
            <div>
              <div className="font-medium">Deposit received</div>
              <div className="mt-1 text-foreground/80">
                Payment confirmed. Your project is now moving into Discovery.
              </div>
            </div>
          </div>
        </div>
      )}

      {paymentBanner === "cancelled" && (
        <div className="relative mt-6 rounded-2xl hairline bg-[var(--surface)] px-4 py-3 text-[13px] text-muted-foreground">
          Checkout was cancelled. You can resume payment whenever you&apos;re ready.
        </div>
      )}

      {!showProposal && (
        <div className="relative mt-8 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl hairline bg-[var(--surface-elevated)] text-[var(--electric)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <p className="mt-4 text-[14px] leading-relaxed text-foreground/90">
            Your tailored proposal is being prepared.
          </p>
          <p className="mt-2 text-[12.5px] text-muted-foreground">
            Our team will publish pricing, deposit terms, and delivery timing here.
          </p>
        </div>
      )}

      {showProposal && (
        <div className="relative mt-8 space-y-6">
          {isPaid && (
            <div className="flex flex-col items-center rounded-2xl border border-[color:var(--electric)] bg-[oklch(0.72_0.22_250/0.08)] px-6 py-8 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-[color:var(--electric)] bg-[var(--electric)] text-black">
                <CheckCircle2 className="h-7 w-7" strokeWidth={2} />
              </div>
              <div className="mt-4 font-display text-[24px] tracking-[-0.02em] text-electric-gradient">
                Paid
              </div>
              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-foreground/80">
                Your deposit has been received. Synvora has activated Discovery for
                your project.
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Proposal
              </div>
              <h3 className="mt-1.5 font-display text-[20px] tracking-[-0.02em] text-foreground md:text-[22px]">
                {proposal.title}
              </h3>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${
                isPaid
                  ? "border border-[color:var(--electric)] bg-[oklch(0.72_0.22_250/0.12)] text-foreground"
                  : "hairline bg-white/[0.03] text-foreground/85"
              }`}
            >
              {isPaid ? "Paid" : getProposalStatusLabel(proposal)}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard
              label="Total project price"
              value={formatEur(proposal.total_price_eur)}
            />
            <MetricCard
              label="Deposit due now"
              value={formatEur(proposal.deposit_amount_eur)}
              highlight={!isPaid}
            />
            <MetricCard label="Delivery estimate" value={proposal.estimated_delivery} />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl hairline bg-[var(--surface)] px-4 py-3">
            <div className="text-[12px] text-muted-foreground">
              Payment status:{" "}
              <span
                className={
                  isPaid ? "font-medium text-[var(--electric)]" : "text-foreground/90"
                }
              >
                {getPaymentStatusLabel(proposal.payment_status)}
              </span>
            </div>
            {isPaid && (
              <div className="inline-flex items-center gap-1.5 text-[12px] text-[var(--electric)]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secured via Stripe
              </div>
            )}
          </div>

          {canPay && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-[12.5px] leading-relaxed text-muted-foreground">
                Pay your deposit securely through Stripe Checkout. Once confirmed,
                Synvora advances your project into Discovery.
              </p>
              <button
                type="button"
                onClick={handlePaySecurely}
                disabled={paying}
                className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition disabled:cursor-not-allowed disabled:opacity-50 hover:-translate-y-px"
              >
                {paying ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Redirecting…
                  </>
                ) : (
                  <>
                    Pay Securely
                    <CreditCard className="h-3.5 w-3.5 transition group-hover:-translate-y-px group-hover:translate-x-px" />
                  </>
                )}
              </button>
            </div>
          )}

          {payError && (
            <div className="rounded-xl hairline bg-[oklch(0.5_0.2_25/0.08)] px-4 py-3 text-[12.5px] text-[oklch(0.85_0.15_25)]">
              {payError}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function MetricCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight
          ? "border-[color:var(--electric)] bg-[oklch(0.72_0.22_250/0.05)]"
          : "border-[var(--hairline)] bg-[var(--surface)]"
      }`}
    >
      <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div
        className={`mt-2 font-display text-[18px] tracking-[-0.02em] ${
          highlight ? "text-electric-gradient" : "text-foreground"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
