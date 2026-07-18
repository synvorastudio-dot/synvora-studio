import type { ProjectBriefInput } from "@/lib/project-brief.functions";
import { generateProposalFromBrief } from "@/lib/generate-project-proposal";
import type { ProjectProposalRow } from "@/lib/project-proposal";
import {
  fetchProjectProposal,
  isMissingProjectProposalsTableError,
} from "@/lib/stripe/fulfillment";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function parseBriefPayload(brief: unknown): ProjectBriefInput | null {
  if (!brief || typeof brief !== "object") return null;

  const candidate = brief as Partial<ProjectBriefInput>;
  if (
    !candidate.service ||
    !candidate.industry ||
    !candidate.complexity ||
    !candidate.estimate ||
    !candidate.contact
  ) {
    return null;
  }

  return candidate as ProjectBriefInput;
}

export async function createProjectProposalFromBrief(
  projectBriefId: string,
  brief: ProjectBriefInput,
): Promise<void> {
  const supabase = createServerSupabaseClient();
  const proposal = generateProposalFromBrief(projectBriefId, brief);

  const { error } = await supabase.from("project_proposals").insert(proposal);

  if (error) {
    if (isMissingProjectProposalsTableError(error)) {
      console.warn(
        "[project-proposal] project_proposals table unavailable — proposal not saved",
      );
      return;
    }

    if (error.code === "23505") {
      return;
    }

    console.error("[project-proposal] insert failed", error);
    throw new Error("Unable to generate project proposal.");
  }
}

export async function ensureProjectProposal(
  projectBriefId: string,
  brief: unknown,
): Promise<ProjectProposalRow | null> {
  const existing = await fetchProjectProposal(projectBriefId);
  if (existing) return existing;

  const parsedBrief = parseBriefPayload(brief);
  if (!parsedBrief) return null;

  try {
    await createProjectProposalFromBrief(projectBriefId, parsedBrief);
  } catch (error) {
    console.error("[project-proposal] ensure failed", error);
    return null;
  }

  return fetchProjectProposal(projectBriefId);
}
