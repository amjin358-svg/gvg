"use client";

import { useRef } from "react";
import Link from "next/link";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { TradeSceneWipe } from "@/components/cinematic/TradeSceneWipe";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 05｜Finale —
 * Are → you → ready? → Begin with (one scroll each):
 * far tiny → near 3× huge → fade, centered.
 * Then Global Vista Group: hyperspace warp-distort → settle,
 * explosive open lines behind, crisp white-gold glow.
 */
export function Scene05Finale() {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const wordStage = useRef<HTMLDivElement>(null);
  const brand = useRef<HTMLHeadingElement>(null);
  const brandWrap = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
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
      const shatterLines = linesRef.current
        ? gsap.utils.toArray<HTMLElement>(
            linesRef.current.querySelectorAll(".finale-scene__shatter-line"),
          )
        : [];

      gsap.set(panel.current, { opacity: 1 });
      gsap.set(wordEls, {
        opacity: 0,
        scale: 0.05,
        xPercent: -50,
        yPercent: -50,
        z: -900,
        transformPerspective: 1100,
        filter: "blur(14px)",
      });
      gsap.set(brand.current, {
        opacity: 0,
        scaleX: 2.8,
        scaleY: 0.12,
        xPercent: -50,
        yPercent: -50,
        z: -420,
        transformPerspective: 1000,
        filter: "blur(0px) brightness(2.4)",
        skewX: 28,
        skewY: -8,
      });
      if (brandWrap.current) {
        gsap.set(brandWrap.current, { opacity: 1 });
      }
      gsap.set(shatterLines, {
        opacity: 0,
        scaleX: 0.05,
        transformOrigin: "50% 50%",
      });
      gsap.set(line.current, { opacity: 0, y: 14 });
      if (burst.current) gsap.set(burst.current, { scale: 0.12, opacity: 0 });
      if (rays.current) gsap.set(rays.current, { opacity: 0, rotate: -24, scale: 0.6 });
      if (jump.current) gsap.set(jump.current, { opacity: 0, scale: 0.35 });
      if (actions.current) gsap.set(actions.current, { opacity: 0, y: 28 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=5600",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      // One wheel tick per word/phrase
      const BEAT = 1.0;

      wordEls.forEach((el, i) => {
        const t = i * BEAT;
        // Far tiny → near 3× huge → fade
        tl.to(
          el,
          {
            opacity: 1,
            scale: 1.0,
            z: 0,
            filter: "blur(0px)",
            duration: 0.42,
            ease: "power3.out",
          },
          t,
        ).to(
          el,
          {
            scale: 3.0,
            opacity: 0,
            z: 280,
            filter: "blur(4px)",
            duration: 0.48,
            ease: "power2.in",
          },
          t + 0.42,
        );
      });

      const afterWords = words.length * BEAT + 0.15;

      // Hyperspace jump + shatter lines open
      tl.to(jump.current, { opacity: 0.95, scale: 1.45, duration: 0.55, ease: "power3.in" }, afterWords)
        .to(burst.current, { opacity: 1, scale: 1.8, duration: 0.7, ease: "power2.out" }, afterWords + 0.05)
        .to(
          rays.current,
          { opacity: 0.9, rotate: 0, scale: 1.15, duration: 0.85, ease: "power2.out" },
          afterWords + 0.05,
        )
        .to(
          shatterLines,
          {
            opacity: 0.95,
            scaleX: 1.35,
            stagger: 0.04,
            duration: 0.55,
            ease: "power3.out",
          },
          afterWords + 0.12,
        )
        // Warp-distorted GVG flies in, then snaps to clear normal
        .to(
          brand.current,
          {
            opacity: 1,
            scaleX: 1.35,
            scaleY: 0.55,
            z: -80,
            skewX: 12,
            skewY: -4,
            filter: "blur(0px) brightness(1.8)",
            duration: 0.55,
            ease: "power3.in",
          },
          afterWords + 0.2,
        )
        .to(
          brand.current,
          {
            scaleX: 1,
            scaleY: 1,
            z: 0,
            skewX: 0,
            skewY: 0,
            filter: "blur(0px) brightness(1)",
            duration: 0.85,
            ease: "power2.out",
          },
          afterWords + 0.75,
        )
        .to(
          shatterLines,
          {
            opacity: 0.25,
            scaleX: 1.8,
            duration: 0.9,
            ease: "power1.out",
          },
          afterWords + 0.85,
        )
        .to(burst.current, { scale: 2.6, opacity: 0.22, duration: 0.95 }, afterWords + 1.1)
        .to(jump.current, { opacity: 0.1, scale: 2.0, duration: 0.85 }, afterWords + 1.1)
        .to(line.current, { opacity: 1, y: 0, duration: 0.55 }, afterWords + 1.55)
        .to(actions.current, { opacity: 1, y: 0, duration: 0.5 }, afterWords + 1.75);
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
        <div ref={linesRef} className="finale-scene__shatter" aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="finale-scene__shatter-line"
              style={{ ["--i" as string]: i }}
            />
          ))}
        </div>

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

          <div ref={brandWrap} className="finale-scene__brand-wrap">
            <h2
              ref={brand}
              className="finale-scene__brand finale-scene__brand--vip-whitegold"
            >
              {MOVIE_V5.finale.brand}
            </h2>
          </div>

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
