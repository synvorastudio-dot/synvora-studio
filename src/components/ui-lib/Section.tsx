import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`container-page py-28 md:py-36 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full hairline bg-white/[0.02] px-3 py-1 text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
      <span className="relative flex h-1 w-1">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--electric)] opacity-60" />
        <span className="relative inline-flex h-1 w-1 rounded-full bg-[var(--electric)]" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-6 font-display text-[34px] leading-[1.05] tracking-[-0.035em] text-gradient sm:text-[42px] md:text-[52px]">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-[15.5px] leading-relaxed text-muted-foreground md:text-[16px]">
          {description}
        </p>
      )}
    </div>
  );
}
