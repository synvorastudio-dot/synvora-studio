// Frontend-only project pipeline store (localStorage). No backend, no DB.

export type PipelineStageId =
  | "submitted"
  | "ai_analysis"
  | "architecture"
  | "proposal"
  | "development"
  | "qa"
  | "delivery"
  | "completed";

export type PipelineStage = {
  id: PipelineStageId;
  label: string;
  description: string;
  duration: string;
};

export const PIPELINE_STAGES: PipelineStage[] = [
  { id: "submitted",    label: "Project Submitted",     description: "Your brief has been received and logged in the Synvora pipeline.", duration: "Instant" },
  { id: "ai_analysis",  label: "AI Analysis",           description: "Requirements are parsed, structured and prioritised by Synvora AI.", duration: "1–2 hours" },
  { id: "architecture", label: "Solution Architecture", description: "Optimal stack, integrations and system design are drafted.",           duration: "1–2 days" },
  { id: "proposal",     label: "Proposal Generation",   description: "A tailored scope, timeline and pricing proposal is prepared.",         duration: "24–48 hours" },
  { id: "development",  label: "Development",           description: "Engineering and AI-assisted build following the approved architecture.", duration: "Depends on scope" },
  { id: "qa",           label: "Quality Assurance",     description: "Manual and automated testing across devices, flows and integrations.", duration: "2–5 days" },
  { id: "delivery",     label: "Delivery",              description: "Deployment, handover documentation and delivery package.",             duration: "1–2 days" },
  { id: "completed",    label: "Completed",             description: "Project is live. Support and growth phase begins.",                    duration: "—" },
];

export type StoredProject = {
  projectId: string;
  createdAt: string;         // ISO
  currentStageId: PipelineStageId;
  service: { id: string; label: string };
  industry: string;
  complexity: { id: string; label: string };
  features: { id: string; label: string }[];
  estimate: { startPrice: number; minD: number; maxD: number };
  businessDesc: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    company: string;
    country: string;
    description: string;
  };
};

const KEY = "synvora.currentProject.v1";

export function saveProject(p: StoredProject) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
    window.dispatchEvent(new Event("synvora:project-updated"));
  } catch {
    /* ignore quota / privacy errors */
  }
}

export function loadProject(): StoredProject | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredProject;
  } catch {
    return null;
  }
}

export function clearProject() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("synvora:project-updated"));
}
