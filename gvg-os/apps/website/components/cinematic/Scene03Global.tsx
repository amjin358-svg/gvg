"use client";

import { useRef } from "react";
import { GLOBAL_ROUTE } from "@/lib/globalRoute";
import { BRAND_GOLD, CLASSIC_GOLD } from "@/lib/cinematic";
import { createGlobalRouteTimeline } from "@/components/animation/ScrollAnimations";
import { registerGsapPlugins, useGSAP } from "@/lib/gsap";

function hopPoint(index: number, total: number) {
  const t = total <= 1 ? 0.5 : index / (total - 1);
  return {
    x: 12 + t * 76,
    y: 55 + Math.sin(t * Math.PI) * -18,
  };
}

export function Scene03Global() {
  const root = useRef<HTMLElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arcRefs = useRef<(SVGPathElement | null)[]>([]);
  const glowRefs = useRef<(SVGPathElement | null)[]>([]);
  const pulseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      createGlobalRouteTimeline({
        section: root.current,
        hopLabels: labelRefs.current.filter(Boolean) as HTMLElement[],
        arcs: arcRefs.current.filter(Boolean) as SVGPathElement[],
        glows: glowRefs.current.filter(Boolean) as SVGPathElement[],
        pulses: pulseRefs.current.filter(Boolean) as HTMLElement[],
        railItems: railRefs.current.filter(Boolean) as HTMLElement[],
      });
    },
    { scope: root },
  );

  const points = GLOBAL_ROUTE.map((_, i) =>
    hopPoint(i, GLOBAL_ROUTE.length),
  );

  return (
    <section ref={root} className="scene scene--navy">
      <div className="noise-overlay" />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {points.slice(0, -1).map((p, i) => {
          const n = points[i + 1]!;
          const midX = (p.x + n.x) / 2;
          const midY = Math.min(p.y, n.y) - 12;
          const d = `M ${p.x} ${p.y} Q ${midX} ${midY} ${n.x} ${n.y}`;
          return (
            <g key={GLOBAL_ROUTE[i]!.id}>
              <path
                ref={(el) => {
                  arcRefs.current[i] = el;
                }}
                d={d}
                fill="none"
                stroke={BRAND_GOLD}
                strokeWidth="0.6"
                strokeLinecap="round"
                opacity={0}
              />
              <path
                ref={(el) => {
                  glowRefs.current[i] = el;
                }}
                d={d}
                fill="none"
                stroke={CLASSIC_GOLD}
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity={0}
                style={{ filter: "blur(1.2px)" }}
              />
            </g>
          );
        })}
      </svg>

      {GLOBAL_ROUTE.map((hop, i) => {
        const p = points[i]!;
        return (
          <div key={hop.id}>
            <div
              ref={(el) => {
                pulseRefs.current[i] = el;
              }}
              style={{
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: 28,
                height: 28,
                marginLeft: -14,
                marginTop: -14,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${CLASSIC_GOLD}, transparent)`,
                opacity: 0,
                pointerEvents: "none",
              }}
            />
            <div
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className="hop-label"
              style={{
                top: `calc(${p.y}% + 2.5rem)`,
                left: `${p.x}%`,
              }}
            >
              {hop.label}
            </div>
          </div>
        );
      })}

      <nav className="global-hop-rail" aria-label="Global market hops">
        {GLOBAL_ROUTE.map((hop, i) => (
          <div key={`rail-${hop.id}`} className="global-hop-rail__step">
            <span
              ref={(el) => {
                railRefs.current[i] = el;
              }}
              className="global-hop-rail__label"
            >
              {hop.label}
            </span>
            {i < GLOBAL_ROUTE.length - 1 ? (
              <span className="global-hop-rail__arrow" aria-hidden>
                ↓
              </span>
            ) : null}
          </div>
        ))}
      </nav>
    </section>
  );
}

export default Scene03Global;
