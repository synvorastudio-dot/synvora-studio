import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ImageIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui-lib/Section";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Portfolio — Synvora" },
      {
        name: "description",
        content:
          "Featured projects from Synvora — a curated preview of concept work and internal systems.",
      },
      { property: "og:title", content: "Portfolio — Synvora" },
      {
        property: "og:description",
        content: "Featured projects from Synvora.",
      },
    ],
  }),
  component: PortfolioIndex,
});

type PlaceholderProject = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  gradient: string;
};

const FEATURED: PlaceholderProject[] = [
  {
    id: "p1",
    title: "Project Title",
    description: "A short description of the project will appear here once the case study is published.",
    technologies: ["React", "TypeScript", "Tailwind"],
    gradient: "linear-gradient(135deg, oklch(0.35 0.14 260), oklch(0.22 0.10 280))",
  },
  {
    id: "p2",
    title: "Project Title",
    description: "A short description of the project will appear here once the case study is published.",
    technologies: ["Next.js", "Node.js", "Postgres"],
    gradient: "linear-gradient(135deg, oklch(0.30 0.14 240), oklch(0.20 0.08 260))",
  },
  {
    id: "p3",
    title: "Project Title",
    description: "A short description of the project will appear here once the case study is published.",
    technologies: ["React Native", "Supabase", "Stripe"],
    gradient: "linear-gradient(135deg, oklch(0.34 0.15 290), oklch(0.22 0.10 270))",
  },
  {
    id: "p4",
    title: "Project Title",
    description: "A short description of the project will appear here once the case study is published.",
    technologies: ["OpenAI", "Node.js", "Vector DB"],
    gradient: "linear-gradient(135deg, oklch(0.32 0.13 250), oklch(0.20 0.09 285))",
  },
  {
    id: "p5",
    title: "Project Title",
    description: "A short description of the project will appear here once the case study is published.",
    technologies: ["Vue", "Nuxt", "GraphQL"],
    gradient: "linear-gradient(135deg, oklch(0.36 0.14 275), oklch(0.22 0.10 255))",
  },
  {
    id: "p6",
    title: "Project Title",
    description: "A short description of the project will appear here once the case study is published.",
    technologies: ["Astro", "Tailwind", "Cloudflare"],
    gradient: "linear-gradient(135deg, oklch(0.30 0.12 265), oklch(0.20 0.08 245))",
  },
];

function PortfolioIndex() {
  return (
    <Section className="!pb-28">
      <SectionHeading
        eyebrow="Portfolio"
        title={
          <>
            Featured <span className="text-electric-gradient">Projects.</span>
          </>
        }
        description="A curated selection of projects. Detailed case studies are being prepared and will appear here soon."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {FEATURED.map((p, i) => (
          <article
            key={p.id}
            className="group relative flex flex-col overflow-hidden rounded-3xl glass transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--hairline-strong)] animate-fade-up"
            style={{ animationDelay: `${(i % 6) * 60}ms` }}
          >
            {/* Image placeholder */}
            <div className="relative h-44 overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                style={{ background: p.gradient }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 90% at 50% -20%, oklch(1 0 0 / 0.10), transparent 60%), linear-gradient(180deg, transparent 40%, oklch(0 0 0 / 0.55))",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "linear-gradient(oklch(1 0 0 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.08) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative flex h-full items-center justify-center">
                <div className="grid h-14 w-14 place-items-center rounded-2xl hairline bg-black/30 text-white/80 backdrop-blur">
                  <ImageIcon className="h-5 w-5" strokeWidth={1.5} />
                </div>
              </div>
              <span className="absolute left-4 top-4 rounded-full hairline bg-black/40 px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.2em] text-white/85 backdrop-blur">
                Coming soon
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-[18px] leading-tight tracking-[-0.02em] text-foreground">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
                {p.description}
              </p>

              <div className="mt-5">
                <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Technologies
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full hairline bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-foreground/85"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6">
                <button
                  type="button"
                  disabled
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-full hairline bg-white/[0.03] px-4 py-2.5 text-[13px] font-medium text-foreground/70 transition-all duration-300 hover:bg-white/[0.06] disabled:cursor-not-allowed"
                >
                  View Case Study
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
