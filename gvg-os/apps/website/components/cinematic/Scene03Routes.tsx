"use client";

import { useRef } from "react";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 03｜Routes — floating yellow hubs revealed by a satellite path
 */
export function Scene03Routes() {
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hubRefs = useRef<(HTMLElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const satRef = useRef<HTMLDivElement>(null);

  // Keep hubs in lower band so they never cover the subtitle
  const points = [
    { x: 16, y: 58 },
    { x: 38, y: 70 },
    { x: 62, y: 66 },
    { x: 84, y: 76 },
  ];

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      const hubs = hubRefs.current.filter(Boolean) as HTMLElement[];
      const lines = lineRefs.current.filter(Boolean) as SVGLineElement[];

      gsap.set(titleRef.current, { opacity: 0, y: 20 });
      gsap.set(hubs, { opacity: 0, scale: 0.65, y: 18 });
      gsap.set(lines, { strokeDasharray: 140, strokeDashoffset: 140, opacity: 0.15 });
      if (satRef.current) {
        gsap.set(satRef.current, {
          left: `${points[0]!.x}%`,
          top: `${points[0]!.y}%`,
          opacity: 0,
          scale: 0.6,
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2800",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.65 });
      tl.to(satRef.current, { opacity: 1, scale: 1, duration: 0.4 }, 0.4);

      hubs.forEach((hub, i) => {
        const p = points[i]!;
        const t = 0.55 + i * 0.55;
        tl.to(
          satRef.current,
          {
            left: `${p.x}%`,
            top: `${p.y}%`,
            duration: 0.5,
            ease: "power1.inOut",
          },
          t,
        );
        tl.to(
          hub,
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" },
          t + 0.15,
        );
        if (lines[i]) {
          tl.to(
            lines[i],
            { strokeDashoffset: 0, opacity: 0.85, duration: 0.55 },
            t + 0.2,
          );
        }
        // Float via CSS so it doesn't fight scrub y
        tl.add(() => {
          hub.classList.add("is-floating");
        }, t + 0.45);
      });
    },
    { scope: root },
  );

  const hubs = MOVIE_V5.routes.hubs;

  return (
    <div ref={root}>
      <section className="scene scene--cosmos routes-scene" aria-label="Trade routes">
        <div className="routes-scene__glow" aria-hidden />
        <div ref={titleRef} className="routes-scene__copy">
          <p className="scene-eyebrow">{MOVIE_V5.routes.eyebrow}</p>
          <h2>{MOVIE_V5.routes.title}</h2>
          <p className="routes-scene__body">{MOVIE_V5.routes.body}</p>
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
              <stop offset="0%" stopColor="#F0C14D" />
              <stop offset="100%" stopColor="#7EB6FF" />
            </linearGradient>
          </defs>
        </svg>

        <div
          ref={satRef}
          className="routes-scene__sat"
          aria-hidden
          style={{ left: `${points[0]!.x}%`, top: `${points[0]!.y}%` }}
        >
          <svg viewBox="0 0 64 64" width="44" height="44">
            <rect x="26" y="22" width="12" height="20" rx="2" fill="#dce9ff" />
            <rect x="10" y="28" width="14" height="8" rx="1" fill="#7eb6ff" opacity="0.9" />
            <rect x="40" y="28" width="14" height="8" rx="1" fill="#7eb6ff" opacity="0.9" />
            <circle cx="32" cy="18" r="4" fill="#f0c14d" />
            <path d="M30 42 L32 54 L34 42 Z" fill="#9ec5ff" />
          </svg>
        </div>

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
