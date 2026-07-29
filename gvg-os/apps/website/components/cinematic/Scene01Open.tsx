"use client";

import { useRef } from "react";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V3 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 01｜Open — galaxy/cosmo plate + oversized GVG with soft yellow glow
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

      gsap.set(mark.current, { opacity: 0, scale: 0.82, filter: "blur(10px)" });
      gsap.set(copy.current, { opacity: 0, y: 32 });
      if (hint.current) gsap.set(hint.current, { opacity: 0, y: 12 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=2000",
            scrub: SCRUB_SMOOTH,
            pin: true,
            anticipatePin: 1,
          },
        })
        .to(mark.current, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
        })
        .to(copy.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.4")
        .to(hint.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25")
        .to(mark.current, { scale: 1.04, duration: 0.8 }, "+=0.35");
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black open-scene open-scene--cosmo" aria-label="Opening">
        <div className="open-scene__nebula" aria-hidden />
        <div className="open-scene__stars" aria-hidden />
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
