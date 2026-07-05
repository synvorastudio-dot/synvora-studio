import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BrainCircuit,
  Check,
  Layers,
  LifeBuoy,
  Minus,
  ShieldCheck,
  Sparkles,
  Tag,
  Zap,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui-lib/Section";

export const Route = createFileRoute("/why-synvora")({
  head: () => ({
    meta: [
      { title: "Why Synvora — AI-First Product Studio" },
      {
        name: "description",
        content:
          "Why businesses choose Synvora: AI-first development, transparent pricing, rapid delivery, scalable architecture, enterprise security and long-term partnership.",
      },
      { property: "og:title", content: "Why Synvora — AI-First Product Studio" },
      {
        property: "og:description",
        content:
          "AI-first development, transparent pricing, rapid delivery and long-term partnership.",
      },
    ],
  }),
  component: WhySynvoraPage,
});

const CARDS = [
  {
    icon: BrainCircuit,
    title: "AI-First Development",
    desc: "Every project is designed with AI automation in mind from day one.",
  },
  {
    icon: Tag,
    title: "Transparent Pricing",
    desc: "Clear starting prices and predictable project planning.",
  },
  {
    icon: Zap,
    title: "Rapid Delivery",
    desc: "AI-assisted workflows accelerate delivery while maintaining professional quality.",
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    desc: "Solutions are built for future growth, integrations and expansion.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    desc: "Modern development practices with secure infrastructure and GDPR-ready architecture.",
  },
  {
    icon: LifeBuoy,
    title: "Long-Term Partnership",
    desc: "Continuous improvements, support and future AI enhancements.",
  },
] as const;

type Cell = { value: string; positive?: boolean };

const COMPARISON: { label: string; traditional: Cell; synvora: Cell }[] = [
  {
    label: "Planning",
    traditional: { value: "Custom quotes, variable scope" },
    synvora:     { value: "Fixed starting prices, structured scope", positive: true },
  },
  {
    label: "Development Speed",
    traditional: { value: "Weeks to months per milestone" },
    synvora:     { value: "AI-assisted, typically faster on comparable scope", positive: true },
  },
  {
    label: "Automation",
    traditional: { value: "Added later as a separate project" },
    synvora:     { value: "Planned from day one", positive: true },
  },
  {
    label: "AI Integration",
    traditional: { value: "Optional add-on" },
    synvora:     { value: "Native part of the delivery process", positive: true },
  },
  {
    label: "Scalability",
    traditional: { value: "Depends on the vendor and stack" },
    synvora:     { value: "Modular architecture, prepared for growth", positive: true },
  },
  {
    label: "Support",
    traditional: { value: "Ticket queues or ad-hoc retainers" },
    synvora:     { value: "Direct long-term partnership", positive: true },
  },
  {
    label: "Transparency",
    traditional: { value: "Varies by agency" },
    synvora:     { value: "Live project pipeline and clear pricing", positive: true },
  },
];

function WhySynvoraPage() {
  return (
    <>
      {/* ——— Header ——— */}
      <Section className="!pt-40 !pb-10 md:!pt-48">
        <SectionHeading
          eyebrow="Why Synvora"
          title={
            <>
              A modern studio built for{" "}
              <span className="text-electric-gradient">how businesses ship today.</span>
            </>
          }
          description="Six reasons companies choose Synvora to design, build and evolve their digital products."
        />
      </Section>

      {/* ——— Cards ——— */}
      <Section className="!pt-2 !pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {CARDS.map((c, i) => (
            <article
              key={c.title}
              className="group relative flex flex-col gap-4 rounded-3xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--hairline-strong)] animate-fade-up"
              style={{ animationDelay: `${(i % 6) * 60}ms` }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: "radial-gradient(circle, oklch(0.72 0.22 250 / 0.35), transparent 70%)" }}
              />
              <div className="grid h-11 w-11 place-items-center rounded-2xl hairline bg-[var(--surface-elevated)] text-[var(--electric)]">
                <c.icon className="h-4.5 w-4.5" strokeWidth={1.6} />
              </div>
              <div>
                <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  0{i + 1}
                </div>
                <h3 className="mt-1.5 font-display text-[17px] leading-tight tracking-[-0.02em] text-foreground">
                  {c.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  {c.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ——— Comparison ——— */}
      <Section className="!py-16">
        <SectionHeading
          eyebrow="Comparison"
          title={
            <>
              Traditional Agency <span className="text-muted-foreground">vs</span>{" "}
              <span className="text-electric-gradient">Synvora.</span>
            </>
          }
          description="A factual side-by-side. Every engagement is different — this is how we typically operate compared with a conventional agency setup."
        />

        <div className="mt-12 overflow-hidden rounded-3xl glass-strong">
          {/* Head */}
          <div className="grid grid-cols-[1.1fr_1fr_1fr] items-center gap-2 border-b border-[var(--hairline)] px-5 py-4 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Dimension
            </div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Traditional Agency
            </div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--electric)]">
              <Sparkles className="h-3 w-3" />
              Synvora
            </div>
          </div>

          {COMPARISON.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.1fr_1fr_1fr] items-start gap-2 px-5 py-4 md:grid-cols-[1.2fr_1fr_1fr] md:px-8 ${
                i !== COMPARISON.length - 1 ? "border-b border-[var(--hairline)]" : ""
              }`}
            >
              <div className="font-display text-[14px] tracking-[-0.01em] text-foreground">
                {row.label}
              </div>
              <ComparisonCell cell={row.traditional} />
              <ComparisonCell cell={row.synvora} accent />
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-[11.5px] text-muted-foreground">
          Comparison reflects Synvora's typical delivery model. Actual outcomes depend on project scope and requirements.
        </p>
      </Section>

      {/* ——— CTA ——— */}
      <Section className="!pt-4 !pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[28px] leading-[1.1] tracking-[-0.03em] text-gradient md:text-[36px]">
            Ready to build with Synvora?
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
            Submit a brief through the AI Project Builder and receive a Project ID immediately.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              hash="project-builder"
              className="group inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition hover:-translate-y-px"
            >
              Start Your Project
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-px group-hover:translate-x-px" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

function ComparisonCell({ cell, accent = false }: { cell: Cell; accent?: boolean }) {
  const Icon = cell.positive ? Check : Minus;
  return (
    <div className="flex items-start gap-2 text-[13px] leading-relaxed">
      <span
        className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
          cell.positive
            ? "bg-[oklch(0.72_0.22_250/0.15)] text-[var(--electric)]"
            : "bg-white/[0.04] text-muted-foreground"
        }`}
      >
        <Icon className="h-2.5 w-2.5" strokeWidth={2.5} />
      </span>
      <span className={accent ? "text-foreground/90" : "text-muted-foreground"}>{cell.value}</span>
    </div>
  );
}
