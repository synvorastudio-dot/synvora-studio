import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/ui-lib/PagePlaceholder";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — Synvora" },
      { name: "description", content: "Premium templates and starters engineered by Synvora — production-grade, beautifully composed." },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="Templates"
      title={<>Starters with a <span className="text-electric-gradient">studio-grade finish.</span></>}
      description="A growing library of production-ready templates for SaaS, agencies, portfolios and AI products. Coming soon."
      highlights={[
        { title: "SaaS Starter", desc: "Auth, billing, dashboards and marketing site in one build." },
        { title: "Agency OS", desc: "Client portals, CRM and case-study system for modern studios." },
        { title: "AI Chat Kit", desc: "A drop-in surface for building branded AI assistants." },
      ]}
    />
  ),
});
