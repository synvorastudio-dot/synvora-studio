import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ClipboardList,
  BrainCircuit,
  LayoutTemplate,
  Code2,
  ShieldCheck,
  PackageCheck,
  LineChart,
  Zap,
  Wallet,
  Sparkles,
  UserCheck,
  Layers,
  LifeBuoy,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Section, SectionHeading, Eyebrow } from "@/components/ui-lib/Section";

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: [
      { title: "How We Work — Synvora" },
      {
        name: "description",
        content:
          "The Synvora workflow — from AI project request to launch and long-term support. Seven premium steps, AI-assisted development with human quality control.",
      },
      { property: "og:title", content: "How We Work — Synvora" },
      {
        property: "og:description",
        content:
          "The Synvora workflow — seven premium steps from AI project request to launch and support.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowWeWorkPage,
});

const STEPS = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Project Request",
    desc: "The client submits the AI Project Builder — service, industry, features, complexity and business goals in one structured brief.",
  },
  {
    n: "02",
    icon: BrainCircuit,
    title: "AI Analysis",
    desc: "The project is automatically analysed. Requirements are structured, gaps are surfaced and the scope is prepared for planning.",
  },
  {
    n: "03",
    icon: LayoutTemplate,
    title: "Architecture Planning",
    desc: "The optimal technology stack and implementation plan are prepared — modern, edge-ready and shaped around real business logic.",
  },
  {
    n: "04",
    icon: Code2,
    title: "Development",
    desc: "The solution is built using modern AI-assisted development workflows, kept clean and consistent by human quality control at every step.",
  },
  {
    n: "05",
    icon: ShieldCheck,
    title: "Testing & Quality Assurance",
    desc: "Every project is tested end to end before delivery — functionality, performance, responsiveness and reliability across devices.",
  },
  {
    n: "06",
    icon: PackageCheck,
    title: "Delivery",
    desc: "The client receives the completed solution with clear documentation, access credentials and a straightforward handover.",
  },
  {
    n: "07",
    icon: LineChart,
    title: "Support & Growth",
    desc: "Optional maintenance, AI improvements and future feature development — the platform keeps evolving with the business.",
  },
] as const;

const REASONS = [
  { icon: Zap,        title: "Fast delivery",            desc: "AI-assisted production compresses timelines that traditional agencies stretch over months." },
  { icon: Wallet,     title: "Transparent pricing",      desc: "Clear starting prices per service — no vague quotes, no hidden retainers." },
  { icon: Sparkles,   title: "AI-assisted development",  desc: "AI accelerates every layer of engineering, from planning to code to QA." },
  { icon: UserCheck,  title: "Human quality control",    desc: "Every deliverable is reviewed by a human engineer before it ships." },
  { icon: Layers,     title: "Scalable architecture",    desc: "Modern, edge-ready stacks designed to grow with the product." },
  { icon: LifeBuoy,   title: "Long-term support",        desc: "Optional maintenance, iteration and new capabilities long after launch." },
] as const;

function HowWeWorkPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <Section className="!pb-14 md:!pb-16">
        <SectionHeading
          eyebrow="How We Work"
          title={
            <>
              The Synvora workflow, in <span className="text-electric-gradient">seven steps.</span>
            </>
          }
          description="From the first AI-generated brief to long-term support — a premium, AI-assisted process built for speed, clarity and quality."
        />
      </Section>

      {/* Timeline */}
      <Section className="!pt-4 !pb-24">
        <div className="relative">
          {/* Vertical spine */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-6 top-3 bottom-3 w-px bg-linear-to-b from-transparent via-[color:var(--hairline-strong)] to-transparent md:left-1/2 md:-translate-x-px"
          />

          <ol className="relative space-y-8 md:space-y-12">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <li
                  key={step.n}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="grid gap-4 md:grid-cols-2 md:items-center md:gap-10">
                    {/* Left column (md+) */}
                    <div className={`hidden md:block ${isLeft ? "md:order-1" : "md:order-2"}`}>
                      <StepCard step={step} align={isLeft ? "right" : "left"} />
                    </div>

                    {/* Center node — mobile-first */}
                    <div className={`relative flex items-center gap-4 md:contents`}>
                      <div className="relative z-10 md:col-start-1 md:col-end-3 md:row-start-1 md:mx-auto">
                        <div className="relative grid h-12 w-12 place-items-center rounded-2xl hairline bg-[var(--surface-elevated)] text-[var(--electric)] shadow-[0_0_30px_-6px_var(--electric)] transition-transform duration-500 hover:scale-105">
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                          <span
                            aria-hidden
                            className="absolute inset-0 rounded-2xl ring-1 ring-[color:var(--electric)]/25 animate-ping"
                            style={{ animationDuration: "2.4s" }}
                          />
                        </div>
                      </div>

                      {/* Mobile card */}
                      <div className="min-w-0 flex-1 md:hidden">
                        <StepCard step={step} align="left" />
                      </div>
                    </div>

                    {/* Right column (md+) */}
                    <div className={`hidden md:block ${isLeft ? "md:order-3" : "md:order-1"}`}>
                      {/* empty spacer opposite to card */}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      {/* Why businesses choose Synvora */}
      <Section className="!pt-4 !pb-28">
        <SectionHeading
          eyebrow="Why Synvora"
          title={
            <>
              Why businesses choose <span className="text-electric-gradient">Synvora.</span>
            </>
          }
          description="A modern engineering partner built for the speed and quality standards of today's businesses."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {REASONS.map(({ icon: Icon, title, desc }, i) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-3xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--hairline-strong)] animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(500px circle at 50% 0%, oklch(0.72 0.22 250 / 0.16), transparent 65%)",
                }}
              />
              <div className="relative grid h-11 w-11 place-items-center rounded-2xl hairline bg-[var(--surface-elevated)] text-[var(--electric)] shadow-[0_10px_30px_-15px_oklch(0.72_0.22_250/0.6)] transition-all duration-500 group-hover:shadow-[0_0_30px_-4px_var(--electric)]">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </div>
              <h3 className="relative mt-6 font-display text-[17px] leading-tight tracking-[-0.02em] text-foreground">
                {title}
              </h3>
              <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="!pt-4 !pb-28">
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
            <Eyebrow>Ready when you are</Eyebrow>
            <h3 className="mt-5 font-display text-[26px] leading-tight tracking-[-0.03em] text-gradient md:text-[32px]">
              Start with an AI-generated project brief.
            </h3>
            <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
              Complete the AI Project Builder and Synvora will prepare your personalised scope, timeline and production plan.
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
    </SiteLayout>
  );
}

type Step = (typeof STEPS)[number];

function StepCard({ step, align }: { step: Step; align: "left" | "right" }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--hairline-strong)] md:p-7 ${
        align === "right" ? "md:text-right" : ""
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
        style={{ background: "radial-gradient(circle, oklch(0.6 0.22 290 / 0.35), transparent 70%)" }}
      />
      <div
        className={`relative flex items-center gap-3 ${
          align === "right" ? "md:justify-end" : ""
        }`}
      >
        <span className="font-display text-[11px] uppercase tracking-[0.24em] text-[var(--electric)]">
          Step {step.n}
        </span>
      </div>
      <h3 className="relative mt-3 font-display text-[20px] leading-tight tracking-[-0.02em] text-foreground md:text-[22px]">
        {step.title}
      </h3>
      <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">
        {step.desc}
      </p>
    </div>
  );
}
