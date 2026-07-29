"use client";

import { useRef } from "react";
import Link from "next/link";
import SplitType from "split-type";
import { revertSplit } from "@/components/animation/SplitText";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 05｜Finale — hyperspace jump burst + dual overlapping shockwaves
 */
export function Scene05Finale() {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const brand = useRef<HTMLSpanElement>(null);
  const lead = useRef<HTMLSpanElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const rays = useRef<HTMLDivElement>(null);
  const jump = useRef<HTMLDivElement>(null);
  const waveA = useRef<HTMLDivElement>(null);
  const waveB = useRef<HTMLDivElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const portal = process.env.NEXT_PUBLIC_PORTAL_URL || "/";

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !panel.current || !brand.current) return;

      const split = new SplitType(brand.current, { types: "chars" });
      const chars = split.chars?.length ? split.chars : [brand.current];

      gsap.set(panel.current, { opacity: 0, y: 36, scale: 0.72 });
      gsap.set(lead.current, { opacity: 0, y: 10 });
      gsap.set(chars, {
        opacity: 0,
        y: 24,
        scaleX: 0.2,
        scaleY: 1.8,
        filter: "blur(10px) brightness(2)",
      });
      if (burst.current) gsap.set(burst.current, { scale: 0.1, opacity: 0 });
      if (rays.current) gsap.set(rays.current, { opacity: 0, rotate: -24, scale: 0.6 });
      if (jump.current) gsap.set(jump.current, { opacity: 0, scaleY: 0.2 });
      if (waveA.current) gsap.set(waveA.current, { scale: 0.15, opacity: 0 });
      if (waveB.current) gsap.set(waveB.current, { scale: 0.1, opacity: 0 });
      if (actions.current) gsap.set(actions.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2800",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(panel.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
      })
        // Space-jump spool
        .to(jump.current, { opacity: 0.95, scaleY: 1.4, duration: 0.9, ease: "power3.in" }, "<0.05")
        .to(burst.current, { opacity: 1, scale: 1.8, duration: 0.95, ease: "power2.out" }, "<0.1")
        .to(rays.current, { opacity: 0.9, rotate: 0, scale: 1.15, duration: 1.1, ease: "sine.out" }, "<")
        // Dual overlapping shockwaves (offset timing)
        .to(
          waveA.current,
          { opacity: 0.95, scale: 1.55, duration: 1.15, ease: "power2.out" },
          "<0.05",
        )
        .to(
          waveB.current,
          { opacity: 0.85, scale: 1.9, duration: 1.35, ease: "power2.out" },
          "<0.22",
        )
        .to(lead.current, { opacity: 1, y: 0, duration: 0.55 }, "<0.15")
        .to(
          chars,
          {
            opacity: 1,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            filter: "blur(0px) brightness(1)",
            stagger: 0.04,
            duration: 0.95,
            ease: "power3.out",
          },
          "+=0.85",
        )
        .to(burst.current, { scale: 2.6, opacity: 0.45, duration: 1.0, ease: "power1.inOut" }, "-=0.4")
        .to(waveA.current, { scale: 2.4, opacity: 0.2, duration: 1.0, ease: "power1.out" }, "<")
        .to(waveB.current, { scale: 2.85, opacity: 0.18, duration: 1.15, ease: "power1.out" }, "<0.1")
        .to(jump.current, { opacity: 0.2, scaleY: 1.9, duration: 1.0, ease: "power2.out" }, "<")
        .to(panel.current, { scale: 1.04, duration: 0.65, ease: "sine.inOut" })
        .to(actions.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

      return () => {
        revertSplit(split);
      };
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black finale-scene" aria-label="Finale">
        <div ref={jump} className="finale-scene__jump" aria-hidden />
        <div ref={burst} className="finale-scene__burst" aria-hidden />
        <div ref={rays} className="finale-scene__rays" aria-hidden />
        <div ref={waveA} className="finale-scene__shockwave finale-scene__shockwave--a" aria-hidden />
        <div ref={waveB} className="finale-scene__shockwave finale-scene__shockwave--b" aria-hidden />
        <div ref={panel} className="finale-scene__panel">
          <h2 className="finale-scene__title">
            <span ref={lead} className="finale-scene__lead">
              {MOVIE_V5.finale.lead}{" "}
            </span>
            <span ref={brand} className="finale-scene__brand">
              {MOVIE_V5.finale.brand}
            </span>
          </h2>
          <p className="finale-scene__line">
            <strong>{MOVIE_V5.finale.line}</strong>
            <span>{MOVIE_V5.finale.lineZh}</span>
          </p>
          <div ref={actions} className="finale-scene__actions">
            <a className="btn btn--glow" href={portal}>
              {MOVIE_V5.finale.ctaPrimary}
            </a>
            <Link className="btn btn--ghost" href="/experience">
              {MOVIE_V5.finale.ctaAgain}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Scene05Finale;
