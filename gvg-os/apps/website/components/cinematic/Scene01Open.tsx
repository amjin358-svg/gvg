"use client";

import { useRef } from "react";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 01｜Open — dense starfield + hyperspace-jump charge into GVG
 */
export function Scene01Open() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLHeadingElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const warp = useRef<HTMLDivElement>(null);
  const charge = useRef<HTMLDivElement>(null);
  const streaks = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !mark.current || !copy.current) return;

      // Pre-jump charge: compressed, streaking, then settle into space
      gsap.set(mark.current, {
        opacity: 0,
        scaleX: 0.12,
        scaleY: 2.4,
        filter: "blur(18px) brightness(2.4)",
        letterSpacing: "0.55em",
      });
      gsap.set(copy.current, { opacity: 0, y: 36 });
      if (hint.current) gsap.set(hint.current, { opacity: 0, y: 12 });
      if (warp.current) gsap.set(warp.current, { opacity: 0, scale: 0.4 });
      if (charge.current) gsap.set(charge.current, { opacity: 0, scale: 0.2 });
      if (streaks.current) gsap.set(streaks.current, { opacity: 0, scaleY: 0.3 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=2800",
            scrub: SCRUB_SMOOTH,
            pin: true,
            anticipatePin: 1,
          },
        })
        // Jump spool-up
        .to(streaks.current, { opacity: 0.85, scaleY: 1.35, duration: 1.1, ease: "power2.in" }, 0)
        .to(charge.current, { opacity: 1, scale: 1.15, duration: 1.2, ease: "power2.in" }, 0.1)
        .to(warp.current, { opacity: 0.9, scale: 1.4, duration: 1.3, ease: "power3.in" }, 0.15)
        .to(
          mark.current,
          {
            opacity: 1,
            scaleX: 0.35,
            scaleY: 1.7,
            filter: "blur(8px) brightness(1.8)",
            duration: 1.2,
            ease: "power2.in",
          },
          0.2,
        )
        // Jump release → settle
        .to(
          mark.current,
          {
            scaleX: 1,
            scaleY: 1,
            filter: "blur(0px) brightness(1)",
            letterSpacing: "0.22em",
            duration: 1.6,
            ease: "power3.out",
          },
          1.4,
        )
        .to(streaks.current, { opacity: 0.15, scaleY: 1.8, duration: 1.4, ease: "power2.out" }, 1.45)
        .to(charge.current, { opacity: 0.25, scale: 1.8, duration: 1.3, ease: "power2.out" }, 1.5)
        .to(warp.current, { opacity: 0.2, scale: 2.2, duration: 1.5, ease: "power2.out" }, 1.55)
        .to(copy.current, { opacity: 1, y: 0, duration: 1.0 }, 2.2)
        .to(hint.current, { opacity: 1, y: 0, duration: 0.55 }, 2.6)
        .to(mark.current, { scaleX: 1.04, scaleY: 1.04, duration: 0.8 }, 3.1);
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black open-scene open-scene--cosmo" aria-label="Opening">
        <div className="open-scene__starfield" aria-hidden>
          <div className="open-scene__stars open-scene__stars--dense open-scene__stars--twinkle" />
          <div className="open-scene__stars open-scene__stars--dense-b open-scene__stars--twinkle-b" />
          <div className="open-scene__stars open-scene__stars--dense-c open-scene__stars--twinkle" />
        </div>
        <div ref={streaks} className="open-scene__jump-streaks" aria-hidden />
        <div ref={warp} className="open-scene__jump-warp" aria-hidden />
        <div ref={charge} className="open-scene__jump-charge" aria-hidden />
        <h1 ref={mark} className="open-scene__mark">
          {MOVIE_V5.open.mark}
        </h1>
        <div ref={copy} className="open-scene__copy">
          <p className="open-scene__kicker">{MOVIE_V5.open.title}</p>
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
