"use client";

import { useRef } from "react";
import Link from "next/link";
import SplitType from "split-type";
import { revertSplit } from "@/components/animation/SplitText";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 05｜Finale —
 * Are. You. Ready? → Begin with → Global Vista Group
 * → squeeze + micro-vibration jump + multi-layer shockwave bloom
 * → Ready to connect markets?
 */
export function Scene05Finale() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const readyRef = useRef<HTMLParagraphElement>(null);
  const lead = useRef<HTMLSpanElement>(null);
  const brand = useRef<HTMLSpanElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const line = useRef<HTMLParagraphElement>(null);
  const burst = useRef<HTMLDivElement>(null);
  const bloom = useRef<HTMLDivElement>(null);
  const waveA = useRef<HTMLDivElement>(null);
  const waveB = useRef<HTMLDivElement>(null);
  const waveC = useRef<HTMLDivElement>(null);
  const waveD = useRef<HTMLDivElement>(null);
  const actions = useRef<HTMLDivElement>(null);
  const portal = process.env.NEXT_PUBLIC_PORTAL_URL || "/";

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !stage.current || !brand.current || !readyRef.current) return;

      const readyWords = gsap.utils.toArray<HTMLElement>(
        readyRef.current.querySelectorAll(".finale-scene__ready-word"),
      );
      const split = new SplitType(brand.current, { types: "chars" });
      const chars = split.chars?.length ? split.chars : [brand.current];

      gsap.set(readyWords, { opacity: 0, y: 28, scale: 0.7 });
      gsap.set(lead.current, { opacity: 0, y: 18, scale: 0.85 });
      gsap.set(chars, { opacity: 0, y: 22, scale: 0.75 });
      gsap.set(title.current, { opacity: 0 });
      gsap.set(line.current, { opacity: 0, y: 16 });
      if (burst.current) gsap.set(burst.current, { scale: 0.08, opacity: 0 });
      if (bloom.current) gsap.set(bloom.current, { scale: 0.2, opacity: 0 });
      if (waveA.current) gsap.set(waveA.current, { scale: 0.12, opacity: 0 });
      if (waveB.current) gsap.set(waveB.current, { scale: 0.1, opacity: 0 });
      if (waveC.current) gsap.set(waveC.current, { scale: 0.08, opacity: 0 });
      if (waveD.current) gsap.set(waveD.current, { scale: 0.06, opacity: 0 });
      if (actions.current) gsap.set(actions.current, { opacity: 0, y: 22 });
      gsap.set(stage.current, { scaleX: 1, scaleY: 1, x: 0, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=3200",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1) Are. You. Ready? — rapid sequential center hits
      readyWords.forEach((word, i) => {
        tl.to(
          word,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.28,
            ease: "power3.out",
          },
          i * 0.22,
        );
      });

      // 2) Begin with — larger
      tl.to(title.current, { opacity: 1, duration: 0.15 }, "+=0.25")
        .to(
          lead.current,
          { opacity: 1, y: 0, scale: 1.18, duration: 0.55, ease: "power2.out" },
          "<",
        )
        // fade ready words as lead arrives
        .to(readyWords, { opacity: 0.12, scale: 0.92, duration: 0.45 }, "<0.1")

        // 3) Global Vista Group center
        .to(
          chars,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.03,
            duration: 0.7,
            ease: "power3.out",
          },
          "+=0.2",
        )
        .to(readyWords, { opacity: 0, duration: 0.35 }, "<")

        // 4) Clamp / squeeze + micro vibration + multi shockwave bloom
        .to(
          stage.current,
          {
            scaleX: 0.72,
            scaleY: 1.18,
            duration: 0.45,
            ease: "power2.in",
          },
          "+=0.15",
        )
        .to(
          stage.current,
          {
            x: 1.2,
            duration: 0.06,
            yoyo: true,
            repeat: 5,
            ease: "sine.inOut",
          },
          "<0.05",
        )
        .to(burst.current, { opacity: 1, scale: 1.75, duration: 0.7, ease: "power2.out" }, "<0.1")
        .to(bloom.current, { opacity: 0.95, scale: 1.9, duration: 0.85, ease: "power2.out" }, "<")
        .to(waveA.current, { opacity: 0.95, scale: 1.45, duration: 0.85, ease: "power2.out" }, "<0.05")
        .to(waveB.current, { opacity: 0.85, scale: 1.75, duration: 1.0, ease: "power2.out" }, "<0.12")
        .to(waveC.current, { opacity: 0.75, scale: 2.15, duration: 1.15, ease: "power2.out" }, "<0.12")
        .to(waveD.current, { opacity: 0.65, scale: 2.55, duration: 1.3, ease: "power2.out" }, "<0.12")
        .to(
          stage.current,
          {
            scaleX: 1,
            scaleY: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.55",
        )

        // 5) Closing lines
        .to(line.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.15")
        .to(burst.current, { scale: 2.4, opacity: 0.35, duration: 0.9, ease: "power1.out" }, "<")
        .to(bloom.current, { scale: 2.6, opacity: 0.2, duration: 1.0, ease: "power1.out" }, "<")
        .to(waveA.current, { scale: 2.3, opacity: 0.15, duration: 0.95, ease: "power1.out" }, "<")
        .to(waveB.current, { scale: 2.7, opacity: 0.12, duration: 1.05, ease: "power1.out" }, "<0.05")
        .to(waveC.current, { scale: 3.1, opacity: 0.1, duration: 1.15, ease: "power1.out" }, "<0.05")
        .to(waveD.current, { scale: 3.5, opacity: 0.08, duration: 1.25, ease: "power1.out" }, "<0.05")
        .to(actions.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.25");

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
        <div ref={bloom} className="finale-scene__bloom" aria-hidden />
        <div ref={waveA} className="finale-scene__shockwave finale-scene__shockwave--a" aria-hidden />
        <div ref={waveB} className="finale-scene__shockwave finale-scene__shockwave--b" aria-hidden />
        <div ref={waveC} className="finale-scene__shockwave finale-scene__shockwave--c" aria-hidden />
        <div ref={waveD} className="finale-scene__shockwave finale-scene__shockwave--d" aria-hidden />

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
