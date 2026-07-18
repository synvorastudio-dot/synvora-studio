import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  BRIEF_RECEIVED_STAGE_ID,
  buildStageTimeline,
  createBriefReceivedProgressInsert,
  createBriefReceivedProgressRow,
  type ClientProjectStageView,
  type ProjectBriefRow,
  type ProjectProgressRow,
} from "@/lib/client-project";
import type { ProjectProposalRow } from "@/lib/project-proposal";
import { fetchProjectProposal } from "@/lib/stripe/fulfillment";
import {
  ensureProjectProgressSchema,
  isMissingProjectProgressTableError,
} from "@/lib/supabase/ensure-project-progress-schema";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseServerConfigured } from "@/lib/supabase/env";

const projectIdSchema = z.object({
  projectId: z
    .string()
    .trim()
    .min(1)
    .max(64)
    .regex(/^SYN-[0-9]{8}-[A-Z0-9]{6}$/),
});

export type ClientProjectDashboardData = {
  project: ProjectBriefRow;
  stages: ClientProjectStageView[];
  proposal: ProjectProposalRow | null;
};

async function fetchProjectBrief(projectId: string): Promise<ProjectBriefRow | null> {
  const supabase = createServerSupabaseClient();
  const { data: row, error } = await supabase
    .from("project_briefs")
    .select("id, project_id, received_at, summary, brief, current_stage_id")
    .eq("project_id", projectId)
    .maybeSingle();

  if (error) {
    console.error("[project-progress] brief fetch failed", error);
    throw new Error("Unable to load your project. Please try again.");
  }

  return row;
}

async function fetchProgressRows(projectBriefId: string): Promise<ProjectProgressRow[]> {
  await ensureProjectProgressSchema();

  const supabase = createServerSupabaseClient();
  const { data: rows, error } = await supabase
    .from("project_progress")
    .select(
      "id, project_brief_id, stage_id, status, description, progress_percentage, completed_at",
    )
    .eq("project_brief_id", projectBriefId)
    .order("created_at", { ascending: true });

  if (error) {
    if (isMissingProjectProgressTableError(error)) {
      console.warn(
        "[project-progress] project_progress table unavailable — using brief-derived fallback",
      );
      return [];
    }

    console.error("[project-progress] progress fetch failed", error);
    throw new Error("Unable to load project progress. Please try again.");
  }

  return rows ?? [];
}

async function ensureInitialProgress(
  project: ProjectBriefRow,
): Promise<ProjectProgressRow[]> {
  const existing = await fetchProgressRows(project.id);
  if (existing.length > 0) return existing;

  const schemaReady = await ensureProjectProgressSchema();
  if (!schemaReady) {
    return [createBriefReceivedProgressRow(project)];
  }

  const supabase = createServerSupabaseClient();
  const insert = createBriefReceivedProgressInsert(project.id, project.received_at);

  const { data: row, error } = await supabase
    .from("project_progress")
    .insert(insert)
    .select(
      "id, project_brief_id, stage_id, status, description, progress_percentage, completed_at",
    )
    .single();

  if (error) {
    if (isMissingProjectProgressTableError(error)) {
      return [createBriefReceivedProgressRow(project)];
    }

    console.error("[project-progress] initial stage seed failed", error);
    throw new Error("Unable to initialize project progress. Please try again.");
  }

  if (project.current_stage_id === "submitted") {
    const { error: updateError } = await supabase
      .from("project_briefs")
      .update({ current_stage_id: BRIEF_RECEIVED_STAGE_ID })
      .eq("id", project.id);

    if (updateError) {
      console.warn("[project-progress] current_stage_id sync failed", updateError);
    } else {
      project.current_stage_id = BRIEF_RECEIVED_STAGE_ID;
    }
  }

  return [row];
}

export const getClientProjectDashboard = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => projectIdSchema.parse(data))
  .handler(async ({ data }): Promise<ClientProjectDashboardData | null> => {
    if (!isSupabaseServerConfigured()) {
      throw new Error(
        "Project lookup is temporarily unavailable. Please try again later.",
      );
    }

    const project = await fetchProjectBrief(data.projectId);
    if (!project) return null;

    const progressRows = await ensureInitialProgress(project);
    const stages = buildStageTimeline(progressRows, project.received_at);
    const proposal = await fetchProjectProposal(project.id);

    return { project, stages, proposal };
  });
