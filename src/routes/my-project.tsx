import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Circle,
  Clock,
  FileText,
  FolderOpen,
  Inbox,
  MessageSquare,
  Sparkles,
  Trash2,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import {
  PIPELINE_STAGES,
  clearProject,
  loadProject,
  type PipelineStageId,
  type StoredProject,
} from "@/lib/projectStore";

export const Route = createFileRoute("/my-project")({
  head: () => ({
    meta: [
      { title: "My Project — Synvora" },
      { name: "description", content: "Track your Synvora project through the AI-assisted delivery pipeline." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "My Project — Synvora" },
      { property: "og:description", content: "Track your Synvora project through the AI-assisted delivery pipeline." },
    ],
  }),
  component: MyProjectPage,
});

function MyProjectPage() {
  const [project, setProject] = useState<StoredProject | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProject(loadProject());
    setReady(true);
    const onUpdate = () => setProject(loadProject());
    window.addEventListener("synvora:project-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("synvora:project-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  return (
    <SiteLayout>
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
              A live, transparent view of your project as it moves through the Synvora AI-assisted delivery pipeline.
            </p>
          </header>

          <div className="mx-auto mt-12 max-w-5xl">
            {!ready ? null : project ? (
              <ProjectView project={project} onClear={() => { clearProject(); setProject(null); }} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}

/* ————————————————————————————————————————————————— */

function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center md:p-14">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl hairline bg-[var(--surface-elevated)] text-[var(--electric)]">
        <Inbox className="h-6 w-6" strokeWidth={1.75} />
      </div>
      <h2 className="mt-6 font-display text-[22px] tracking-[-0.02em] text-foreground md:text-[26px]">
        No active project yet
      </h2>
      <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-relaxed text-muted-foreground">
        Submit the AI Project Builder and your project will automatically appear here with a unique Project ID and full pipeline tracking.
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
  );
}

function ProjectView({ project, onClear }: { project: StoredProject; onClear: () => void }) {
  const currentIdx = PIPELINE_STAGES.findIndex((s) => s.id === project.currentStageId);

  return (
    <div className="grid gap-6">
      {/* Overview card */}
      <section className="relative overflow-hidden rounded-3xl glass-strong p-6 md:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.22 250 / 0.35), transparent 70%)" }}
        />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">Project ID</div>
            <div className="mt-1.5 font-display text-[22px] tracking-[-0.01em] text-electric-gradient md:text-[26px]">
              {project.projectId}
            </div>
            <div className="mt-1 text-[11.5px] text-muted-foreground">
              Created {new Date(project.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusPill stageId={project.currentStageId} />
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1.5 rounded-full hairline bg-white/[0.03] px-3 py-1.5 text-[11.5px] text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
              title="Clear local project"
            >
              <Trash2 className="h-3 w-3" />
              Clear
            </button>
          </div>
        </div>

        <div className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <OverviewRow k="Selected Service"   v={project.service.label} />
          <OverviewRow k="Industry"           v={project.industry} />
          <OverviewRow k="Complexity"         v={project.complexity.label} />
          <OverviewRow
            k="Selected Features"
            v={project.features.length ? project.features.map((f) => f.label).join(", ") : "None"}
          />
          <OverviewRow k="Estimated Timeline" v={`${project.estimate.minD}–${project.estimate.maxD} days`} highlight />
          <OverviewRow k="Estimated Budget"   v={`From €${project.estimate.startPrice.toLocaleString("en-US")}`} highlight />
        </div>
      </section>

      {/* Pipeline tracker */}
      <section className="relative overflow-hidden rounded-3xl glass-strong p-6 md:p-8">
        <SectionTitle icon={<Sparkles className="h-3.5 w-3.5" />} title="Pipeline" subtitle="Live progress across the 8 Synvora delivery stages." />
        <ol className="relative mt-6 space-y-4">
          {PIPELINE_STAGES.map((stage, i) => {
            const state: "done" | "current" | "upcoming" =
              i < currentIdx ? "done" : i === currentIdx ? "current" : "upcoming";
            return <StageRow key={stage.id} index={i + 1} stage={stage} state={state} isLast={i === PIPELINE_STAGES.length - 1} />;
          })}
        </ol>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden rounded-3xl glass-strong p-6 md:p-8">
        <SectionTitle icon={<Clock className="h-3.5 w-3.5" />} title="Timeline" subtitle="Project events in chronological order." />
        <ul className="mt-6 space-y-4">
          <TimelineEvent
            when={new Date(project.createdAt).toLocaleString()}
            title="Project submitted"
            desc={`Brief received via AI Project Builder. Assigned ID ${project.projectId}.`}
          />
          <TimelineEvent
            when="Queued"
            title="AI analysis"
            desc="Synvora AI will analyse your brief and structure the requirements."
          />
          <TimelineEvent
            when="Upcoming"
            title="Solution architecture"
            desc="A recommended stack and architecture will be prepared."
          />
          <TimelineEvent
            when="Upcoming"
            title="Proposal delivery"
            desc="A tailored proposal with scope, timeline and pricing will be shared."
          />
        </ul>
      </section>

      {/* Documents + Messages */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="relative overflow-hidden rounded-3xl glass-strong p-6 md:p-8">
          <SectionTitle icon={<FolderOpen className="h-3.5 w-3.5" />} title="Documents" subtitle="Files related to your project will appear here." />
          <ul className="mt-5 grid gap-2.5">
            <DocRow name="Proposal" />
            <DocRow name="Technical Specification" />
            <DocRow name="Invoice" />
            <DocRow name="Delivery Package" />
          </ul>
        </section>

        <section className="relative overflow-hidden rounded-3xl glass-strong p-6 md:p-8">
          <SectionTitle icon={<MessageSquare className="h-3.5 w-3.5" />} title="Messages" subtitle="Direct communication from the Synvora team." />
          <div className="mt-5 rounded-2xl hairline bg-[var(--surface)] p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full hairline bg-[var(--surface-elevated)] text-[var(--electric)]">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div>
                <div className="text-[13px] font-medium text-foreground">Synvora AI</div>
                <p className="mt-1 text-[13px] leading-relaxed text-foreground/85">
                  Synvora AI will communicate all project updates here.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ————— Bits ————— */

function StatusPill({ stageId }: { stageId: PipelineStageId }) {
  const stage = PIPELINE_STAGES.find((s) => s.id === stageId) ?? PIPELINE_STAGES[0];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--electric)] bg-[oklch(0.72_0.22_250/0.08)] px-3 py-1 text-[11.5px] font-medium text-foreground shadow-[0_0_24px_-10px_var(--electric)]">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--electric)]" />
      {stage.label}
    </span>
  );
}

function OverviewRow({ k, v, highlight = false }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="rounded-2xl hairline bg-[var(--surface)] p-4">
      <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">{k}</div>
      <div className={`mt-1.5 text-[14px] leading-snug ${highlight ? "font-display text-[18px] tracking-[-0.015em] text-electric-gradient" : "text-foreground/90"}`}>
        {v}
      </div>
    </div>
  );
}

function SectionTitle({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-lg hairline bg-[var(--surface-elevated)] text-[var(--electric)]">
        {icon}
      </span>
      <div>
        <div className="font-display text-[16px] tracking-[-0.01em] text-foreground">{title}</div>
        <div className="mt-0.5 text-[12px] text-muted-foreground">{subtitle}</div>
      </div>
    </div>
  );
}

function StageRow({
  index, stage, state, isLast,
}: {
  index: number;
  stage: { id: PipelineStageId; label: string; description: string; duration: string };
  state: "done" | "current" | "upcoming";
  isLast: boolean;
}) {
  const dot =
    state === "done"
      ? "border-[color:var(--electric)] bg-[var(--electric)] text-black"
      : state === "current"
        ? "border-[color:var(--electric)] bg-[oklch(0.72_0.22_250/0.15)] text-[var(--electric)] shadow-[0_0_24px_-6px_var(--electric)]"
        : "border-[var(--hairline-strong)] bg-[var(--surface)] text-muted-foreground";

  return (
    <li className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${dot}`}>
          {state === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : <Circle className="h-2 w-2 fill-current" strokeWidth={0} />}
        </span>
        {!isLast && <span className="mt-1 w-px flex-1 bg-[var(--hairline)]" />}
      </div>
      <div className={`flex-1 rounded-2xl border p-4 transition ${state === "current" ? "border-[color:var(--electric)] bg-[oklch(0.72_0.22_250/0.05)]" : "border-[var(--hairline)] bg-[var(--surface)]"} ${isLast ? "" : "mb-1"}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="font-display text-[14.5px] tracking-[-0.01em] text-foreground">
            <span className="text-muted-foreground">0{index}.</span> {stage.label}
          </div>
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {state === "done" ? "Completed" : state === "current" ? "In progress" : "Upcoming"} · {stage.duration}
          </span>
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-foreground/80">{stage.description}</p>
      </div>
    </li>
  );
}

function TimelineEvent({ when, title, desc }: { when: string; title: string; desc: string }) {
  return (
    <li className="flex gap-4">
      <div className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full hairline bg-[var(--surface)] text-[var(--electric)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--electric)]" />
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="text-[13.5px] font-medium text-foreground">{title}</div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{when}</div>
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </li>
  );
}

function DocRow({ name }: { name: string }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-2xl hairline bg-[var(--surface)] px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg hairline bg-[var(--surface-elevated)] text-[var(--electric)]">
          <FileText className="h-3.5 w-3.5" />
        </span>
        <div>
          <div className="text-[13.5px] text-foreground">{name}</div>
          <div className="text-[11px] text-muted-foreground">Pending — will appear once generated</div>
        </div>
      </div>
      <span className="rounded-full hairline bg-white/[0.03] px-2.5 py-1 text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
        Pending
      </span>
    </li>
  );
}
