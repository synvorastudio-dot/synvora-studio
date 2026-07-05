import { useEffect, useMemo, useRef } from "react";

/**
 * Simple single-cube Hero visual with subtle premium details.
 * Pure CSS 3D + SVG. No Three.js, no React Three Fiber.
 */
export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(x * 14).toFixed(2)}deg`);
      el.style.setProperty("--px", `${(x * 8).toFixed(2)}px`);
      el.style.setProperty("--py", `${(y * 8).toFixed(2)}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Deterministic particle field — layered for depth
  const particles = useMemo(() => {
    const rand = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    const items: {
      top: number; left: number; size: number; delay: number;
      duration: number; opacity: number; bright: boolean; drift: number;
    }[] = [];
    // Ambient dust — many, tiny, low opacity, spread across the whole area
    for (let i = 0; i < 70; i++) {
      items.push({
        top: rand(i * 1.3 + 1) * 100,
        left: rand(i * 2.1 + 7) * 100,
        size: 0.8 + rand(i * 3.7 + 3) * 1.2,
        delay: rand(i * 4.9 + 5) * 8,
        duration: 7 + rand(i * 5.5 + 9) * 8,
        opacity: 0.15 + rand(i * 6.3 + 11) * 0.35,
        bright: false,
        drift: 3 + rand(i * 7.1 + 13) * 5,
      });
    }
    // Bright accents near the cube center
    for (let i = 0; i < 14; i++) {
      const angle = rand(i * 11.1 + 2) * Math.PI * 2;
      const radius = 18 + rand(i * 13.7 + 4) * 18; // % from center
      items.push({
        top: 50 + Math.sin(angle) * radius,
        left: 50 + Math.cos(angle) * radius,
        size: 1.4 + rand(i * 17.3 + 6) * 1.3,
        delay: rand(i * 19.1 + 8) * 6,
        duration: 5 + rand(i * 23.9 + 10) * 5,
        opacity: 0.55 + rand(i * 29.3 + 12) * 0.4,
        bright: true,
        drift: 2 + rand(i * 31.7 + 14) * 3,
      });
    }
    return items;
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 flex items-center justify-center"
      style={{ perspective: "1200px", overflow: "visible" }}
      aria-hidden="true"
    >
      {/* Ambient blue/violet glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(120,90,255,0.28), rgba(60,90,220,0.18) 35%, transparent 70%)",
          filter: "blur(40px)",
          transform: "translate(var(--px,0), var(--py,0))",
        }}
      />

      {/* Thin elegant orbit lines (flat SVG behind the cube) */}
      <svg
        className="absolute inset-0 m-auto pointer-events-none"
        width="520"
        height="520"
        viewBox="0 0 520 520"
        style={{ transform: "translate(calc(var(--px,0px) * 0.5), calc(var(--py,0px) * 0.5))" }}
      >
        <defs>
          <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(140,170,255,0)" />
            <stop offset="50%" stopColor="rgba(160,180,255,0.55)" />
            <stop offset="100%" stopColor="rgba(140,170,255,0)" />
          </linearGradient>
        </defs>
        <ellipse
          cx="260" cy="260" rx="220" ry="70"
          fill="none" stroke="url(#orbitGrad)" strokeWidth="0.8"
        />
        <ellipse
          cx="260" cy="260" rx="180" ry="58"
          fill="none" stroke="url(#orbitGrad)" strokeWidth="0.6"
          transform="rotate(18 260 260)" opacity="0.7"
        />
        <ellipse
          cx="260" cy="260" rx="240" ry="90"
          fill="none" stroke="url(#orbitGrad)" strokeWidth="0.5"
          transform="rotate(-14 260 260)" opacity="0.5"
        />
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full particle"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.bright
                ? "rgba(210,225,255,1)"
                : "rgba(180,200,255,0.85)",
              boxShadow: p.bright
                ? "0 0 8px rgba(170,190,255,0.95), 0 0 14px rgba(120,150,255,0.5)"
                : "0 0 3px rgba(140,170,255,0.5)",
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              // per-particle drift distance
              // @ts-expect-error CSS var
              "--drift": `${p.drift}px`,
            }}
          />
        ))}
      </div>


      {/* Cube */}
      <div
        className="relative cube-float"
        style={{
          width: "260px",
          height: "260px",
          transformStyle: "preserve-3d",
          transform: "rotateX(var(--rx, -12deg)) rotateY(var(--ry, 24deg))",
          transition: "transform 0.2s ease-out",
        }}
      >
        {[
          { t: "translateZ(130px)" },
          { t: "rotateY(180deg) translateZ(130px)" },
          { t: "rotateY(90deg) translateZ(130px)" },
          { t: "rotateY(-90deg) translateZ(130px)" },
          { t: "rotateX(90deg) translateZ(130px)" },
          { t: "rotateX(-90deg) translateZ(130px)" },
        ].map((f, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              transform: f.t,
              background:
                "linear-gradient(135deg, rgba(120,160,255,0.28), rgba(60,80,200,0.18))",
              border: "1px solid rgba(180,200,255,0.35)",
              boxShadow:
                "inset 0 0 40px rgba(140,170,255,0.25), 0 0 40px rgba(80,120,255,0.25)",
              backdropFilter: "blur(6px)",
            }}
          >
            {/* Glass reflection highlight */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 22%, transparent 45%)",
                mixBlendMode: "screen",
              }}
            />
            <div
              className="absolute pointer-events-none"
              style={{
                left: "-20%",
                top: "60%",
                width: "70%",
                height: "20%",
                background:
                  "linear-gradient(90deg, transparent, rgba(200,220,255,0.35), transparent)",
                filter: "blur(6px)",
                transform: "rotate(-18deg)",
              }}
            />
          </div>
        ))}

        {/* Front-face logo overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl"
          style={{ transform: "translateZ(131px)" }}
        >
          <svg width="140" height="140" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="sgrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#cfe0ff" />
                <stop offset="100%" stopColor="#7aa2ff" />
              </linearGradient>
            </defs>
            <text
              x="50"
              y="66"
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontWeight={700}
              fontSize="60"
              fill="url(#sgrad)"
              style={{ filter: "drop-shadow(0 0 8px rgba(140,170,255,0.6))" }}
            >
              S
            </text>
          </svg>
        </div>
      </div>

      {/* Faint halo under the cube */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "18%",
          left: "50%",
          width: "300px",
          height: "50px",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at center, rgba(120,150,255,0.45), rgba(80,100,220,0.15) 45%, transparent 70%)",
          filter: "blur(14px)",
        }}
      />

      <style>{`
        @keyframes heroFloat {
          0%, 100% { translate: 0 -6px; }
          50% { translate: 0 6px; }
        }
        .cube-float { animation: heroFloat 6s ease-in-out infinite; }
        @keyframes particleDrift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(calc(var(--drift, 4px) * 0.4), calc(var(--drift, 4px) * -1)); }
        }
        .particle { animation: particleDrift ease-in-out infinite; will-change: transform; }
        @keyframes heroAutoRotate {
          0%   { transform: rotateX(-10deg) rotateY(0deg); }
          50%  { transform: rotateX(-14deg) rotateY(180deg); }
          100% { transform: rotateX(-10deg) rotateY(360deg); }
        }
        @media (hover: none), (pointer: coarse) {
          .cube-float {
            animation: heroFloat 6s ease-in-out infinite, heroAutoRotate 22s linear infinite !important;
            transform: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .particle, .cube-float { animation: none; }
        }
      `}</style>
    </div>
  );
}
