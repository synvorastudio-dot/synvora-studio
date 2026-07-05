import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Synvora" },
      {
        name: "description",
        content:
          "Concept projects, internal demo systems and reference architectures from Synvora — honest, transparent, no invented clients.",
      },
      { property: "og:title", content: "Portfolio — Synvora" },
      {
        property: "og:description",
        content: "Concept projects and internal demonstration systems from Synvora.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
});
