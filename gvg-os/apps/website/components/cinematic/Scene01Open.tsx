"use client";

import { useRef } from "react";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 01｜Open — hyperspace compression rings → chrome-white GVG settle
 */
export function Scene01Open() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLHeadingElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const rings = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !mark.current || !copy.current) return;

      const ringEls = rings.current
        ? gsap.utils.toArray<HTMLElement>(rings.current.querySelectorAll(".open-scene__ring"))
        : [];

      gsap.set(mark.current, {
        opacity: 0,
        scale: 0.06,
        z: -900,
        filter: "blur(18px) brightness(2.4)",
      });
      gsap.set(copy.current, { opacity: 0, y: 28 });
      if (hint.current) gsap.set(hint.current, { opacity: 0, y: 10 });
      if (ringEls.length) {
        gsap.set(ringEls, { opacity: 0, scale: 0.15 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2600",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Layered space-compression rings (far → near)
      ringEls.forEach((ring, i) => {
        const t = i * 0.18;
        tl.to(
          ring,
          {
            opacity: 0.95 - i * 0.08,
            scale: 1.05 + i * 0.22,
            duration: 0.7,
            ease: "power2.in",
          },
          t,
        ).to(
          ring,
          {
            opacity: 0,
            scale: 2.4 + i * 0.35,
            duration: 0.75,
            ease: "power1.out",
          },
          t + 0.55,
        );
      });

      tl.to(
        mark.current,
        {
          opacity: 1,
          scale: 1.14,
          filter: "blur(2px) brightness(1.7)",
          duration: 1.4,
          ease: "power3.in",
        },
        0.15,
      )
        .to(
          mark.current,
          {
            scale: 1,
            filter: "blur(0px) brightness(1)",
            duration: 0.9,
            ease: "power2.out",
          },
          1.45,
        )
        .to(copy.current, { opacity: 1, y: 0, duration: 0.85 }, 1.9)
        .to(hint.current, { opacity: 1, y: 0, duration: 0.45 }, 2.25);
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black open-scene open-scene--cosmo" aria-label="Opening">
        <div className="open-scene__starfield" aria-hidden>
          <div className="open-scene__stars open-scene__stars--script" />
          <div className="open-scene__stars open-scene__stars--twinkle-b" />
        </div>

        <div ref={rings} className="open-scene__compression" aria-hidden>
          <span className="open-scene__ring open-scene__ring--1" />
          <span className="open-scene__ring open-scene__ring--2" />
          <span className="open-scene__ring open-scene__ring--3" />
          <span className="open-scene__ring open-scene__ring--4" />
          <span className="open-scene__ring open-scene__ring--5" />
          <span className="open-scene__jump-core" />
        </div>

        <div className="open-scene__brand open-scene__brand--raised">
          <h1 ref={mark} className="open-scene__mark open-scene__mark--white-glow">
            {MOVIE_V5.open.mark}
          </h1>
        </div>
        <div ref={copy} className="open-scene__copy">
          <p className="open-scene__kicker">{MOVIE_V5.open.title}</p>
          <p className="open-scene__line">
            <strong className="open-scene__line-gold">{MOVIE_V5.open.line}</strong>
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
