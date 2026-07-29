"use client";

import { useRef } from "react";
import Link from "next/link";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { TradeSceneWipe } from "@/components/cinematic/TradeSceneWipe";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 05｜Finale —
 * Word-by-word scroll (far tiny → near huge → fade):
 * Are · you · ready? · Begin · with → VIP white Global Vista Group
 */
export function Scene05Finale() {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wordStage = useRef<HTMLDivElement>(null);
  const brand = useRef<HTMLHeadingElement>(null);
  const line = useRef<HTMLParagraphElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const rays = useRef<HTMLDivElement>(null);
  const jump = useRef<HTMLDivElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const portal = process.env.NEXT_PUBLIC_PORTAL_URL || "/";

  const words = MOVIE_V5.finale.words;

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !panel.current || !brand.current || !wordStage.current) return;

      const wordEls = gsap.utils.toArray<HTMLElement>(
        wordStage.current.querySelectorAll(".finale-scene__zoom-word"),
      );

      gsap.set(panel.current, { opacity: 1 });
      gsap.set(wordEls, {
        opacity: 0,
        scale: 0.08,
        xPercent: -50,
        yPercent: -50,
        z: -600,
        transformPerspective: 800,
        filter: "blur(12px)",
      });
      gsap.set(brand.current, {
        opacity: 0,
        scale: 0.82,
        y: 36,
        filter: "blur(0px)",
        color: "#ffffff",
      });
      gsap.set(line.current, { opacity: 0, y: 14 });
      if (burst.current) gsap.set(burst.current, { scale: 0.15, opacity: 0 });
      if (rays.current) gsap.set(rays.current, { opacity: 0, rotate: -16 });
      if (jump.current) gsap.set(jump.current, { opacity: 0, scale: 0.5 });
      if (actions.current) gsap.set(actions.current, { opacity: 0, y: 28 });

      // One scrub slice ≈ one wheel tick per word
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=5200",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      const BEAT = 0.85;

      wordEls.forEach((el, i) => {
        const t = i * BEAT;
        // Far tiny → near huge
        tl.to(
          el,
          {
            opacity: 1,
            scale: 1.05,
            z: 0,
            filter: "blur(0px)",
            duration: 0.38,
            ease: "power3.out",
          },
          t,
        )
          .to(
            el,
            {
              scale: 3.6,
              opacity: 0,
              z: 220,
              filter: "blur(6px)",
              duration: 0.42,
              ease: "power2.in",
            },
            t + 0.38,
          );
      });

      const afterWords = words.length * BEAT + 0.2;

      // VIP slow entrance — bright white, no matte
      tl.to(jump.current, { opacity: 0.75, scale: 1.25, duration: 0.7, ease: "power2.in" }, afterWords)
        .to(burst.current, { opacity: 1, scale: 1.55, duration: 0.9, ease: "power2.out" }, afterWords + 0.1)
        .to(rays.current, { opacity: 0.75, rotate: 0, duration: 1.0 }, afterWords + 0.1)
        .to(
          brand.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.65,
            ease: "power1.out",
          },
          afterWords + 0.55,
        )
        .to(burst.current, { scale: 2.2, opacity: 0.28, duration: 0.9 }, afterWords + 1.4)
        .to(jump.current, { opacity: 0.12, scale: 1.85, duration: 0.8 }, afterWords + 1.4)
        .to(line.current, { opacity: 1, y: 0, duration: 0.55 }, afterWords + 1.85)
        .to(actions.current, { opacity: 1, y: 0, duration: 0.5 }, afterWords + 2.05);
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black finale-scene" aria-label="Finale">
        <TradeSceneWipe theme="vip" />
        <div ref={jump} className="finale-scene__jump" aria-hidden />
        <div ref={burst} className="finale-scene__burst" aria-hidden />
        <div ref={rays} className="finale-scene__rays" aria-hidden />

        <div ref={panel} className="finale-scene__panel finale-scene__panel--vip">
          <div
            ref={wordStage}
            className="finale-scene__word-stage"
            aria-label={`${MOVIE_V5.finale.ready} ${MOVIE_V5.finale.lead}`}
          >
            {words.map((word) => (
              <span key={word} className="finale-scene__zoom-word">
                {word}
              </span>
            ))}
          </div>

          <h2 ref={brand} className="finale-scene__brand finale-scene__brand--vip-white">
            {MOVIE_V5.finale.brand}
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
