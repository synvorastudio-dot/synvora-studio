import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/ui-lib/PagePlaceholder";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Synvora" },
      { name: "description", content: "Websites, apps, SaaS, CRM, AI assistants and automation — designed and engineered by Synvora." },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="Services"
      title={<>Eight disciplines. <span className="text-electric-gradient">One studio.</span></>}
      description="We're the design, engineering and AI team modern companies wish they had in-house. Explore the full range of what Synvora builds."
      highlights={[
        { title: "Websites", desc: "Editorial marketing sites engineered for speed and conversion." },
        { title: "Web Applications", desc: "Product surfaces with obsessive UX and typographic craft." },
        { title: "Mobile Apps", desc: "Native iOS and Android with delightful motion and offline-first data." },
        { title: "CRM Systems", desc: "Custom pipelines around how your team actually operates." },
        { title: "SaaS Platforms", desc: "Schema to billing to marketing — an end-to-end SaaS build." },
        { title: "AI Automation", desc: "Silent workflows that replace repetitive human tasks." },
      ]}
    />
  ),
});
