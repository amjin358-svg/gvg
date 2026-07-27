"use client";

import { useRef } from "react";
import Link from "next/link";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V3 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 05｜Finale — compact close (replaces old ending lockup)
 */
export function Scene05Finale() {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const portal = process.env.NEXT_PUBLIC_PORTAL_URL || "/";

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !panel.current) return;

      gsap.set(panel.current, { opacity: 0, y: 30, scale: 0.96 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=1200",
            scrub: SCRUB_SMOOTH,
            pin: true,
            anticipatePin: 1,
          },
        })
        .to(panel.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black finale-scene" aria-label="Finale">
        <div ref={panel} className="finale-scene__panel">
          <h2>{MOVIE_V3.finale.title}</h2>
          <p className="finale-scene__line">
            <strong>{MOVIE_V3.finale.line}</strong>
            <span>{MOVIE_V3.finale.lineZh}</span>
          </p>
          <div className="finale-scene__actions">
            <Link className="btn btn--glow" href={portal}>
              {MOVIE_V3.finale.ctaPrimary}
            </Link>
            <Link className="btn btn--ghost" href="/experience">
              {MOVIE_V3.finale.ctaAgain}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Scene05Finale;
