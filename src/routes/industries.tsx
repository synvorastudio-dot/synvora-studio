import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industry Solutions — Synvora" },
      { name: "description", content: "Premium digital, AI and CRM solutions tailored to twelve core industries." },
      { property: "og:title", content: "Industry Solutions — Synvora" },
      { property: "og:description", content: "Digital, AI and CRM solutions tailored by industry." },
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
