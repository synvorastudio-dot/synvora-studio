import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Bot, Workflow, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui-lib/Section";
import { INDUSTRIES } from "@/lib/industries";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industry Solutions — Synvora" },
      {
        name: "description",
        content:
          "Purpose-built digital platforms, AI automations and CRM systems for twelve core industries — from healthcare to finance to hospitality.",
      },
      { property: "og:title", content: "Industry Solutions — Synvora" },
      {
        property: "og:description",
        content:
          "Purpose-built digital platforms, AI automations and CRM systems for twelve core industries.",
      },
    ],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Industry Solutions"
        title={
          <>
            Solutions engineered <span className="text-electric-gradient">by industry.</span>
          </>
        }
        description="Every industry has its own operating logic. Synvora ships digital platforms, AI automations and CRM systems tuned to how each one actually works."
      />

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {INDUSTRIES.map(({ slug, name, icon: Icon, tagline, description, solutions, aiAutomations, crmFeatures, startingPrice }) => (
          <article
            key={slug}
            className="group relative flex flex-col overflow-hidden rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--hairline-strong)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(500px circle at 50% 0%, oklch(0.72 0.22 250 / 0.18), transparent 65%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
              style={{ background: "radial-gradient(circle, oklch(0.6 0.22 290 / 0.35), transparent 70%)" }}
            />

            <div className="relative grid h-12 w-12 place-items-center rounded-2xl hairline bg-[var(--surface-elevated)] text-[var(--electric)] shadow-[0_10px_30px_-15px_oklch(0.72_0.22_250/0.6)] transition-all duration-500 group-hover:shadow-[0_0_30px_-4px_var(--electric)]">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </div>

            <h3 className="relative mt-7 font-display text-[19px] leading-tight tracking-[-0.02em] text-foreground">
              {name}
            </h3>
            <p className="relative mt-1.5 text-[12.5px] uppercase tracking-[0.14em] text-muted-foreground">
              {tagline}
            </p>

            <p className="relative mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
              {description}
            </p>

            <div className="relative mt-5 space-y-3">
              <MiniList icon={Sparkles} label="Digital solutions" items={solutions.slice(0, 3)} />
              <MiniList icon={Bot} label="AI automations" items={aiAutomations.slice(0, 3)} />
              <MiniList icon={Workflow} label="CRM features" items={crmFeatures.slice(0, 3)} />
            </div>

            <div className="relative mt-6 border-t border-[var(--hairline)] pt-5">
              <div className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Starting from
              </div>
              <div className="mt-1 font-display text-[20px] tracking-[-0.02em] text-electric-gradient">
                {startingPrice}
              </div>
            </div>

            <div className="relative mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link
                to="/industries/$slug"
                params={{ slug }}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full hairline bg-white/[0.03] px-4 py-2.5 text-[13px] font-medium text-foreground/85 transition-all duration-300 hover:bg-white/[0.08] hover:text-foreground"
              >
                View Solution
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/"
                hash="project-builder"
                className="group/btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[13px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition-all duration-500 hover:-translate-y-px"
              >
                Start Project
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:-translate-y-px group-hover/btn:translate-x-px" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-center text-[13.5px] leading-relaxed text-muted-foreground">
        Starting prices are indicative. Final scope, timeline and production plan are generated after completing the AI Project Builder.
      </p>
    </Section>
  );
}

function MiniList({
  icon: Icon,
  label,
  items,
}: {
  icon: typeof Bot;
  label: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl hairline bg-white/[0.02] p-3.5">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-[var(--electric)]" strokeWidth={1.75} />
        <div className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </div>
      </div>
      <ul className="mt-2 space-y-1 text-[12.5px] leading-relaxed text-foreground/85">
        {items.map((item) => (
          <li key={item} className="flex gap-1.5">
            <span className="text-[var(--electric)]">·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
