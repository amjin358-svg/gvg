"use client";

import { useRef } from "react";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 01｜Open — minimal stars, gold GVG glow-loop, matching-width brand line
 */
export function Scene01Open() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLHeadingElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const warp = useRef<HTMLDivElement>(null);
  const charge = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !mark.current || !copy.current) return;

      gsap.set(mark.current, {
        opacity: 0,
        scaleX: 0.12,
        scaleY: 2.4,
        filter: "blur(18px) brightness(2.2)",
        letterSpacing: "0.55em",
      });
      gsap.set(copy.current, { opacity: 0, y: 36 });
      if (hint.current) gsap.set(hint.current, { opacity: 0, y: 12 });
      if (warp.current) gsap.set(warp.current, { opacity: 0, scale: 0.4 });
      if (charge.current) gsap.set(charge.current, { opacity: 0, scale: 0.2 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=2600",
            scrub: SCRUB_SMOOTH,
            pin: true,
            anticipatePin: 1,
          },
        })
        .to(charge.current, { opacity: 1, scale: 1.1, duration: 1.1, ease: "power2.in" }, 0)
        .to(warp.current, { opacity: 0.85, scale: 1.35, duration: 1.2, ease: "power3.in" }, 0.08)
        .to(
          mark.current,
          {
            opacity: 1,
            scaleX: 0.35,
            scaleY: 1.65,
            filter: "blur(8px) brightness(1.7)",
            duration: 1.15,
            ease: "power2.in",
          },
          0.15,
        )
        .to(
          mark.current,
          {
            scaleX: 1,
            scaleY: 1,
            filter: "blur(0px) brightness(1)",
            letterSpacing: "0.22em",
            duration: 1.5,
            ease: "power3.out",
          },
          1.3,
        )
        .to(charge.current, { opacity: 0.18, scale: 1.7, duration: 1.2, ease: "power2.out" }, 1.4)
        .to(warp.current, { opacity: 0.12, scale: 2.1, duration: 1.35, ease: "power2.out" }, 1.45)
        .to(copy.current, { opacity: 1, y: 0, duration: 1.0 }, 2.05)
        .to(hint.current, { opacity: 1, y: 0, duration: 0.5 }, 2.45);
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black open-scene open-scene--cosmo" aria-label="Opening">
        <div className="open-scene__starfield" aria-hidden>
          <div className="open-scene__stars open-scene__stars--min open-scene__stars--twinkle" />
        </div>
        <div ref={warp} className="open-scene__jump-warp" aria-hidden />
        <div ref={charge} className="open-scene__jump-charge" aria-hidden />
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
