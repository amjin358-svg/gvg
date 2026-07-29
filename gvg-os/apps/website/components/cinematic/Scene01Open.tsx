"use client";

import { useRef } from "react";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V3 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 01｜Open — rotating galaxy + GVG slow 3s float-in with large scale delta
 */
export function Scene01Open() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLHeadingElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !mark.current || !copy.current) return;

      // Large entrance → settle delta (~3× visual grow while floating up)
      gsap.set(mark.current, {
        opacity: 0,
        y: 140,
        scale: 0.28,
        filter: "blur(14px)",
      });
      gsap.set(copy.current, { opacity: 0, y: 40 });
      if (hint.current) gsap.set(hint.current, { opacity: 0, y: 12 });

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
        .to(mark.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 3,
          ease: "power2.out",
        })
        .to(copy.current, { opacity: 1, y: 0, duration: 1.1 }, "-=1.1")
        .to(hint.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.35")
        .to(mark.current, { scale: 1.06, duration: 0.9 }, "+=0.25");
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black open-scene open-scene--cosmo" aria-label="Opening">
        <div className="open-scene__galaxy-spin" aria-hidden>
          <div className="open-scene__nebula" />
          <div className="open-scene__stars open-scene__stars--twinkle" />
          <div className="open-scene__stars open-scene__stars--twinkle-b" />
        </div>
        <h1 ref={mark} className="open-scene__mark">
          {MOVIE_V3.open.mark}
        </h1>
        <div ref={copy} className="open-scene__copy">
          <p className="open-scene__kicker">{MOVIE_V3.open.title}</p>
          <p className="open-scene__line">
            <strong>{MOVIE_V3.open.line}</strong>
            <span>{MOVIE_V3.open.lineZh}</span>
          </p>
        </div>
        <div ref={hint} className="open-scene__hint" aria-hidden>
          <span className="opening-scene__mouse" />
          <span>{MOVIE_V3.open.hint}</span>
        </div>
      </section>
    </div>
  );
}

export default Scene01Open;
