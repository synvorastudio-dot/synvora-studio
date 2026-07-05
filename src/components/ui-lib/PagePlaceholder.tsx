import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Eyebrow } from "@/components/ui-lib/Section";

export function PagePlaceholder({
  eyebrow,
  title,
  description,
  highlights,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  highlights?: { title: string; desc: string }[];
}) {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-40" />
        <div
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[700px]"
          style={{ background: "var(--gradient-radial-glow)" }}
        />
        <div className="container-page py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="animate-fade-up">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h1
              className="mt-7 animate-fade-up font-display text-[42px] leading-[1.03] tracking-[-0.045em] text-gradient sm:text-[58px] md:text-[76px]"
              style={{ animationDelay: "80ms" }}
            >
              {title}
            </h1>
            <p
              className="mt-7 max-w-2xl animate-fade-up text-[16px] leading-relaxed text-muted-foreground md:text-[17px]"
              style={{ animationDelay: "160ms" }}
            >
              {description}
            </p>
            <div
              className="mt-10 flex animate-fade-up flex-col items-start gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "240ms" }}
            >
              <Link to="/contact" className="btn-primary group">
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-px group-hover:translate-x-px" />
              </Link>
              <Link to="/" className="btn-ghost group">
                Back to home
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {highlights && (
            <div className="mt-24 grid gap-px overflow-hidden rounded-3xl hairline bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="group relative overflow-hidden bg-background p-8 transition-colors duration-500 hover:bg-[var(--surface)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(400px circle at 50% 0%, oklch(0.72 0.22 250 / 0.1), transparent 70%)",
                    }}
                  />
                  <h3 className="relative font-display text-[19px] tracking-[-0.02em] text-foreground">
                    {h.title}
                  </h3>
                  <p className="relative mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
