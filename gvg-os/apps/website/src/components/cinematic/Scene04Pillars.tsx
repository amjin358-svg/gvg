"use client";

import { useRef } from "react";
import { TradeSceneWipe } from "@/components/cinematic/TradeSceneWipe";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V5 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 04｜Pillars — cargo / product stack entrance
 */
export function Scene04Pillars() {
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      gsap.set(titleRef.current, { opacity: 0, y: 20 });
      if (wipeRef.current) gsap.set(wipeRef.current, { opacity: 0.95 });
      gsap.set(cards, { opacity: 0, y: 70, rotateX: 16 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=2200",
            scrub: SCRUB_SMOOTH,
            pin: true,
            anticipatePin: 1,
          },
        })
        .to(wipeRef.current, { opacity: 0, duration: 0.65, ease: "power1.out" })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.22,
            duration: 0.85,
            ease: "power3.out",
          },
          0.35,
        );
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--navy pillars-scene" aria-label="Pillars">
        <div ref={wipeRef}>
          <TradeSceneWipe theme="cargo" />
        </div>
        <div className="pillars-scene__veil" aria-hidden />
        <div ref={titleRef} className="pillars-scene__copy">
          <p className="scene-eyebrow">{MOVIE_V5.pillars.eyebrow}</p>
          <h2>{MOVIE_V5.pillars.title}</h2>
        </div>
        <div className="pillars-scene__grid">
          {MOVIE_V5.pillars.items.map((item, i) => (
            <article
              key={item.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="pillars-scene__card"
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Scene04Pillars;
