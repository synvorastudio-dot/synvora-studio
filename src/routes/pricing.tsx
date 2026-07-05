import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Eyebrow, SectionHeading, Section } from "@/components/ui-lib/Section";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Synvora" },
      { name: "description", content: "Transparent engagement models — from one-off projects to full studio retainers." },
    ],
  }),
  component: Pricing,
});

const TIERS = [
  {
    name: "Project",
    price: "From $12k",
    tag: "One-off engagement",
    desc: "A defined-scope build: website, landing, or focused product surface.",
    features: [
      "Discovery & strategy",
      "End-to-end design",
      "Production engineering",
      "Launch support (30 days)",
    ],
    featured: false,
  },
  {
    name: "Studio",
    price: "From $18k / mo",
    tag: "Monthly retainer",
    desc: "An embedded design and engineering team shipping continuously alongside yours.",
    features: [
      "Dedicated squad (design + eng)",
      "Weekly releases",
      "AI systems & automation",
      "Analytics & iteration",
      "Priority Slack channel",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    tag: "Multi-team engagements",
    desc: "Full-stack partnerships for organizations building serious digital products.",
    features: [
      "Multiple concurrent squads",
      "Architecture & security review",
      "Custom SLAs",
      "On-site workshops",
    ],
    featured: false,
  },
];

function Pricing() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-30" />
        <div
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[600px]"
          style={{ background: "var(--gradient-radial-glow)" }}
        />
        <div className="container-page pb-8 pt-16 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="mt-6 font-display text-[44px] leading-[1.03] tracking-[-0.04em] text-gradient md:text-[68px]">
              Engagement models built<br />for serious teams.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
              Transparent starting points. Every engagement is scoped and quoted after a
              short discovery call.
            </p>
          </div>
        </div>
      </section>

      <Section className="!pt-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl p-8 ${
                t.featured
                  ? "bg-[var(--surface-elevated)] hairline shadow-[var(--shadow-elevated)]"
                  : "bg-[var(--surface)] hairline"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-black">
                  Most popular
                </span>
              )}
              <div className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                {t.tag}
              </div>
              <div className="mt-2 font-display text-[26px] tracking-tight text-foreground">
                {t.name}
              </div>
              <div className={`mt-6 font-display text-[40px] leading-none tracking-tight ${t.featured ? "text-electric-gradient" : "text-foreground"}`}>
                {t.price}
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
                {t.desc}
              </p>
              <ul className="mt-7 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--electric)]" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[14px] font-medium transition-transform hover:-translate-y-0.5 ${
                  t.featured
                    ? "bg-white text-black"
                    : "hairline text-foreground hover:bg-white/5"
                }`}
              >
                {t.featured ? "Book a call" : "Get in touch"}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <SectionHeading
            eyebrow="FAQ"
            title="Practical answers, no fluff."
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl hairline bg-[var(--hairline)] sm:grid-cols-2">
            {[
              { q: "How fast can we start?", a: "Most engagements begin within 2 weeks of the discovery call." },
              { q: "Do you sign NDAs?", a: "Always. We sign mutual NDAs before any material is shared." },
              { q: "Where is Synvora based?", a: "We're a distributed studio operating across Europe, the US and Asia." },
              { q: "Who owns the IP?", a: "You do — 100%. All code, design and assets transfer on payment." },
            ].map((f) => (
              <div key={f.q} className="bg-background p-7">
                <h4 className="font-display text-[17px] tracking-tight text-foreground">{f.q}</h4>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
