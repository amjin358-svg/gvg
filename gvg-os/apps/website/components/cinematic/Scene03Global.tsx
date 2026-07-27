"use client";

import { useRef } from "react";
import { GLOBAL_ROUTE } from "@/lib/globalRoute";
import { BRAND_GOLD, CLASSIC_GOLD, MOVIE_ASSETS } from "@/lib/cinematic";
import { createGlobalRouteTimeline } from "@/components/animation/ScrollAnimations";
import { registerGsapPlugins, useGSAP } from "@/lib/gsap";

function hopPoint(index: number, total: number) {
  const t = total <= 1 ? 0.5 : index / (total - 1);
  return {
    x: 12 + t * 76,
    y: 55 + Math.sin(t * Math.PI) * -18,
  };
}

/**
 * Scene 3｜Global
 * USA → Taiwan → Japan → Vietnam → Europe
 * Golden Arc → Glow → Pulse
 */
export function Scene03Global() {
  const root = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLParagraphElement>(null);
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
        finale: finaleRef.current,
        map: mapRef.current,
      });
    },
    { scope: root },
  );

  const points = GLOBAL_ROUTE.map((_, i) => hopPoint(i, GLOBAL_ROUTE.length));

  return (
    <div ref={root}>
      <section className="scene scene--navy network-scene" aria-label="Global hops">
        <div
          ref={mapRef}
          className="network-scene__map network-scene__map--photo"
          aria-hidden
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 50% 45%, rgba(11,31,58,0.25), rgba(1,4,12,0.82) 70%),
              linear-gradient(180deg, rgba(1,4,12,0.35), rgba(1,4,12,0.7)),
              url("${MOVIE_ASSETS.mapDark}")
            `,
          }}
        >
          <div className="network-scene__continent network-scene__continent--americas" />
          <div className="network-scene__continent network-scene__continent--eurasia" />
          <div className="network-scene__continent network-scene__continent--sea" />
          <div className="network-scene__grid" />
        </div>
        <div className="noise-overlay" />

        <svg
          className="network-scene__arcs"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
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
                className="network-scene__pulse"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
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

        <p ref={finaleRef} className="network-scene__finale">
          Global Supply Chain · 全球供應網絡
        </p>
      </section>
    </div>
  );
}

export default Scene03Global;
