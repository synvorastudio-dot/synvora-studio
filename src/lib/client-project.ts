export type ClientProjectStageId =
  | "brief_received"
  | "discovery"
  | "wireframes"
  | "design"
  | "development"
  | "testing"
  | "delivery"
  | "completed";

export type ClientProjectStageStatus = "completed" | "in_progress" | "upcoming";

export type ClientProjectStage = {
  id: ClientProjectStageId;
  label: string;
  description: string;
  duration: string;
};

export const CLIENT_PROJECT_STAGES: ClientProjectStage[] = [
  {
    id: "brief_received",
    label: "Brief Received",
    description:
      "Your project brief has been received and logged in the Synvora pipeline.",
    duration: "Complete",
  },
  {
    id: "discovery",
    label: "Discovery",
    description:
      "We align on goals, users, constraints and success metrics before design begins.",
    duration: "2–4 days",
  },
  {
    id: "wireframes",
    label: "Wireframes",
    description:
      "Low-fidelity layouts map key flows, screens and information architecture.",
    duration: "3–5 days",
  },
  {
    id: "design",
    label: "Design",
    description:
      "High-fidelity UI, motion and brand polish applied to the approved wireframes.",
    duration: "5–10 days",
  },
  {
    id: "development",
    label: "Development",
    description:
      "Engineering and AI-assisted build following the approved architecture.",
    duration: "Depends on scope",
  },
  {
    id: "testing",
    label: "Testing",
    description:
      "Manual and automated testing across devices, flows and integrations.",
    duration: "2–5 days",
  },
  {
    id: "delivery",
    label: "Delivery",
    description: "Deployment, handover documentation and delivery package.",
    duration: "1–2 days",
  },
  {
    id: "completed",
    label: "Completed",
    description: "Your project is live, handed over and ready for launch.",
    duration: "Done",
  },
];

const STAGE_INDEX: Record<string, number> = Object.fromEntries(
  CLIENT_PROJECT_STAGES.map((stage, index) => [stage.id, index]),
);

STAGE_INDEX.submitted = 0;

export function getClientStageIndex(stageId: string): number {
  const idx = STAGE_INDEX[stageId];
  if (idx === undefined) return 0;
  return Math.min(idx, CLIENT_PROJECT_STAGES.length - 1);
}

export function getClientStatusLabel(stageId: string): string {
  const idx = getClientStageIndex(stageId);
  return CLIENT_PROJECT_STAGES[idx]?.label ?? "Brief Received";
}

export type ProjectBriefRow = {
  id: string;
  project_id: string;
  received_at: string;
  summary: string;
  brief: unknown;
  current_stage_id: string;
};

export type ProjectProgressRow = {
  id: string;
  project_brief_id: string;
  stage_id: string;
  status: ClientProjectStageStatus;
  description: string;
  progress_percentage: number;
  completed_at: string | null;
};

export type ClientProjectStageView = {
  id: ClientProjectStageId;
  label: string;
  description: string;
  status: ClientProjectStageStatus;
  progressPercentage: number;
  completedAt: string | null;
  duration: string;
};

export function getStageMetadata(stageId: string): ClientProjectStage {
  return (
    CLIENT_PROJECT_STAGES.find((stage) => stage.id === stageId) ??
    CLIENT_PROJECT_STAGES[0]
  );
}

export function buildStageTimeline(
  progressRows: ProjectProgressRow[],
  receivedAt: string,
): ClientProjectStageView[] {
  const byStageId = new Map(progressRows.map((row) => [row.stage_id, row]));

  return CLIENT_PROJECT_STAGES.map((stage) => {
    const row = byStageId.get(stage.id);

    if (row) {
      return {
        id: stage.id,
        label: stage.label,
        description: row.description || stage.description,
        status: row.status,
        progressPercentage: row.progress_percentage,
        completedAt: row.completed_at,
        duration: stage.duration,
      };
    }

    const activeIdx = getActiveStageIndex(progressRows);
    const stageIdx = getClientStageIndex(stage.id);

    if (stageIdx < activeIdx) {
      return {
        id: stage.id,
        label: stage.label,
        description: stage.description,
        status: "completed",
        progressPercentage: 100,
        completedAt: receivedAt,
        duration: stage.duration,
      };
    }

    if (stageIdx === activeIdx) {
      return {
        id: stage.id,
        label: stage.label,
        description: stage.description,
        status: "in_progress",
        progressPercentage: 0,
        completedAt: null,
        duration: stage.duration,
      };
    }

    return {
      id: stage.id,
      label: stage.label,
      description: stage.description,
      status: "upcoming",
      progressPercentage: 0,
      completedAt: null,
      duration: stage.duration,
    };
  });
}

function getActiveStageIndex(progressRows: ProjectProgressRow[]): number {
  const inProgress = progressRows.find((row) => row.status === "in_progress");
  if (inProgress) return getClientStageIndex(inProgress.stage_id);

  const completedStages = progressRows
    .filter((row) => row.status === "completed")
    .map((row) => getClientStageIndex(row.stage_id));

  if (completedStages.length === 0) return 0;

  return Math.max(...completedStages);
}

export function getOverallProgress(stages: ClientProjectStageView[]): number {
  if (stages.length === 0) return 0;
  const total = stages.reduce((sum, stage) => sum + stage.progressPercentage, 0);
  return Math.round(total / stages.length);
}

export function getCurrentStageLabel(stages: ClientProjectStageView[]): string {
  const inProgress = stages.find((stage) => stage.status === "in_progress");
  if (inProgress) return inProgress.label;

  const lastCompleted = [...stages].reverse().find((stage) => stage.status === "completed");
  return lastCompleted?.label ?? stages[0]?.label ?? "Brief Received";
}

export function formatStageStatus(status: ClientProjectStageStatus): string {
  switch (status) {
    case "completed":
      return "Completed";
    case "in_progress":
      return "In progress";
    default:
      return "Upcoming";
  }
}

export function formatCompletionDate(isoDate: string | null): string | null {
  if (!isoDate) return null;
  return new Date(isoDate).toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const BRIEF_RECEIVED_STAGE_ID: ClientProjectStageId = "brief_received";

export function createBriefReceivedProgressInsert(
  projectBriefId: string,
  receivedAt: string,
) {
  const stage = getStageMetadata(BRIEF_RECEIVED_STAGE_ID);
  return {
    project_brief_id: projectBriefId,
    stage_id: BRIEF_RECEIVED_STAGE_ID,
    status: "completed" as const,
    description: stage.description,
    progress_percentage: 100,
    completed_at: receivedAt,
  };
}

export function createBriefReceivedProgressRow(
  project: Pick<ProjectBriefRow, "id" | "received_at">,
): ProjectProgressRow {
  const insert = createBriefReceivedProgressInsert(project.id, project.received_at);
  return {
    id: `local-${project.id}-${BRIEF_RECEIVED_STAGE_ID}`,
    project_brief_id: insert.project_brief_id,
    stage_id: insert.stage_id,
    status: insert.status,
    description: insert.description,
    progress_percentage: insert.progress_percentage,
    completed_at: insert.completed_at,
  };
}
