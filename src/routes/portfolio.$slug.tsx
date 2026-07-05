import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check, Cpu, Sparkles, Info } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui-lib/Section";
import { getPortfolioItem, PORTFOLIO, type PortfolioItem } from "@/lib/portfolio";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const item = getPortfolioItem(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Case study not found — Synvora" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { item } = loaderData;
    const title = `${item.title} — Case Study — Synvora`;
    return {
      meta: [
        { title },
        { name: "description", content: item.shortDesc },
        { property: "og:title", content: title },
        { property: "og:description", content: item.shortDesc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: NotFoundItem,
  errorComponent: ({ error, reset }) => (
    <Section>
      <p className="text-muted-foreground">Something went wrong: {error.message}</p>
      <button onClick={reset} className="mt-4 rounded-full hairline px-4 py-2 text-sm">
        Try again
      </button>
    </Section>
  ),
  component: CaseStudy,
});

function NotFoundItem() {
  return (
    <Section>
      <Eyebrow>Not found</Eyebrow>
      <h1 className="mt-6 font-display text-[34px] leading-[1.05] tracking-[-0.035em] text-gradient sm:text-[42px]">
        Case study not found.
      </h1>
      <Link to="/portfolio" className="mt-6 inline-flex items-center gap-1.5 rounded-full hairline px-4 py-2 text-sm">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to portfolio
      </Link>
    </Section>
  );
}

function CaseStudy() {
  const { item } = Route.useLoaderData() as { item: PortfolioItem };
  const {
    title, category, disclosure, icon: Icon, gradient, shortDesc,
    features, stack, timeline, startingPrice,
    challenge, solution, aiCapabilities, impact,
  } = item;

  const others = PORTFOLIO.filter((p) => p.slug !== item.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <Section className="!pb-14 md:!pb-16">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-1.5 rounded-full hairline bg-white/[0.02] px-3 py-1.5 text-[12px] text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All case studies
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-stretch">
          <div>
            <div className="flex items-center gap-2">
              <Eyebrow>Case study</Eyebrow>
              <span className="rounded-full hairline bg-white/[0.03] px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.2em] text-[var(--electric)]">
                {category}
              </span>
            </div>
            <h1 className="mt-6 font-display text-[36px] leading-[1.05] tracking-[-0.035em] text-gradient sm:text-[46px] md:text-[54px]">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-muted-foreground md:text-[16px]">
              {shortDesc}
            </p>

            <div className="mt-6 flex items-start gap-2.5 rounded-2xl hairline bg-white/[0.02] p-3.5 md:max-w-md">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--electric)]" strokeWidth={1.75} />
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                {disclosure}. This is not a delivered client engagement.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/"
                hash="project-builder"
                className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13.5px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition-all duration-500 hover:-translate-y-px"
              >
                Start Your Project
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-px group-hover:translate-x-px" />
              </Link>
              <div className="flex items-center gap-4 text-[12.5px] text-muted-foreground">
                <span>
                  <span className="text-muted-foreground/70">Starting </span>
                  <span className="font-display text-electric-gradient">{startingPrice}</span>
                </span>
                <span className="h-3 w-px bg-[var(--hairline)]" />
                <span>
                  <span className="text-muted-foreground/70">Timeline </span>
                  <span className="text-foreground/85">{timeline}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl hairline lg:aspect-auto">
            <div aria-hidden className="absolute inset-0" style={{ background: gradient }} />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 90% at 50% -20%, oklch(1 0 0 / 0.12), transparent 60%), linear-gradient(180deg, transparent 40%, oklch(0 0 0 / 0.55))",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-40 mix-blend-overlay"
              style={{
                backgroundImage:
                  "linear-gradient(oklch(1 0 0 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.08) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
            <div className="relative flex h-full items-end justify-between p-6">
              <div className="grid h-14 w-14 place-items-center rounded-2xl hairline bg-black/30 text-white backdrop-blur">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <span className="rounded-full hairline bg-black/40 px-3 py-1 text-[10.5px] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur">
                {disclosure}
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* Challenge + Solution */}
      <Section className="!py-14 md:!py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card eyebrow="Business challenge" title="What this project addresses.">
            <p className="mt-5 text-[14.5px] leading-relaxed text-foreground/90">{challenge}</p>
          </Card>
          <Card eyebrow="Proposed solution" title="How Synvora would build it.">
            <p className="mt-5 text-[14.5px] leading-relaxed text-foreground/90">{solution}</p>
            <div className="mt-6 rounded-2xl hairline bg-white/[0.02] p-4">
              <div className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Key features
              </div>
              <ul className="mt-2.5 space-y-1.5">
                {features.map((f) => (
                  <li key={f} className="flex gap-2 text-[13px] leading-relaxed text-foreground/90">
                    <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[var(--electric)]" strokeWidth={2.25} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </Section>

      {/* AI Capabilities */}
      <Section className="!py-14 md:!py-16">
        <Card eyebrow="AI capabilities" title="Where AI creates the leverage.">
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {aiCapabilities.map((a) => (
              <div key={a} className="flex gap-3 rounded-2xl hairline bg-white/[0.02] p-4">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--electric)]" strokeWidth={1.75} />
                <p className="text-[13.5px] leading-relaxed text-foreground/90">{a}</p>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Stack + Impact */}
      <Section className="!py-14 md:!py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card eyebrow="Technologies used" title="Modern, proven and edge-ready.">
            <div className="mt-6 flex flex-wrap gap-2">
              {stack.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full hairline bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] font-medium text-foreground/90">
                  <Cpu className="h-3.5 w-3.5 text-[var(--electric)]" strokeWidth={1.75} />
                  {t}
                </span>
              ))}
            </div>
          </Card>
          <Card eyebrow="Expected business impact" title="What this system is designed to deliver.">
            <ul className="mt-5 grid gap-3 sm:grid-cols-1">
              {impact.map((o) => (
                <li key={o} className="flex gap-3">
                  <span className="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[oklch(0.72_0.22_250/0.15)] text-[var(--electric)]">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  <span className="text-[13.5px] leading-relaxed text-foreground/90">{o}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl hairline bg-white/[0.02] p-4">
              <div className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Estimated implementation timeline
              </div>
              <div className="mt-2 font-display text-[20px] tracking-[-0.02em] text-foreground">
                {timeline}
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section className="!py-16 md:!py-20">
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
              Build the version tailored to your business.
            </h3>
            <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
              Complete the AI Project Builder and Synvora will prepare a personalised scope, timeline and production plan.
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

      {/* Other case studies */}
      <Section className="!pt-4 !pb-24">
        <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          More case studies
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {others.map((o) => {
            const OIcon = o.icon;
            return (
              <Link
                key={o.slug}
                to="/portfolio/$slug"
                params={{ slug: o.slug }}
                className="group overflow-hidden rounded-2xl hairline bg-white/[0.02] transition hover:bg-white/[0.05]"
              >
                <div className="relative h-24">
                  <div aria-hidden className="absolute inset-0" style={{ background: o.gradient }} />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 40%, oklch(0 0 0 / 0.4))" }}
                  />
                  <div className="relative flex h-full items-end p-4">
                    <div className="grid h-9 w-9 place-items-center rounded-xl hairline bg-black/30 text-white backdrop-blur">
                      <OIcon className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-[var(--electric)]">
                    {o.category}
                  </div>
                  <div className="mt-1.5 font-display text-[14.5px] tracking-[-0.01em] text-foreground">{o.title}</div>
                </div>
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
