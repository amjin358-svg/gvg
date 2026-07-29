"use client";

import { useRef } from "react";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { SCENE_SCROLL, SERVICE_BEATS } from "@/lib/cinematicHomeContent";

/**
 * Scene 07 — Business Services cinematic montage.
 */
export function Scene07Services() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !stage.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(
        stage.current.querySelectorAll(".cx-service-card"),
      );
      gsap.set(cards, { opacity: 0, scale: 0.92, y: 40, force3D: true });

      const tl = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${SCENE_SCROLL.services}`,
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        const t = i * 0.08;
        tl.to(card, { opacity: 1, scale: 1, y: 0, duration: 0.12 }, t).to(
          card,
          { opacity: i === cards.length - 1 ? 1 : 0.2, scale: i === cards.length - 1 ? 1 : 0.96, duration: 0.1 },
          t + 0.12,
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="cx-scene cx-scene--services" aria-label="Business Services">
      <div ref={stage} className="cx-scene__stage cx-services__stage">
        {SERVICE_BEATS.map((beat, i) => (
          <article
            key={beat}
            className="cx-service-card"
            style={{ ["--i" as string]: i }}
          >
            <span className="cx-service-card__index">{String(i + 1).padStart(2, "0")}</span>
            <h3>{beat}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
