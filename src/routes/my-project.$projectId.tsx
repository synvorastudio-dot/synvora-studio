import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  Check,
  Circle,
  Loader2,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { ProposalPaymentSection } from "@/components/client/ProposalPaymentSection";
import { ProjectProgressBar } from "@/components/client/ProjectProgressBar";
import {
  formatCompletionDate,
  formatStageStatus,
  getCurrentStageLabel,
  getOverallProgress,
  type ClientProjectStageView,
  type ProjectBriefRow,
} from "@/lib/client-project";
import type { ProjectProposalRow } from "@/lib/project-proposal";
import { getClientProjectDashboard } from "@/lib/project-progress.functions";
import { confirmStripeCheckoutSession } from "@/lib/stripe-checkout.functions";

type ProjectSearch = {
  payment?: "success" | "cancelled";
  session_id?: string;
};

export const Route = createFileRoute("/my-project/$projectId")({
  validateSearch: (search: Record<string, unknown>): ProjectSearch => ({
    payment:
      search.payment === "success" || search.payment === "cancelled"
        ? search.payment
        : undefined,
    session_id:
      typeof search.session_id === "string" && search.session_id.length > 0
        ? search.session_id
        : undefined,
  }),
  loader: async ({ params }) => {
    const dashboard = await getClientProjectDashboard({
      data: { projectId: params.projectId },
    });
    if (!dashboard) throw notFound();
    return dashboard;
  },
  head: ({ loaderData }) => {
    const projectId = loaderData?.project.project_id ?? "Project";
    const title = `${projectId} — My Project — Synvora`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: "Track your Synvora project through the delivery pipeline.",
        },
        { name: "robots", content: "noindex" },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: "Track your Synvora project through the delivery pipeline.",
        },
      ],
    };
  },
  pendingComponent: ProjectLoading,
  notFoundComponent: ProjectNotFound,
  errorComponent: ProjectError,
  component: ClientProjectDashboard,
});

function ClientProjectDashboard() {
  const { projectId } = Route.useParams();
  const search = Route.useSearch();
  const router = Route.useRouter();
  const confirmedSessionRef = useRef<string | null>(null);
  const { project, stages, proposal } = Route.useLoaderData() as {
    project: ProjectBriefRow;
    stages: ClientProjectStageView[];
    proposal: ProjectProposalRow | null;
  };
  const statusLabel = getCurrentStageLabel(stages);
  const overallProgress = getOverallProgress(stages);
  const receivedDate = new Date(project.received_at);

  useEffect(() => {
    if (search.payment !== "success" || !search.session_id) return;
    if (confirmedSessionRef.current === search.session_id) return;

    confirmedSessionRef.current = search.session_id;

    void confirmStripeCheckoutSession({
      data: {
        projectId,
        sessionId: search.session_id,
      },
    })
      .then(() => router.invalidate())
      .catch((error) => {
        console.error("[stripe] payment confirmation failed", error);
        confirmedSessionRef.current = null;
      });
  }, [projectId, router, search.payment, search.session_id]);

  return (
    <main className="relative pt-28 pb-24 md:pt-32">
      <div className="container-page">
        <Link
          to="/"
          hash="project-builder"
          className="inline-flex items-center gap-1.5 rounded-full hairline bg-white/[0.02] px-3 py-1.5 text-[12px] text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>

        <header className="mx-auto mt-8 max-w-3xl text-center md:mt-10">
          <div className="inline-flex items-center gap-1.5 rounded-full hairline bg-white/[0.03] px-3 py-1 text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <Sparkles className="h-3 w-3 text-[var(--electric)]" />
            Client Portal
          </div>
          <h1 className="mt-4 font-display text-[30px] leading-tight tracking-[-0.02em] text-gradient sm:text-[38px] md:text-[44px]">
            Your Synvora Project
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground md:text-[15px]">
            A live view of your project as it moves through the Synvora delivery
            pipeline.
          </p>
        </header>

        <div className="mx-auto mt-10 max-w-5xl space-y-6 md:mt-12">
          {/* Overview */}
          <section className="relative overflow-hidden rounded-3xl glass-strong p-6 md:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.72 0.22 250 / 0.35), transparent 70%)",
              }}
            />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Project ID
                </div>
                <div className="mt-1.5 break-all font-display text-[20px] tracking-[-0.01em] text-electric-gradient sm:text-[24px] md:text-[26px]">
                  {project.project_id}
                </div>
                <div className="mt-1.5 text-[11.5px] text-muted-foreground">
                  Submitted{" "}
                  {receivedDate.toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at{" "}
                  {receivedDate.toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <StatusPill label={statusLabel} />
            </div>

            <div className="relative mt-8">
              <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Project Summary
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-foreground/90 md:text-[15px]">
                {project.summary}
              </p>
            </div>
          </section>

          <ProposalPaymentSection
            projectId={project.project_id}
            proposal={proposal}
            paymentBanner={search.payment ?? null}
          />

          {/* Progress timeline */}
          <section className="relative overflow-hidden rounded-3xl glass-strong p-6 md:p-8">
            <SectionTitle
              title="Progress Timeline"
              subtitle="Track every stage from brief to delivery."
            />

            <ProjectProgressBar value={overallProgress} className="relative mt-8" />

            {/* Desktop timeline */}
            <ol className="mt-8 hidden gap-3 xl:grid xl:grid-cols-4">
              {stages.map((stage, i) => (
                <HorizontalStage
                  key={stage.id}
                  stage={stage}
                  index={i + 1}
                  style={{ animationDelay: `${i * 70}ms` }}
                />
              ))}
            </ol>

            {/* Mobile / tablet vertical timeline */}
            <ol className="relative mt-8 space-y-4 xl:hidden">
              {stages.map((stage, i) => {
                const isLast = i === stages.length - 1;
                return (
                  <StageRow
                    key={stage.id}
                    index={i + 1}
                    stage={stage}
                    isLast={isLast}
                    style={{ animationDelay: `${i * 70}ms` }}
                  />
                );
              })}
            </ol>
          </section>

          {/* Next steps CTA */}
          <section className="relative overflow-hidden rounded-3xl glass-strong p-6 text-center md:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(500px circle at 50% 0%, oklch(0.72 0.22 250 / 0.12), transparent 65%)",
              }}
            />
            <div className="relative mx-auto max-w-lg">
              <h2 className="font-display text-[20px] tracking-[-0.02em] text-foreground md:text-[24px]">
                What happens next?
              </h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                Our team will review your brief and prepare a tailored proposal.
                Bookmark this page — your Project ID is your permanent link to
                track progress.
              </p>
              <Link
                to="/contact"
                className="group mt-6 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition hover:-translate-y-px"
              >
                Contact Synvora
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-px group-hover:translate-x-px" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function ProjectLoading() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center pt-28 pb-24">
      <div className="container-page flex flex-col items-center text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl hairline bg-[var(--surface-elevated)] text-[var(--electric)]">
          <Loader2 className="h-6 w-6 animate-spin" strokeWidth={1.75} />
        </div>
        <h1 className="mt-6 font-display text-[22px] tracking-[-0.02em] text-foreground md:text-[26px]">
          Loading your project…
        </h1>
        <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-muted-foreground">
          Fetching your project details from the Synvora pipeline.
        </p>
      </div>
    </main>
  );
}

function ProjectNotFound() {
  const { projectId } = Route.useParams();

  return (
    <main className="relative pt-28 pb-24 md:pt-32">
      <div className="container-page">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl hairline bg-[var(--surface-elevated)] text-muted-foreground">
            <AlertCircle className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <h1 className="mt-6 font-display text-[26px] tracking-[-0.02em] text-gradient md:text-[32px]">
            Project not found
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
            We couldn&apos;t find a project with ID{" "}
            <span className="font-mono text-foreground/80">{projectId}</span>.
            Double-check the link or submit a new brief.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              hash="project-builder"
              className="group inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition hover:-translate-y-px"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-px group-hover:translate-x-px" />
            </Link>
            <Link
              to="/my-project"
              className="inline-flex items-center gap-1.5 rounded-full hairline bg-white/[0.03] px-4 py-2.5 text-[13px] text-foreground/85 transition hover:bg-white/[0.08]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              My Project
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProjectError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="relative pt-28 pb-24 md:pt-32">
      <div className="container-page">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl hairline bg-[oklch(0.5_0.2_25/0.08)] text-[oklch(0.85_0.15_25)]">
            <AlertCircle className="h-6 w-6" strokeWidth={1.75} />
          </div>
          <h1 className="mt-6 font-display text-[26px] tracking-[-0.02em] text-foreground md:text-[32px]">
            Unable to load project
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
            {error.message ||
              "Something went wrong while loading your project. Please try again."}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black transition hover:-translate-y-px"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}

/* ————— UI bits ————— */

function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-[color:var(--electric)] bg-[oklch(0.72_0.22_250/0.08)] px-3 py-1 text-[11.5px] font-medium text-foreground shadow-[0_0_24px_-10px_var(--electric)]">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--electric)]" />
      {label}
    </span>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-lg hairline bg-[var(--surface-elevated)] text-[var(--electric)]">
        <Sparkles className="h-3.5 w-3.5" />
      </span>
      <div>
        <div className="font-display text-[16px] tracking-[-0.01em] text-foreground">
          {title}
        </div>
        <div className="mt-0.5 text-[12px] text-muted-foreground">{subtitle}</div>
      </div>
    </div>
  );
}

function stageCardClass(status: ClientProjectStageView["status"]) {
  return status === "in_progress"
    ? "border-[color:var(--electric)] bg-[oklch(0.72_0.22_250/0.05)]"
    : status === "completed"
      ? "border-[color:var(--hairline-strong)] bg-[var(--surface)]"
      : "border-[var(--hairline)] bg-[var(--surface)]";
}

function stageDotClass(status: ClientProjectStageView["status"]) {
  return status === "completed"
    ? "border-[color:var(--electric)] bg-[var(--electric)] text-black"
    : status === "in_progress"
      ? "border-[color:var(--electric)] bg-[oklch(0.72_0.22_250/0.15)] text-[var(--electric)] shadow-[0_0_24px_-6px_var(--electric)]"
      : "border-[var(--hairline-strong)] bg-[var(--surface)] text-muted-foreground";
}

function StageMeta({
  stage,
  compact = false,
}: {
  stage: ClientProjectStageView;
  compact?: boolean;
}) {
  const completionDate = formatCompletionDate(stage.completedAt);

  return (
    <div className={`mt-3 space-y-2 ${compact ? "mt-2" : ""}`}>
      <div className="flex items-center justify-between gap-2 text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>{formatStageStatus(stage.status)}</span>
        <span>{stage.progressPercentage}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-[var(--surface-elevated)]">
        <div
          className="h-full rounded-full bg-[var(--electric)] transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${stage.progressPercentage}%` }}
        />
      </div>
      {completionDate ? (
        <div className="text-[11px] text-muted-foreground">Completed {completionDate}</div>
      ) : (
        <div className="text-[11px] text-muted-foreground">{stage.duration}</div>
      )}
    </div>
  );
}

function StageRow({
  index,
  stage,
  isLast,
  style,
}: {
  index: number;
  stage: ClientProjectStageView;
  isLast: boolean;
  style?: CSSProperties;
}) {
  return (
    <li className="relative flex animate-fade-up gap-4" style={style}>
      <div className="flex flex-col items-center">
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${stageDotClass(stage.status)}`}
        >
          {stage.status === "completed" ? (
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          ) : (
            <Circle className="h-2 w-2 fill-current" strokeWidth={0} />
          )}
        </span>
        {!isLast && <span className="mt-1 w-px flex-1 bg-[var(--hairline)]" />}
      </div>
      <div
        className={`flex-1 rounded-2xl border p-4 transition ${stageCardClass(stage.status)} ${isLast ? "" : "mb-1"}`}
      >
        <div className="font-display text-[14.5px] tracking-[-0.01em] text-foreground">
          <span className="text-muted-foreground">0{index}.</span> {stage.label}
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/80">
          {stage.description}
        </p>
        <StageMeta stage={stage} compact />
      </div>
    </li>
  );
}

function HorizontalStage({
  index,
  stage,
  style,
}: {
  index: number;
  stage: ClientProjectStageView;
  style?: CSSProperties;
}) {
  return (
    <li
      className={`flex animate-fade-up flex-col rounded-2xl border p-4 transition ${stageCardClass(stage.status)}`}
      style={style}
    >
      <span
        className={`grid h-8 w-8 place-items-center rounded-full border ${stageDotClass(stage.status)}`}
      >
        {stage.status === "completed" ? (
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
        ) : (
          <Circle className="h-2 w-2 fill-current" strokeWidth={0} />
        )}
      </span>
      <div className="mt-3 font-display text-[13px] tracking-[-0.01em] text-foreground">
        <span className="text-muted-foreground">0{index}.</span> {stage.label}
      </div>
      <p className="mt-1.5 flex-1 text-[11.5px] leading-relaxed text-foreground/75">
        {stage.description}
      </p>
      <StageMeta stage={stage} compact />
    </li>
  );
}
