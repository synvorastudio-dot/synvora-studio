import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "../brand/Logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { to: "/services", label: "Services" },
      { to: "/solutions", label: "Solutions" },
      { to: "/templates", label: "Templates" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/blog", label: "Journal" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { to: "/services", label: "Web & Mobile" },
      { to: "/services", label: "AI Automation" },
      { to: "/services", label: "SaaS Platforms" },
      { to: "/services", label: "CRM Systems" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-40 overflow-hidden">
      {/* ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.72 0.22 250 / 0.55), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[500px] -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 100%, oklch(0.72 0.22 250 / 0.12), transparent 70%)",
        }}
      />

      <div className="container-page pt-24 pb-12">
        {/* CTA row */}
        <div className="grid gap-10 border-b border-[var(--hairline)] pb-16 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="font-display text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              — Let's build
            </p>
            <h2 className="mt-5 font-display text-[38px] leading-[1.02] tracking-[-0.035em] text-gradient sm:text-[52px] md:text-[64px]">
              A studio for the<br />
              <span className="text-electric-gradient">next chapter</span> of software.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:justify-end">
            <Link
              to="/"
              hash="project-builder"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[13.5px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition-transform duration-500 hover:-translate-y-px"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-px group-hover:translate-x-px" />
            </Link>
            <Link
              to="/"
              hash="project-builder"
              className="inline-flex items-center gap-2 rounded-full hairline-strong bg-white/[0.03] px-5 py-3 text-[13.5px] font-medium text-foreground/90 transition-colors hover:bg-white/[0.06]"
            >
              Build My Proposal
            </Link>
          </div>
        </div>

        {/* main */}
        <div className="mt-16 grid gap-14 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-10">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-[14px] leading-relaxed text-muted-foreground">
              An international AI product studio designing luxury software,
              intelligent systems and category-defining digital products.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full hairline bg-white/[0.02] px-3 py-1.5 text-[11.5px] text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--electric)] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--electric)]" />
              </span>
              Accepting new projects — Q3 2026
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((l, i) => (
                  <li key={`${col.title}-${i}`}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-1.5 text-[13.5px] text-foreground/75 transition-colors hover:text-foreground"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-60" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant wordmark */}
        <div className="relative mt-24 overflow-hidden">
          <div
            aria-hidden
            className="select-none whitespace-nowrap text-center font-display text-[22vw] font-medium leading-none tracking-[-0.06em] md:text-[18vw]"
            style={{
              background:
                "linear-gradient(180deg, oklch(1 0 0 / 0.08) 0%, oklch(1 0 0 / 0) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SYNVORA
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[var(--hairline)] pt-6 text-[12px] text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Synvora Studio · Crafted with intent.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
