import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Global ambient orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="orb animate-drift"
          style={{
            top: "-10%",
            left: "50%",
            width: "620px",
            height: "620px",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle, oklch(0.72 0.22 250 / 0.28), transparent 60%)",
          }}
        />
        <div
          className="orb animate-float-slow"
          style={{
            bottom: "-15%",
            right: "-8%",
            width: "480px",
            height: "480px",
            background:
              "radial-gradient(circle, oklch(0.6 0.24 280 / 0.22), transparent 60%)",
          }}
        />
      </div>

      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  );
}
