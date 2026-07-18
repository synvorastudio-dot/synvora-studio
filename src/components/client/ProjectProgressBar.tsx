import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ProjectProgressBarProps = {
  value: number;
  className?: string;
};

export function ProjectProgressBar({ value, className }: ProjectProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setAnimatedValue(Math.max(0, Math.min(100, value)));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Overall Progress
          </div>
          <div className="mt-1 font-display text-[22px] tracking-[-0.02em] text-electric-gradient">
            {animatedValue}%
          </div>
        </div>
        <div className="text-[11px] text-muted-foreground">Across all delivery stages</div>
      </div>

      <div className="relative h-2.5 overflow-hidden rounded-full hairline bg-[var(--surface)]">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: `${animatedValue}%`,
            background:
              "linear-gradient(90deg, oklch(0.62 0.18 250), oklch(0.78 0.22 250), oklch(0.72 0.22 250))",
            boxShadow: "0 0 24px -6px var(--electric)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "linear-gradient(110deg, transparent 25%, oklch(1 0 0 / 0.35) 50%, transparent 75%)",
            backgroundSize: "200% 100%",
            animation: animatedValue > 0 ? "shimmer 2.4s linear infinite" : "none",
          }}
        />
      </div>
    </div>
  );
}
