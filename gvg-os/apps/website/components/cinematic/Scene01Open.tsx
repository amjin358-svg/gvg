"use client";

import { useRef } from "react";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 01｜Open — centered gold GVG; brief jump then settle (no vertical lines)
 */
export function Scene01Open() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLHeadingElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const warp = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !mark.current || !copy.current) return;

      gsap.set(mark.current, {
        opacity: 0,
        scale: 0.55,
        filter: "blur(10px)",
      });
      gsap.set(copy.current, { opacity: 0, y: 20 });
      if (hint.current) gsap.set(hint.current, { opacity: 0 });
      if (warp.current) gsap.set(warp.current, { opacity: 0, scale: 0.5 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=1800",
            scrub: SCRUB_SMOOTH,
            pin: true,
            anticipatePin: 1,
          },
        })
        // brief jump bloom
        .to(warp.current, { opacity: 0.7, scale: 1.2, duration: 0.7, ease: "power2.in" }, 0)
        .to(
          mark.current,
          {
            opacity: 1,
            scale: 1.08,
            filter: "blur(2px)",
            duration: 0.8,
            ease: "power2.out",
          },
          0.15,
        )
        // settle to center — warp lines fully gone
        .to(
          mark.current,
          {
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power2.out",
          },
          0.95,
        )
        .to(warp.current, { opacity: 0, scale: 1.6, duration: 0.85, ease: "power1.out" }, 0.95)
        .to(copy.current, { opacity: 1, y: 0, duration: 0.7 }, 1.4)
        .to(hint.current, { opacity: 1, duration: 0.4 }, 1.7);
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black open-scene open-scene--cosmo" aria-label="Opening">
        <div className="open-scene__starfield" aria-hidden>
          <div className="open-scene__stars open-scene__stars--min" />
        </div>
        <div ref={warp} className="open-scene__jump-warp" aria-hidden />
        <div className="open-scene__brand">
          <h1 ref={mark} className="open-scene__mark open-scene__mark--glow-loop">
            {MOVIE_V5.open.mark}
          </h1>
          <p className="open-scene__kicker">{MOVIE_V5.open.title}</p>
        </div>
        <div ref={copy} className="open-scene__copy">
          <p className="open-scene__line">
            <strong>{MOVIE_V5.open.line}</strong>
            <span>{MOVIE_V5.open.lineZh}</span>
          </p>
        </div>
        <div ref={hint} className="open-scene__hint" aria-hidden>
          <span className="opening-scene__mouse" />
          <span>{MOVIE_V5.open.hint}</span>
        </div>
      </section>
    </div>
  );
}

export default Scene01Open;
