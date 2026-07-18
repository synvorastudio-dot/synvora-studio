import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Inbox, Sparkles } from "lucide-react";

export const Route = createFileRoute("/my-project/")({
  component: MyProjectIndexPage,
});

function MyProjectIndexPage() {
  return (
    <main className="relative pt-32 pb-24">
      <div className="container-page">
        <header className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full hairline bg-white/[0.03] px-3 py-1 text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <Sparkles className="h-3 w-3 text-[var(--electric)]" />
            My Project
          </div>
          <h1 className="mt-4 font-display text-[34px] leading-tight tracking-[-0.02em] text-gradient md:text-[44px]">
            Your Synvora Project Pipeline
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground md:text-[15px]">
            Submit the AI Project Builder and your project will appear here with a
            unique Project ID and full pipeline tracking.
          </p>
        </header>

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center md:p-14">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl hairline bg-[var(--surface-elevated)] text-[var(--electric)]">
              <Inbox className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h2 className="mt-6 font-display text-[22px] tracking-[-0.02em] text-foreground md:text-[26px]">
              No active project yet
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-muted-foreground">
              Submit the AI Project Builder and you&apos;ll be redirected to your
              personal project dashboard with a unique Project ID.
            </p>
            <Link
              to="/"
              hash="project-builder"
              className="group mt-8 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition hover:-translate-y-px"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-px group-hover:translate-x-px" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
