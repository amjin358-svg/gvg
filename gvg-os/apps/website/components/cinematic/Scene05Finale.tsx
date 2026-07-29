"use client";

import { useRef } from "react";
import Link from "next/link";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 05｜Finale —
 * Are you ready? (one letter per scroll step) → Begin with →
 * delayed gold Global Vista Group (no matte) + jump burst
 */
export function Scene05Finale() {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const readyRef = useRef<HTMLParagraphElement>(null);
  const lead = useRef<HTMLSpanElement>(null);
  const brand = useRef<HTMLSpanElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const line = useRef<HTMLParagraphElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const rays = useRef<HTMLDivElement>(null);
  const jump = useRef<HTMLDivElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const portal = process.env.NEXT_PUBLIC_PORTAL_URL || "/";

  const readyChars = MOVIE_V5.finale.ready.split("");

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !panel.current || !brand.current || !readyRef.current) return;

      const letters = gsap.utils.toArray<HTMLElement>(
        readyRef.current.querySelectorAll(".finale-scene__ready-char"),
      );

      gsap.set(panel.current, { opacity: 1 });
      gsap.set(letters, { opacity: 0, y: 42, scale: 0.4, rotateX: 50 });
      gsap.set(lead.current, { opacity: 0, y: 18, filter: "blur(6px)" });
      gsap.set(brand.current, { opacity: 0, y: 24, filter: "blur(10px)", color: "#fff8e0" });
      gsap.set(title.current, { opacity: 0 });
      gsap.set(line.current, { opacity: 0, y: 14 });
      if (burst.current) gsap.set(burst.current, { scale: 0.15, opacity: 0 });
      if (rays.current) gsap.set(rays.current, { opacity: 0, rotate: -16 });
      if (jump.current) gsap.set(jump.current, { opacity: 0, scale: 0.5 });
      if (actions.current) gsap.set(actions.current, { opacity: 0, y: 28 });

      // Long scrub so each letter maps to a wheel tick feel
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=4200",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1) Are you ready? — one letter pop per scroll slice
      letters.forEach((ch, i) => {
        tl.to(
          ch,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.28,
            ease: "back.out(2.2)",
          },
          i * 0.32,
        );
      });

      const afterReady = letters.length * 0.32 + 0.35;

      // 2) Begin with — one wheel beat
      tl.to(title.current, { opacity: 1, duration: 0.1 }, afterReady)
        .to(
          lead.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power2.out",
          },
          afterReady,
        )
        .to(letters, { opacity: 0.15, duration: 0.4 }, afterReady + 0.1)

        // 3) Global Vista Group — delay 1.5, bright gold, no matte/fog
        .to(
          brand.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            color: "#f0c14d",
            duration: 0.9,
            ease: "power3.out",
          },
          afterReady + 0.55 + 1.5,
        )
        .to(letters, { opacity: 0, duration: 0.35 }, afterReady + 0.55 + 1.35)

        // 4) Space-jump exit burst
        .to(jump.current, { opacity: 0.9, scale: 1.4, duration: 0.7, ease: "power2.in" }, "-=0.2")
        .to(burst.current, { opacity: 1, scale: 1.7, duration: 0.75, ease: "power2.out" }, "<0.05")
        .to(rays.current, { opacity: 0.8, rotate: 0, duration: 0.85 }, "<")
        .to(burst.current, { scale: 2.3, opacity: 0.35, duration: 0.8 }, "+=0.15")
        .to(jump.current, { opacity: 0.15, scale: 1.9, duration: 0.7 }, "<")
        .to(line.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.25")
        .to(actions.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.15");
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black finale-scene" aria-label="Finale">
        <div ref={jump} className="finale-scene__jump" aria-hidden />
        <div ref={burst} className="finale-scene__burst" aria-hidden />
        <div ref={rays} className="finale-scene__rays" aria-hidden />

        <div ref={panel} className="finale-scene__panel">
          <p ref={readyRef} className="finale-scene__ready" aria-label={MOVIE_V5.finale.ready}>
            {readyChars.map((ch, i) => (
              <span
                key={`${ch}-${i}`}
                className={`finale-scene__ready-char${ch === " " ? " is-space" : ""}`}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </p>

          <h2 ref={title} className="finale-scene__title">
            <span ref={lead} className="finale-scene__lead">
              {MOVIE_V5.finale.lead}
            </span>{" "}
            <span ref={brand} className="finale-scene__brand">
              {MOVIE_V5.finale.brand}
            </span>
          </h2>

          <p ref={line} className="finale-scene__line">
            <strong>{MOVIE_V5.finale.line}</strong>
            <span>{MOVIE_V5.finale.lineZh}</span>
          </p>

          <div ref={actions} className="finale-scene__actions">
            <a className="btn btn--glow" href={portal}>
              {MOVIE_V5.finale.ctaPrimary}
            </a>
            <Link className="btn btn--ghost btn--gvg-intro" href="/experience">
              {MOVIE_V5.finale.ctaAgain}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Scene05Finale;
