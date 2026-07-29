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
 * shatter open lines behind — no glow / no filter scrub.
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

      // Transform + opacity only — avoid filter/blur during scrub (main jank source)
      gsap.set(panel.current, { opacity: 1, force3D: true });
      gsap.set(wordEls, {
        opacity: 0,
        scale: 0.05,
        xPercent: -50,
        yPercent: -50,
        z: -720,
        transformPerspective: 1100,
        force3D: true,
      });
      gsap.set(brand.current, {
        opacity: 0,
        scaleX: 2.6,
        scaleY: 0.14,
        xPercent: -50,
        yPercent: -50,
        z: -360,
        transformPerspective: 1000,
        skewX: 22,
        skewY: -6,
        force3D: true,
      });
      if (brandWrap.current) {
        gsap.set(brandWrap.current, { opacity: 1, force3D: true });
      }
      gsap.set(shatterLines, {
        opacity: 0,
        scaleX: 0.05,
        transformOrigin: "50% 50%",
        force3D: true,
      });
      gsap.set(line.current, { opacity: 0, y: 14, force3D: true });
      if (burst.current) gsap.set(burst.current, { scale: 0.2, opacity: 0, force3D: true });
      if (rays.current) gsap.set(rays.current, { opacity: 0, rotate: -18, scale: 0.7, force3D: true });
      if (jump.current) gsap.set(jump.current, { opacity: 0, scale: 0.4, force3D: true });
      if (actions.current) gsap.set(actions.current, { opacity: 0, y: 20, force3D: true });

      // Slightly tighter scrub than global default for finale word beats
      const scrub = Math.min(SCRUB_SMOOTH, 0.55);

      const tl = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=5600",
          scrub,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      // One wheel tick per word/phrase
      const BEAT = 1.0;

      wordEls.forEach((el, i) => {
        const t = i * BEAT;
        // Far tiny → near 3× huge → fade (no blur)
        tl.to(
          el,
          {
            opacity: 1,
            scale: 1.0,
            z: 0,
            duration: 0.42,
          },
          t,
        ).to(
          el,
          {
            scale: 3.0,
            opacity: 0,
            z: 240,
            duration: 0.48,
          },
          t + 0.42,
        );
      });

      const afterWords = words.length * BEAT + 0.12;

      // Hyperspace jump + shatter lines open
      tl.to(jump.current, { opacity: 0.55, scale: 1.35, duration: 0.5 }, afterWords)
        .to(burst.current, { opacity: 0.7, scale: 1.55, duration: 0.65 }, afterWords + 0.04)
        .to(
          rays.current,
          { opacity: 0.55, rotate: 0, scale: 1.08, duration: 0.75 },
          afterWords + 0.04,
        )
        .to(
          shatterLines,
          {
            opacity: 0.85,
            scaleX: 1.3,
            stagger: 0.03,
            duration: 0.5,
          },
          afterWords + 0.1,
        )
        // Warp-distorted GVG flies in, then settles crisp (no brightness/glow)
        .to(
          brand.current,
          {
            opacity: 1,
            scaleX: 1.28,
            scaleY: 0.58,
            z: -60,
            skewX: 10,
            skewY: -3,
            duration: 0.5,
          },
          afterWords + 0.18,
        )
        .to(
          brand.current,
          {
            scaleX: 1,
            scaleY: 1,
            z: 0,
            skewX: 0,
            skewY: 0,
            duration: 0.8,
          },
          afterWords + 0.68,
        )
        .to(
          shatterLines,
          {
            opacity: 0.2,
            scaleX: 1.7,
            duration: 0.85,
          },
          afterWords + 0.78,
        )
        .to(burst.current, { scale: 2.2, opacity: 0, duration: 0.85 }, afterWords + 1.0)
        .to(jump.current, { opacity: 0, scale: 1.85, duration: 0.75 }, afterWords + 1.0)
        .to(rays.current, { opacity: 0, duration: 0.7 }, afterWords + 1.05)
        .to(line.current, { opacity: 1, y: 0, duration: 0.5 }, afterWords + 1.45)
        .to(actions.current, { opacity: 1, y: 0, duration: 0.45 }, afterWords + 1.65);
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
          {Array.from({ length: 10 }).map((_, i) => (
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
            <a className="btn btn--primary" href={portal}>
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
