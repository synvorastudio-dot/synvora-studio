import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
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

export const getProjectBriefByProjectId = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => projectIdSchema.parse(data))
  .handler(async ({ data }) => {
    if (!isSupabaseServerConfigured()) {
      throw new Error(
        "Project lookup is temporarily unavailable. Please try again later.",
      );
    }

    const supabase = createServerSupabaseClient();
    const { data: row, error } = await supabase
      .from("project_briefs")
      .select("id, project_id, received_at, summary, brief, current_stage_id")
      .eq("project_id", data.projectId)
      .maybeSingle();

    if (error) {
      console.error("[project-brief] fetch failed", error);
      throw new Error("Unable to load your project. Please try again.");
    }

    return row;
  });
