import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/ui-lib/PagePlaceholder";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — Synvora" },
      { name: "description", content: "Industry solutions powered by Synvora — from fintech to healthcare to luxury commerce." },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="Solutions"
      title={<>Purpose-built systems for <span className="text-electric-gradient">complex industries.</span></>}
      description="Battle-tested architectures and AI systems for fintech, health, e-commerce, real estate, and B2B operations."
      highlights={[
        { title: "Fintech", desc: "KYC, compliance, ledgers and dashboards — fast and audit-friendly." },
        { title: "Healthcare", desc: "HIPAA-conscious workflows, patient portals and clinician copilots." },
        { title: "Luxury Commerce", desc: "Editorial storefronts and configurators that convert." },
        { title: "Real Estate", desc: "Portfolio, CRM and AI-assisted lead qualification." },
        { title: "B2B Operations", desc: "Internal tools, dashboards and automation that eliminate ops drag." },
        { title: "AI Copilots", desc: "Domain-tuned assistants embedded in the software you already use." },
      ]}
    />
  ),
});
