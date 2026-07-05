import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-[10px] hairline bg-[var(--surface-elevated)] transition-shadow duration-500 group-hover:shadow-[0_0_24px_-4px_var(--electric)]">
        <span
          aria-hidden
          className="absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "var(--gradient-electric)" }}
        />
        <span
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, oklch(1 0 0 / 0.5), transparent 60%)",
          }}
        />
        <span className="relative font-display text-[15px] font-semibold leading-none text-white">
          S
        </span>
      </span>
      <span className="font-display text-[16.5px] font-medium tracking-[-0.02em] text-foreground">
        Synvora
      </span>
    </Link>
  );
}
