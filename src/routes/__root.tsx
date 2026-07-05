import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteLayout } from "../components/layout/SiteLayout";

function NotFoundComponent() {
  return (
    <SiteLayout>
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
        <span className="font-display text-[120px] leading-none text-electric-gradient">404</span>
        <h1 className="mt-4 text-2xl font-medium tracking-tight">Page not found</h1>
        <p className="mt-3 max-w-md text-[14.5px] text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-[13.5px] font-medium text-black transition-transform hover:-translate-y-0.5"
        >
          Back to home
        </Link>
      </div>
    </SiteLayout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <SiteLayout>
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-medium tracking-tight">Something went wrong</h1>
        <p className="mt-3 max-w-md text-[14.5px] text-muted-foreground">
          An unexpected error occurred. Try refreshing or head back home.
        </p>
        <div className="mt-8 flex gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-white px-5 py-2.5 text-[13.5px] font-medium text-black"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full hairline px-5 py-2.5 text-[13.5px] font-medium text-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </SiteLayout>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Synvora — International AI Product Studio" },
      {
        name: "description",
        content:
          "Synvora is an international AI product studio designing luxury websites, apps, SaaS platforms, CRM systems and intelligent automation.",
      },
      { name: "author", content: "Synvora" },
      { name: "theme-color", content: "#0a0a0f" },
      { property: "og:title", content: "Synvora — International AI Product Studio" },
      {
        property: "og:description",
        content:
          "Luxury software, intelligent systems and category-defining digital products.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Synvora — International AI Product Studio" },
      {
        name: "twitter:description",
        content:
          "Luxury software, intelligent systems and category-defining digital products.",
      },
      { name: "description", content: "Synvora is an international AI product studio designing luxury websites, apps, SaaS platforms, CRM systems and intelligent automation." },
      { property: "og:description", content: "Synvora is an international AI product studio designing luxury websites, apps, SaaS platforms, CRM systems and intelligent automation." },
      { name: "twitter:description", content: "Synvora is an international AI product studio designing luxury websites, apps, SaaS platforms, CRM systems and intelligent automation." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/734e2301-9b29-4cf7-ae8f-11fc72dfe4ee/id-preview-d229f704--9a54d440-38f4-472e-9e7f-4793ce248b73.lovable.app-1783252792153.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/734e2301-9b29-4cf7-ae8f-11fc72dfe4ee/id-preview-d229f704--9a54d440-38f4-472e-9e7f-4793ce248b73.lovable.app-1783252792153.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
