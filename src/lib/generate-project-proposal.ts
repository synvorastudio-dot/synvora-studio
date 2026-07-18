import type { ProjectBriefInput } from "@/lib/project-brief.functions";
import type { PaymentStatus, ProposalStatus } from "@/lib/project-proposal";

export type GeneratedProjectProposal = {
  project_brief_id: string;
  title: string;
  total_price_eur: number;
  deposit_amount_eur: number;
  estimated_delivery: string;
  proposal_status: ProposalStatus;
  payment_status: PaymentStatus;
};

function roundToNearest(value: number, step: number): number {
  return Math.round(value / step) * step;
}

export function generateProposalFromBrief(
  projectBriefId: string,
  brief: ProjectBriefInput,
): GeneratedProjectProposal {
  const totalPrice = roundToNearest(
    (brief.estimate.min + brief.estimate.max) / 2,
    100,
  );
  const rawDeposit = totalPrice * 0.2;
  const depositAmount = Math.min(
    totalPrice,
    Math.max(50, roundToNearest(rawDeposit, 50)),
  );

  const delivery =
    brief.estimate.minDays === brief.estimate.maxDays
      ? `${brief.estimate.minDays} days`
      : `${brief.estimate.minDays}–${brief.estimate.maxDays} days`;

  const title = `${brief.service.label} — ${brief.industry}`;

  return {
    project_brief_id: projectBriefId,
    title,
    total_price_eur: totalPrice,
    deposit_amount_eur: depositAmount,
    estimated_delivery: delivery,
    proposal_status: "ready",
    payment_status: "unpaid",
  };
}
