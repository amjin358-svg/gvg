"use client";

import { useRef } from "react";
import Link from "next/link";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 05｜Finale — light sequence, then settle into silent cosmic black
 */
export function Scene05Finale() {
  const root = useRef<HTMLDivElement>(null);
  const voidRef = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const readyRef = useRef<HTMLParagraphElement>(null);
  const lead = useRef<HTMLSpanElement>(null);
  const brand = useRef<HTMLSpanElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const line = useRef<HTMLParagraphElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const waveA = useRef<HTMLDivElement>(null);
  const waveB = useRef<HTMLDivElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const portal = process.env.NEXT_PUBLIC_PORTAL_URL || "/";

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !stage.current || !brand.current || !readyRef.current) return;

      const readyWords = gsap.utils.toArray<HTMLElement>(
        readyRef.current.querySelectorAll(".finale-scene__ready-word"),
      );

      gsap.set(readyWords, { opacity: 0, y: 16 });
      gsap.set(lead.current, { opacity: 0, y: 12, scale: 0.92 });
      gsap.set(brand.current, { opacity: 0, y: 14 });
      gsap.set(title.current, { opacity: 0 });
      gsap.set(line.current, { opacity: 0, y: 12 });
      if (burst.current) gsap.set(burst.current, { scale: 0.2, opacity: 0 });
      if (waveA.current) gsap.set(waveA.current, { scale: 0.2, opacity: 0 });
      if (waveB.current) gsap.set(waveB.current, { scale: 0.15, opacity: 0 });
      if (actions.current) gsap.set(actions.current, { opacity: 0, y: 14 });
      if (voidRef.current) gsap.set(voidRef.current, { opacity: 0 });
      gsap.set(stage.current, { scaleX: 1, scaleY: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2400",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      readyWords.forEach((word, i) => {
        tl.to(word, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }, i * 0.18);
      });

      tl.to(title.current, { opacity: 1, duration: 0.12 }, "+=0.2")
        .to(lead.current, { opacity: 1, y: 0, scale: 1.12, duration: 0.45 }, "<")
        .to(readyWords, { opacity: 0, duration: 0.3 }, "<0.1")
        .to(brand.current, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "+=0.15")
        .to(stage.current, { scaleX: 0.88, scaleY: 1.06, duration: 0.35, ease: "power2.in" }, "+=0.12")
        .to(burst.current, { opacity: 0.85, scale: 1.5, duration: 0.55, ease: "power2.out" }, "<0.05")
        .to(waveA.current, { opacity: 0.75, scale: 1.6, duration: 0.65, ease: "power2.out" }, "<")
        .to(waveB.current, { opacity: 0.55, scale: 2.1, duration: 0.8, ease: "power2.out" }, "<0.12")
        .to(stage.current, { scaleX: 1, scaleY: 1, duration: 0.5, ease: "power2.out" }, "-=0.35")
        // After bloom expands → silent cosmic black
        .to(voidRef.current, { opacity: 1, duration: 0.85, ease: "power1.inOut" }, "-=0.15")
        .to(burst.current, { opacity: 0.12, scale: 2.2, duration: 0.7 }, "<")
        .to(waveA.current, { opacity: 0.08, scale: 2.4, duration: 0.75 }, "<")
        .to(waveB.current, { opacity: 0.05, scale: 2.9, duration: 0.85 }, "<")
        .to(line.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.2")
        .to(actions.current, { opacity: 1, y: 0, duration: 0.45 }, "-=0.15");
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black finale-scene" aria-label="Finale">
        <div ref={voidRef} className="finale-scene__void" aria-hidden />
        <div ref={burst} className="finale-scene__burst" aria-hidden />
        <div ref={waveA} className="finale-scene__shockwave finale-scene__shockwave--a" aria-hidden />
        <div ref={waveB} className="finale-scene__shockwave finale-scene__shockwave--b" aria-hidden />

        <div ref={stage} className="finale-scene__stage">
          <p ref={readyRef} className="finale-scene__ready" aria-label="Are. You. Ready?">
            {MOVIE_V5.finale.ready.map((word) => (
              <span key={word} className="finale-scene__ready-word">
                {word}
              </span>
            ))}
          </p>

          <h2 ref={title} className="finale-scene__title">
            <span ref={lead} className="finale-scene__lead">
              {MOVIE_V5.finale.lead}
            </span>
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
