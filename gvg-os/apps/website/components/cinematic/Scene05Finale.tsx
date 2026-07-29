"use client";

import { useRef } from "react";
import Link from "next/link";
import SplitType from "split-type";
import { revertSplit } from "@/components/animation/SplitText";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V3 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 05｜Finale — stunning close; brand name stays on one line
 */
export function Scene05Finale() {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const brand = useRef<HTMLSpanElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const rays = useRef<HTMLDivElement>(null);
  const portal = process.env.NEXT_PUBLIC_PORTAL_URL || "/";

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !panel.current || !brand.current) return;

      const split = new SplitType(brand.current, { types: "chars" });
      const chars = split.chars?.length ? split.chars : [brand.current];

      gsap.set(panel.current, { opacity: 0, y: 40, scale: 0.9 });
      gsap.set(chars, { opacity: 0, y: 28, scale: 0.7, rotateX: 40 });
      if (burst.current) gsap.set(burst.current, { scale: 0.2, opacity: 0 });
      if (rays.current) gsap.set(rays.current, { opacity: 0, rotate: -12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2000",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(panel.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: "power2.out",
      })
        .to(
          burst.current,
          { opacity: 0.9, scale: 1.35, duration: 0.9, ease: "power2.out" },
          "<0.1",
        )
        .to(
          rays.current,
          { opacity: 0.75, rotate: 0, duration: 1.1, ease: "sine.out" },
          "<",
        )
        .to(chars, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          stagger: 0.045,
          duration: 0.85,
          ease: "power3.out",
        })
        .to(
          burst.current,
          { scale: 1.85, opacity: 0.35, duration: 0.9, ease: "power1.inOut" },
          "-=0.3",
        )
        .to(panel.current, { scale: 1.03, duration: 0.55, ease: "sine.inOut" });

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
            <span className="finale-scene__lead">Begin with </span>
            <span ref={brand} className="finale-scene__brand">
              Global Vista Group
            </span>
          </h2>
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
