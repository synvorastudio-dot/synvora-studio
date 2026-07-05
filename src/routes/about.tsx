import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Brain,
  Compass,
  Layers,
  LayoutTemplate,
  LifeBuoy,
  LineChart,
  PackageCheck,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui-lib/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Synvora" },
      {
        name: "description",
        content:
          "Synvora is an AI-first product studio building premium web, mobile and automation systems with rapid delivery, transparent process and long-term support.",
      },
      { property: "og:title", content: "About — Synvora" },
      {
        property: "og:description",
        content:
          "AI-first product studio for premium digital systems: transparent process, rapid delivery, long-term partnership.",
      },
    ],
  }),
  component: AboutPage,
});

/* ————————————————————————————————————————————————— */

const PILLARS = [
  {
    icon: Brain,
    title: "AI-first development",
    desc: "AI is embedded in every stage — from research and architecture to code generation, testing and content — compressing months of engineering into weeks.",
  },
  {
    icon: Zap,
    title: "Rapid delivery",
    desc: "A production-grade process, reusable architecture and AI acceleration let us ship complete systems in a fraction of the industry standard.",
  },
  {
    icon: ShieldCheck,
    title: "Radical transparency",
    desc: "Fixed starting prices, predictable timelines and a live project pipeline. You always know the status, the scope and the next step.",
  },
  {
    icon: Layers,
    title: "Reusable architecture",
    desc: "A curated stack of proven components, integrations and patterns — engineered once, refined continuously and applied across every build.",
  },
  {
    icon: LifeBuoy,
    title: "Long-term support",
    desc: "Post-launch is where products actually live. We stay on as a technical partner for maintenance, iteration and continuous improvement.",
  },
  {
    icon: LineChart,
    title: "Business outcomes",
    desc: "Design and technology in service of measurable results — revenue, efficiency, retention — never craft for its own sake.",
  },
] as const;

const TIMELINE = [
  { icon: Compass,         title: "Discovery",              desc: "Business goals, constraints and success metrics are aligned before a single line of code." },
  { icon: LayoutTemplate,  title: "Architecture",           desc: "Optimal stack, integrations and system design — documented and reviewed with you." },
  { icon: Sparkles,        title: "AI Prototyping",         desc: "Working prototypes are generated fast so decisions are made on real screens, not slides." },
  { icon: Brain,           title: "Development",            desc: "AI-assisted engineering with human ownership of architecture, security and craft." },
  { icon: ShieldCheck,     title: "QA",                     desc: "Manual and automated testing across flows, devices, integrations and edge cases." },
  { icon: Rocket,          title: "Launch",                 desc: "Deployment, monitoring, handover documentation and a clean delivery package." },
  { icon: LineChart,       title: "Continuous Improvement", desc: "Iteration, analytics, new features and support — the product keeps compounding after launch." },
] as const;

const NUMBERS = [
  { k: "AI-first", v: "Every project" },
  { k: "Fixed", v: "Starting prices" },
  { k: "Weeks", v: "Not months" },
  { k: "Long-term", v: "Partnership" },
] as const;

/* ————————————————————————————————————————————————— */

function AboutPage() {
  return (
    <>
      {/* ——— Hero ——— */}
      <Section className="!pt-40 !pb-16 md:!pt-48">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full hairline bg-white/[0.03] px-3 py-1 text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            <Sparkles className="h-3 w-3 text-[var(--electric)]" />
            About Synvora
          </div>
          <h1 className="mt-6 font-display text-[38px] leading-[1.05] tracking-[-0.035em] text-gradient sm:text-[48px] md:text-[60px]">
            An AI-first studio building the{" "}
            <span className="text-electric-gradient">next generation of digital products.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-muted-foreground md:text-[17px]">
            Synvora designs, engineers and operates premium web, mobile and automation systems.
            We combine a disciplined product process with AI-assisted development to deliver
            what traditionally takes months in a matter of weeks — without compromising on
            craft, security or long-term maintainability.
          </p>
        </div>

        {/* Signal bar */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {NUMBERS.map((n) => (
            <div key={n.k} className="rounded-2xl hairline bg-[var(--surface)] p-4">
              <div className="font-display text-[20px] tracking-[-0.02em] text-electric-gradient md:text-[22px]">
                {n.k}
              </div>
              <div className="mt-1 text-[11.5px] uppercase tracking-[0.18em] text-muted-foreground">
                {n.v}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ——— Mission ——— */}
      <Section className="!py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--electric)]">
              Mission
            </div>
            <h2 className="mt-4 font-display text-[30px] leading-[1.1] tracking-[-0.03em] text-gradient md:text-[40px]">
              Make world-class product engineering{" "}
              <span className="text-electric-gradient">accessible, fast and honest.</span>
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-relaxed text-foreground/85">
            <p>
              Most businesses can't wait six months and six-figure budgets for a modern
              digital product. Synvora exists to close that gap: we bring the standards of
              a senior product team to teams of any size, at a pace only an AI-native studio
              can sustain.
            </p>
            <p>
              We are opinionated about scope, timelines and quality — and transparent about
              all three. No unclear pricing, no vague deliverables, no black boxes. Just a
              clear pipeline from brief to launch, and a partner that stays after go-live.
            </p>
          </div>
        </div>
      </Section>

      {/* ——— Pillars ——— */}
      <Section className="!py-20">
        <SectionHeading
          eyebrow="Approach"
          title={
            <>
              How Synvora <span className="text-electric-gradient">operates.</span>
            </>
          }
          description="Six principles that shape every engagement, from the first conversation to years after launch."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PILLARS.map((p, i) => (
            <article
              key={p.title}
              className="group relative flex flex-col gap-4 rounded-3xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--hairline-strong)] animate-fade-up"
              style={{ animationDelay: `${(i % 6) * 60}ms` }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: "radial-gradient(circle, oklch(0.72 0.22 250 / 0.35), transparent 70%)" }}
              />
              <div className="grid h-11 w-11 place-items-center rounded-2xl hairline bg-[var(--surface-elevated)] text-[var(--electric)]">
                <p.icon className="h-4.5 w-4.5" strokeWidth={1.6} />
              </div>
              <div>
                <h3 className="font-display text-[17px] leading-tight tracking-[-0.02em] text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ——— Timeline ——— */}
      <Section className="!py-24">
        <SectionHeading
          eyebrow="Process"
          title={
            <>
              From brief to <span className="text-electric-gradient">continuous growth.</span>
            </>
          }
          description="A single, predictable delivery path — the same seven stages on every engagement, from a landing page to a full internal platform."
        />

        <ol className="relative mt-14 grid gap-5 md:gap-6">
          {TIMELINE.map((s, i) => {
            const isLast = i === TIMELINE.length - 1;
            return (
              <li
                key={s.title}
                className="relative flex gap-5 animate-fade-up"
                style={{ animationDelay: `${(i % 7) * 60}ms` }}
              >
                {/* Rail */}
                <div className="flex flex-col items-center">
                  <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl hairline bg-[var(--surface-elevated)] text-[var(--electric)] shadow-[0_0_28px_-10px_var(--electric)]">
                    <s.icon className="h-4.5 w-4.5" strokeWidth={1.6} />
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden
                      className="mt-1 w-px flex-1 bg-linear-to-b from-[var(--hairline-strong)] to-transparent"
                    />
                  )}
                </div>

                {/* Card */}
                <div className="flex-1 rounded-3xl glass p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-[17px] leading-tight tracking-[-0.02em] text-foreground">
                      <span className="text-muted-foreground">0{i + 1}.</span> {s.title}
                    </h3>
                    <span className="text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground">
                      Stage {i + 1} / {TIMELINE.length}
                    </span>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-foreground/80">
                    {s.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* ——— Long-term support ——— */}
      <Section className="!py-20">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-8 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full opacity-50 blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.72 0.22 250 / 0.35), transparent 70%)" }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--electric)]">
                Partnership
              </div>
              <h2 className="mt-4 font-display text-[28px] leading-[1.1] tracking-[-0.03em] text-gradient md:text-[36px]">
                We stay for the <span className="text-electric-gradient">long run.</span>
              </h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-foreground/85">
                Launch is a starting line. Synvora remains available as your technical partner
                for support, iteration and continuous improvement — evolving the product
                alongside your business.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: PackageCheck, title: "Ongoing maintenance",    desc: "Monitoring, updates and security patches." },
                { icon: LineChart,    title: "Growth iterations",      desc: "New features informed by real usage and data." },
                { icon: ShieldCheck,  title: "Reliability",            desc: "Backups, uptime and incident response." },
                { icon: LifeBuoy,     title: "Direct support",         desc: "A dedicated contact — not a ticket queue." },
              ].map((b) => (
                <li key={b.title} className="rounded-2xl hairline bg-[var(--surface)] p-4">
                  <div className="grid h-9 w-9 place-items-center rounded-xl hairline bg-[var(--surface-elevated)] text-[var(--electric)]">
                    <b.icon className="h-4 w-4" strokeWidth={1.6} />
                  </div>
                  <div className="mt-3 font-display text-[14.5px] tracking-[-0.01em] text-foreground">
                    {b.title}
                  </div>
                  <div className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                    {b.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ——— CTA ——— */}
      <Section className="!pt-4 !pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[28px] leading-[1.1] tracking-[-0.03em] text-gradient md:text-[36px]">
            Ready to build with Synvora?
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
            Submit a brief through the AI Project Builder — you'll receive a Project ID and enter
            the Synvora pipeline immediately.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              hash="project-builder"
              className="group inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition hover:-translate-y-px"
            >
              Start your project
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-px group-hover:translate-x-px" />
            </Link>
            <Link
              to="/how-we-work"
              className="inline-flex items-center gap-1.5 rounded-full hairline bg-white/[0.03] px-5 py-2.5 text-[13px] text-foreground/85 transition hover:bg-white/[0.08]"
            >
              See how we work
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
