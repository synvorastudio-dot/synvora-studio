import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/ui-lib/PagePlaceholder";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Synvora" },
      { name: "description", content: "Essays and case studies from the Synvora studio on design, engineering and AI." },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="Journal"
      title={<>Notes from the <span className="text-electric-gradient">studio floor.</span></>}
      description="Essays, teardowns and case studies on design craft, AI systems and the business of shipping premium software. The first issue drops soon."
    />
  ),
});
