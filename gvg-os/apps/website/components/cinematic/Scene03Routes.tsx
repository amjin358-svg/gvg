"use client";

import { useRef } from "react";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 03｜Routes — hubs sit lower so they never cover the subtitle block
 */
export function Scene03Routes() {
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hubRefs = useRef<(HTMLElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      const hubs = hubRefs.current.filter(Boolean) as HTMLElement[];
      const lines = lineRefs.current.filter(Boolean) as SVGLineElement[];

      gsap.set(titleRef.current, { opacity: 0, y: 24 });
      gsap.set(hubs, { opacity: 0, scale: 0.7 });
      gsap.set(lines, { strokeDasharray: 120, strokeDashoffset: 120, opacity: 0.2 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2400",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.7 });
      hubs.forEach((hub, i) => {
        tl.to(hub, { opacity: 1, scale: 1, duration: 0.55 }, 0.35 + i * 0.35);
        if (lines[i]) {
          tl.to(
            lines[i],
            { strokeDashoffset: 0, opacity: 0.85, duration: 0.6 },
            0.45 + i * 0.35,
          );
        }
      });
    },
    { scope: root },
  );

  const hubs = MOVIE_V5.routes.hubs;
  // Keep hubs in the lower constellation band so 供應樞紐 / 合規通道
  // never overlap the top subtitle copy.
  const points = [
    { x: 16, y: 58 },
    { x: 38, y: 68 },
    { x: 64, y: 64 },
    { x: 84, y: 74 },
  ];

  return (
    <div ref={root}>
      <section className="scene scene--cosmos routes-scene" aria-label="Trade routes">
        <div className="routes-scene__glow" aria-hidden />
        <div ref={titleRef} className="routes-scene__copy">
          <p className="scene-eyebrow">{MOVIE_V5.routes.eyebrow}</p>
          <h2>{MOVIE_V5.routes.title}</h2>
          <p>{MOVIE_V5.routes.body}</p>
        </div>

        <svg className="routes-scene__lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          {points.slice(0, -1).map((p, i) => {
            const n = points[i + 1]!;
            return (
              <line
                key={`${p.x}-${n.x}`}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                x1={p.x}
                y1={p.y}
                x2={n.x}
                y2={n.y}
                stroke="url(#routeGrad)"
                strokeWidth="0.35"
              />
            );
          })}
          <defs>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7EB6FF" />
              <stop offset="100%" stopColor="#8B6CFF" />
            </linearGradient>
          </defs>
        </svg>

        <div className="routes-scene__hubs">
          {hubs.map((hub, i) => {
            const p = points[i]!;
            return (
              <article
                key={hub.name}
                ref={(el) => {
                  hubRefs.current[i] = el;
                }}
                className="routes-scene__hub"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span className="routes-scene__pulse" aria-hidden />
                <strong>{hub.name}</strong>
                <small>{hub.note}</small>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Scene03Routes;
