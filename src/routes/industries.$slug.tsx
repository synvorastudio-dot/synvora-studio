import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check, Bot, Workflow, Sparkles, Cpu, Layers, Rocket } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui-lib/Section";
import { getIndustry, INDUSTRIES, type Industry } from "@/lib/industries";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = getIndustry(params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Industry not found — Synvora" }, { name: "robots", content: "noindex" }] };
    }
    const { industry } = loaderData;
    const title = `${industry.name} — Industry Solutions — Synvora`;
    const description = industry.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: NotFoundIndustry,
  errorComponent: ({ error, reset }) => (
    <Section>
      <p className="text-muted-foreground">Something went wrong: {error.message}</p>
      <button onClick={reset} className="mt-4 rounded-full hairline px-4 py-2 text-sm">Try again</button>
    </Section>
  ),
  component: IndustryDetail,
});

function NotFoundIndustry() {
  return (
    <Section>
      <Eyebrow>Not found</Eyebrow>
      <h1 className="mt-6 font-display text-[34px] leading-[1.05] tracking-[-0.035em] text-gradient sm:text-[42px]">
        Industry not found.
      </h1>
      <p className="mt-4 text-muted-foreground">The industry you're looking for doesn't exist.</p>
      <Link to="/industries" className="mt-6 inline-flex items-center gap-1.5 rounded-full hairline px-4 py-2 text-sm">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to industries
      </Link>
    </Section>
  );
}

function IndustryDetail() {
  const { industry } = Route.useLoaderData() as { industry: Industry };

  const { name, icon: Icon, tagline, description, problems, synvoraSolution, aiOpportunities, techStack, workflow, outcomes, startingPrice, solutions, aiAutomations, crmFeatures } = industry;

  const others = INDUSTRIES.filter((i) => i.slug !== industry.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <Section className="!py-20 md:!py-28">
        <Link
          to="/industries"
          className="inline-flex items-center gap-1.5 rounded-full hairline bg-white/[0.02] px-3 py-1.5 text-[12px] text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All industries
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl hairline bg-[var(--surface-elevated)] text-[var(--electric)] shadow-[0_10px_30px_-15px_oklch(0.72_0.22_250/0.6)]">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <Eyebrow>Industry Solution</Eyebrow>
            </div>
            <h1 className="mt-6 font-display text-[38px] leading-[1.05] tracking-[-0.035em] text-gradient sm:text-[48px] md:text-[56px]">
              {name}
            </h1>
            <p className="mt-4 text-[15px] uppercase tracking-[0.16em] text-muted-foreground">
              {tagline}
            </p>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted-foreground md:text-[16px]">
              {description}
            </p>
          </div>

          <div className="rounded-3xl glass-strong p-6 md:min-w-[260px]">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Starting from
            </div>
            <div className="mt-2 font-display text-[30px] tracking-[-0.02em] text-electric-gradient">
              {startingPrice}
            </div>
            <Link
              to="/"
              hash="project-builder"
              className="group mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[13px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition-all duration-500 hover:-translate-y-px"
            >
              Start Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-px group-hover:translate-x-px" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Problems + Solution */}
      <Section className="!py-16 md:!py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card eyebrow="Typical business problems" title="What's holding this industry back.">
            <ul className="mt-5 space-y-3">
              {problems.map((p) => (
                <Bullet key={p} tone="warn">{p}</Bullet>
              ))}
            </ul>
          </Card>
          <Card eyebrow="Synvora solution" title="How we solve it.">
            <p className="mt-5 text-[14.5px] leading-relaxed text-foreground/90">
              {synvoraSolution}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <MetaTag label="Digital solutions" items={solutions} />
              <MetaTag label="CRM features" items={crmFeatures} />
            </div>
          </Card>
        </div>
      </Section>

      {/* AI Opportunities */}
      <Section className="!py-16 md:!py-20">
        <Card eyebrow="AI opportunities" title="Where AI creates measurable leverage.">
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {aiOpportunities.map((a) => (
              <div key={a} className="flex gap-3 rounded-2xl hairline bg-white/[0.02] p-4">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--electric)]" strokeWidth={1.75} />
                <p className="text-[13.5px] leading-relaxed text-foreground/90">{a}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl hairline bg-white/[0.02] p-4">
            <div className="flex items-center gap-2">
              <Bot className="h-3.5 w-3.5 text-[var(--electric)]" strokeWidth={1.75} />
              <div className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Recommended AI automations
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {aiAutomations.map((a) => (
                <span key={a} className="rounded-full hairline bg-white/[0.03] px-3 py-1 text-[12px] text-foreground/85">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </Section>

      {/* Tech Stack + Workflow */}
      <Section className="!py-16 md:!py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card eyebrow="Suggested technology stack" title="Modern, proven and edge-ready.">
            <div className="mt-6 flex flex-wrap gap-2">
              {techStack.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full hairline bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] font-medium text-foreground/90">
                  <Cpu className="h-3.5 w-3.5 text-[var(--electric)]" strokeWidth={1.75} />
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <StackFacet icon={Layers} label="Frontend" />
              <StackFacet icon={Workflow} label="Backend" />
              <StackFacet icon={Rocket} label="Edge & AI" />
            </div>
          </Card>

          <Card eyebrow="Example automation workflow" title={workflow.title}>
            <ol className="mt-5 space-y-3">
              {workflow.steps.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full hairline bg-[var(--surface-elevated)] text-[11px] font-medium text-[var(--electric)]">
                    {i + 1}
                  </span>
                  <span className="text-[13.5px] leading-relaxed text-foreground/90">{step}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </Section>

      {/* Outcomes */}
      <Section className="!py-16 md:!py-20">
        <Card eyebrow="Expected business outcomes" title="What you should see once it's live.">
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {outcomes.map((o) => (
              <Bullet key={o}>{o}</Bullet>
            ))}
          </ul>
        </Card>
      </Section>

      {/* CTA */}
      <Section className="!py-16 md:!py-24">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-8 text-center md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(600px circle at 15% 20%, oklch(0.72 0.22 250 / 0.14), transparent 60%), radial-gradient(500px circle at 90% 100%, oklch(0.6 0.22 290 / 0.12), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h3 className="font-display text-[26px] leading-tight tracking-[-0.03em] text-gradient md:text-[32px]">
              Ready to build the {name.toLowerCase()} version?
            </h3>
            <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
              Complete the AI Project Builder and Synvora will generate a personalised scope, timeline and production plan.
            </p>
            <Link
              to="/"
              hash="project-builder"
              className="group mt-7 inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-5 py-3 text-[13.5px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition-all duration-500 hover:-translate-y-px"
            >
              Start Your Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-px group-hover:translate-x-px" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Other industries */}
      <Section className="!pt-4 !pb-24">
        <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Other industries
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {others.map((o) => {
            const OIcon = o.icon;
            return (
              <Link
                key={o.slug}
                to="/industries/$slug"
                params={{ slug: o.slug }}
                className="group rounded-2xl hairline bg-white/[0.02] p-5 transition hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl hairline bg-[var(--surface-elevated)] text-[var(--electric)]">
                    <OIcon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <div className="font-display text-[15px] tracking-[-0.01em] text-foreground">{o.name}</div>
                </div>
                <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">{o.tagline}</p>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}

function Card({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-3xl glass p-7 md:p-8">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h3 className="mt-5 font-display text-[22px] leading-tight tracking-[-0.02em] text-foreground md:text-[26px]">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Bullet({ children, tone = "ok" }: { children: React.ReactNode; tone?: "ok" | "warn" }) {
  return (
    <li className="flex gap-3">
      <span
        className={`mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full ${
          tone === "warn"
            ? "bg-[oklch(0.7_0.18_30/0.15)] text-[oklch(0.78_0.18_30)]"
            : "bg-[oklch(0.72_0.22_250/0.15)] text-[var(--electric)]"
        }`}
      >
        <Check className="h-2.5 w-2.5" strokeWidth={3} />
      </span>
      <span className="text-[13.5px] leading-relaxed text-foreground/90">{children}</span>
    </li>
  );
}

function MetaTag({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-2xl hairline bg-white/[0.02] p-4">
      <div className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <ul className="mt-2 space-y-1 text-[12.5px] leading-relaxed text-foreground/85">
        {items.map((i) => (
          <li key={i} className="flex gap-1.5">
            <span className="text-[var(--electric)]">·</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StackFacet({ icon: Icon, label }: { icon: typeof Cpu; label: string }) {
  return (
    <div className="rounded-2xl hairline bg-white/[0.02] p-4 text-center">
      <Icon className="mx-auto h-4 w-4 text-[var(--electric)]" strokeWidth={1.5} />
      <div className="mt-2 text-[11.5px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
