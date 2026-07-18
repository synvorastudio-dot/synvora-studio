export type ClientProjectStageId =
  | "brief_received"
  | "review"
  | "proposal"
  | "production"
  | "testing"
  | "delivery";

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
    description: "Your project brief has been received and logged in the Synvora pipeline.",
    duration: "Complete",
  },
  {
    id: "review",
    label: "Review",
    description: "The Synvora team reviews your requirements, goals and constraints.",
    duration: "1–2 days",
  },
  {
    id: "proposal",
    label: "Proposal",
    description: "A tailored scope, timeline and pricing proposal is prepared for your approval.",
    duration: "24–48 hours",
  },
  {
    id: "production",
    label: "Production",
    description: "Engineering and AI-assisted build following the approved architecture.",
    duration: "Depends on scope",
  },
  {
    id: "testing",
    label: "Testing",
    description: "Manual and automated testing across devices, flows and integrations.",
    duration: "2–5 days",
  },
  {
    id: "delivery",
    label: "Delivery",
    description: "Deployment, handover documentation and delivery package.",
    duration: "1–2 days",
  },
];

const STAGE_INDEX: Record<string, number> = {
  submitted: 0,
  brief_received: 0,
  review: 1,
  proposal: 2,
  production: 3,
  development: 3,
  testing: 4,
  qa: 4,
  delivery: 5,
  completed: 6,
};

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
