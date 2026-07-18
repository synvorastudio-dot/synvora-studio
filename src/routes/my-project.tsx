import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/my-project")({
  head: () => ({
    meta: [
      { title: "My Project — Synvora" },
      {
        name: "description",
        content:
          "Track your Synvora project through the AI-assisted delivery pipeline.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "My Project — Synvora" },
      {
        property: "og:description",
        content:
          "Track your Synvora project through the AI-assisted delivery pipeline.",
      },
    ],
  }),
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
});
