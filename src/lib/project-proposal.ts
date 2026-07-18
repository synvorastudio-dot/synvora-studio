export type ProposalStatus = "draft" | "ready" | "accepted" | "paid";

export type PaymentStatus = "unpaid" | "pending" | "paid" | "failed";

export type ProjectProposalRow = {
  id: string;
  project_brief_id: string;
  title: string;
  total_price_eur: number;
  deposit_amount_eur: number;
  estimated_delivery: string;
  proposal_status: ProposalStatus;
  stripe_checkout_session_id: string | null;
  payment_status: PaymentStatus;
  created_at: string;
  updated_at: string;
};

export function formatEur(amount: number): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function isProposalPayable(proposal: ProjectProposalRow): boolean {
  return (
    (proposal.proposal_status === "ready" || proposal.proposal_status === "accepted") &&
    (proposal.payment_status === "unpaid" || proposal.payment_status === "failed")
  );
}

export function isProposalVisibleToClient(proposal: ProjectProposalRow | null): boolean {
  if (!proposal) return false;
  return proposal.proposal_status !== "draft";
}

export function getProposalStatusLabel(proposal: ProjectProposalRow): string {
  if (proposal.payment_status === "paid" || proposal.proposal_status === "paid") {
    return "Deposit paid";
  }
  if (proposal.payment_status === "pending") {
    return "Payment processing";
  }
  if (proposal.payment_status === "failed") {
    return "Payment failed";
  }
  if (proposal.proposal_status === "ready" || proposal.proposal_status === "accepted") {
    return "Ready for payment";
  }
  return "In preparation";
}

export function getPaymentStatusLabel(status: PaymentStatus): string {
  switch (status) {
    case "paid":
      return "Paid";
    case "pending":
      return "Pending";
    case "failed":
      return "Failed";
    default:
      return "Unpaid";
  }
}
