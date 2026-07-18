import type { PostgrestError } from "@supabase/supabase-js";
import {
  DISCOVERY_STAGE_ID,
  getStageMetadata,
  type ProjectBriefRow,
} from "@/lib/client-project";
import type { ProjectProposalRow } from "@/lib/project-proposal";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export function isMissingProjectProposalsTableError(
  error: PostgrestError | null | undefined,
): boolean {
  if (!error) return false;
  return (
    error.code === "PGRST205" ||
    error.message.includes("Could not find the table 'public.project_proposals'")
  );
}

export async function fetchProjectProposal(
  projectBriefId: string,
): Promise<ProjectProposalRow | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("project_proposals")
    .select(
      "id, project_brief_id, title, total_price_eur, deposit_amount_eur, estimated_delivery, proposal_status, stripe_checkout_session_id, payment_status, created_at, updated_at",
    )
    .eq("project_brief_id", projectBriefId)
    .maybeSingle();

  if (error) {
    if (isMissingProjectProposalsTableError(error)) {
      console.warn("[project-proposal] project_proposals table unavailable");
      return null;
    }

    console.error("[project-proposal] fetch failed", error);
    throw new Error("Unable to load proposal details. Please try again.");
  }

  if (!data) return null;

  return {
    ...data,
    total_price_eur: Number(data.total_price_eur),
    deposit_amount_eur: Number(data.deposit_amount_eur),
  };
}

export async function fulfillProposalPayment(
  proposalId: string,
  checkoutSessionId: string,
): Promise<void> {
  const supabase = createServerSupabaseClient();

  const { data: proposal, error: proposalError } = await supabase
    .from("project_proposals")
    .select("id, project_brief_id, payment_status")
    .eq("id", proposalId)
    .maybeSingle();

  if (proposalError) {
    console.error("[stripe] proposal lookup failed", proposalError);
    throw new Error("Unable to locate proposal for payment fulfillment.");
  }

  if (!proposal) {
    throw new Error("Proposal not found for payment fulfillment.");
  }

  if (proposal.payment_status === "paid") {
    return;
  }

  const discoveryStage = getStageMetadata(DISCOVERY_STAGE_ID);

  const { error: proposalUpdateError } = await supabase
    .from("project_proposals")
    .update({
      payment_status: "paid",
      proposal_status: "paid",
      stripe_checkout_session_id: checkoutSessionId,
    })
    .eq("id", proposalId);

  if (proposalUpdateError) {
    console.error("[stripe] proposal update failed", proposalUpdateError);
    throw new Error("Unable to mark proposal as paid.");
  }

  const { error: briefUpdateError } = await supabase
    .from("project_briefs")
    .update({ current_stage_id: DISCOVERY_STAGE_ID })
    .eq("id", proposal.project_brief_id);

  if (briefUpdateError) {
    console.error("[stripe] project stage update failed", briefUpdateError);
    throw new Error("Unable to advance project to Discovery.");
  }

  const { error: progressError } = await supabase.from("project_progress").upsert(
    {
      project_brief_id: proposal.project_brief_id,
      stage_id: DISCOVERY_STAGE_ID,
      status: "in_progress",
      description: discoveryStage.description,
      progress_percentage: 0,
      completed_at: null,
    },
    { onConflict: "project_brief_id,stage_id" },
  );

  if (progressError) {
    console.warn("[stripe] discovery progress upsert failed", progressError);
  }
}

export async function markProposalPaymentPending(
  proposalId: string,
  checkoutSessionId: string,
): Promise<void> {
  const supabase = createServerSupabaseClient();
  const { error } = await supabase
    .from("project_proposals")
    .update({
      payment_status: "pending",
      stripe_checkout_session_id: checkoutSessionId,
    })
    .eq("id", proposalId);

  if (error) {
    console.error("[stripe] pending payment update failed", error);
    throw new Error("Unable to update proposal payment status.");
  }
}

export async function fetchProjectBriefByProjectId(
  projectId: string,
): Promise<ProjectBriefRow | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("project_briefs")
    .select("id, project_id, received_at, summary, brief, current_stage_id")
    .eq("project_id", projectId)
    .maybeSingle();

  if (error) {
    console.error("[stripe] brief lookup failed", error);
    throw new Error("Unable to load project for payment.");
  }

  return data;
}
