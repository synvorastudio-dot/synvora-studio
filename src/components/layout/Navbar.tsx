import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "../brand/Logo";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/how-we-work", label: "How We Work" },
  { to: "/why-synvora", label: "Why Synvora" },
  { to: "/templates", label: "Portfolio" },
  { to: "/my-project", label: "My Project" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Insights" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled ? "py-2.5" : "py-4"
      }`}
    >
      {/* subtle top ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, oklch(0.72 0.22 250 / 0.18), transparent 70%)",
          opacity: scrolled ? 0.9 : 0.5,
          transition: "opacity 600ms",
        }}
      />
      <div className="container-page">
        <div
          className={`flex items-center justify-between rounded-full px-3 py-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-4 ${
            scrolled
              ? "glass-strong"
              : "border border-transparent"
          }`}
        >
          <div className="pl-1 sm:pl-2">
            <Logo />
          </div>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative rounded-full px-3.5 py-1.5 text-[13px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                activeProps={{
                  className:
                    "text-foreground bg-white/[0.06] shadow-[inset_0_0_0_1px_oklch(1_0_0/0.08)]",
                }}
                activeOptions={{ exact: true }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              hash="project-builder"
              className="group hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition-all duration-500 hover:-translate-y-px hover:shadow-[0_1px_0_oklch(1_0_0/0.8)_inset,0_16px_40px_-12px_oklch(0.72_0.22_250/0.7)] sm:inline-flex"
            >
              Start Your Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-px group-hover:translate-x-px" />
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full hairline text-foreground transition-colors hover:bg-white/[0.06] lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="container-page lg:hidden">
          <div className="mt-2 rounded-3xl glass-strong p-3 animate-fade-up">
            <div className="flex flex-col">
              {NAV.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="animate-fade-up rounded-xl px-4 py-3 text-[15px] text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                  style={{ animationDelay: `${i * 30}ms` }}
                  activeProps={{ className: "text-foreground bg-white/[0.06]" }}
                  activeOptions={{ exact: true }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/"
                hash="project-builder"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-3 text-[14px] font-medium text-black"
              >
                Start Your Project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
