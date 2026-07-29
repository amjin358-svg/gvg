"use client";

import { useRef } from "react";
import Link from "next/link";
import SplitType from "split-type";
import { revertSplit } from "@/components/animation/SplitText";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V3 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 05｜Finale — same-line title, burst glow, brand delayed 1.5s gold entrance
 */
export function Scene05Finale() {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const brand = useRef<HTMLSpanElement>(null);
  const lead = useRef<HTMLSpanElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const rays = useRef<HTMLDivElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const portal = process.env.NEXT_PUBLIC_PORTAL_URL || "/";

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !panel.current || !brand.current) return;

      const split = new SplitType(brand.current, { types: "chars" });
      const chars = split.chars?.length ? split.chars : [brand.current];

      // Settle ~3× from entrance scale
      gsap.set(panel.current, { opacity: 0, y: 48, scale: 0.33 });
      gsap.set(lead.current, { opacity: 0, y: 12 });
      gsap.set(chars, { opacity: 0, y: 36, scale: 0.45, rotateX: 55 });
      if (burst.current) gsap.set(burst.current, { scale: 0.15, opacity: 0 });
      if (rays.current) gsap.set(rays.current, { opacity: 0, rotate: -18 });
      if (actions.current) gsap.set(actions.current, { opacity: 0, y: 28 });

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

      tl.to(panel.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: "power2.out",
      })
        .to(
          burst.current,
          { opacity: 1, scale: 1.55, duration: 1.0, ease: "power2.out" },
          "<0.05",
        )
        .to(
          rays.current,
          { opacity: 0.85, rotate: 0, duration: 1.2, ease: "sine.out" },
          "<",
        )
        .to(lead.current, { opacity: 1, y: 0, duration: 0.6 }, "<0.15")
        // Global Vista Group delayed ~1.5s after lead/burst start
        .to(
          chars,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            stagger: 0.05,
            duration: 1.0,
            ease: "power3.out",
          },
          "+=1.5",
        )
        .to(
          burst.current,
          { scale: 2.1, opacity: 0.4, duration: 1.0, ease: "power1.inOut" },
          "-=0.35",
        )
        .to(panel.current, { scale: 1.08, duration: 0.7, ease: "sine.inOut" })
        .to(actions.current, { opacity: 1, y: 0, duration: 0.65 }, "-=0.35");

      return () => {
        revertSplit(split);
      };
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black finale-scene" aria-label="Finale">
        <div ref={burst} className="finale-scene__burst" aria-hidden />
        <div ref={rays} className="finale-scene__rays" aria-hidden />
        <div ref={panel} className="finale-scene__panel">
          <h2 className="finale-scene__title">
            <span ref={lead} className="finale-scene__lead">
              {MOVIE_V3.finale.lead}{" "}
            </span>
            <span ref={brand} className="finale-scene__brand">
              {MOVIE_V3.finale.brand}
            </span>
          </h2>
          <p className="finale-scene__line">
            <strong>{MOVIE_V3.finale.line}</strong>
            <span>{MOVIE_V3.finale.lineZh}</span>
          </p>
          <div ref={actions} className="finale-scene__actions">
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
