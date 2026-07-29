"use client";

import { useRef } from "react";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 01｜Open — hyperspace zoom-in from far; gold → light-white glow loop
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
        scale: 0.08,
        z: -800,
        filter: "blur(16px) brightness(2.2)",
      });
      gsap.set(copy.current, { opacity: 0, y: 28 });
      if (hint.current) gsap.set(hint.current, { opacity: 0, y: 10 });
      if (warp.current) gsap.set(warp.current, { opacity: 0, scale: 0.4 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=2400",
            scrub: SCRUB_SMOOTH,
            pin: true,
            anticipatePin: 1,
          },
        })
        .to(warp.current, { opacity: 0.85, scale: 1.35, duration: 0.9, ease: "power2.in" }, 0)
        .to(
          mark.current,
          {
            opacity: 1,
            scale: 1.12,
            filter: "blur(3px) brightness(1.6)",
            duration: 1.35,
            ease: "power3.in",
          },
          0.1,
        )
        .to(
          mark.current,
          {
            scale: 1,
            filter: "blur(0px) brightness(1)",
            duration: 0.85,
            ease: "power2.out",
          },
          1.4,
        )
        .to(warp.current, { opacity: 0, scale: 1.8, duration: 0.9, ease: "power1.out" }, 1.45)
        .to(copy.current, { opacity: 1, y: 0, duration: 0.85 }, 1.85)
        .to(hint.current, { opacity: 1, y: 0, duration: 0.45 }, 2.2);
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black open-scene open-scene--cosmo" aria-label="Opening">
        <div className="open-scene__starfield" aria-hidden>
          <div className="open-scene__stars open-scene__stars--script" />
        </div>
        <div ref={warp} className="open-scene__jump-warp" aria-hidden />
        <div className="open-scene__brand">
          <h1 ref={mark} className="open-scene__mark open-scene__mark--glow-cycle">
            {MOVIE_V5.open.mark}
          </h1>
        </div>
        <div ref={copy} className="open-scene__copy">
          <p className="open-scene__kicker">{MOVIE_V5.open.title}</p>
          <p className="open-scene__line">
            <strong>{MOVIE_V5.open.line}</strong>
            <span className="open-scene__line-zh">{MOVIE_V5.open.lineZh}</span>
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
