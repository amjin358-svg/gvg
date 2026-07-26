"use client";

import { useRef } from "react";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

const LAYERS = [
  {
    id: "port",
    title: "Cargo Port",
    body: "Terminals · berths · container yards",
    tone: "port",
  },
  {
    id: "ship",
    title: "Ocean Freight",
    body: "Vessels crossing trade lanes",
    tone: "ship",
  },
  {
    id: "air",
    title: "Air Cargo",
    body: "High-velocity global lanes",
    tone: "air",
  },
  {
    id: "logistics",
    title: "Logistics",
    body: "Warehouses · last mile · orchestration",
    tone: "logistics",
  },
  {
    id: "data",
    title: "Trade Data",
    body: "Live telemetry across the chain",
    tone: "data",
  },
] as const;

/**
 * Scene 3｜Global Trade
 * Parallax + motion layers (not static photos) — port → ship → air → logistics → data
 */
export function Scene03Global() {
  const root = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      const layers = layerRefs.current.filter(Boolean) as HTMLElement[];
      gsap.set(layers, { opacity: 0, y: 80, scale: 1.06 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=4200",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (titleRef.current) {
        tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6 });
      }

      layers.forEach((layer, i) => {
        const depth = (i + 1) * 18;
        tl.to(
          layer,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
          },
          i * 0.85,
        );
        // Parallax drift while visible
        tl.to(
          layer,
          {
            y: -depth,
            x: i % 2 === 0 ? 24 : -24,
            duration: 1.1,
            ease: "none",
          },
          i * 0.85 + 0.4,
        );
        if (i < layers.length - 1) {
          tl.to(layer, { opacity: 0.18, duration: 0.55 }, i * 0.85 + 1.1);
        }
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black trade-scene" aria-label="Global Trade">
        <div className="trade-scene__atmosphere" aria-hidden>
          <div className="trade-scene__scan" />
          <div className="trade-scene__horizon" />
        </div>

        <h2 ref={titleRef} className="trade-scene__title">
          Global Trade
        </h2>

        <div className="trade-scene__stack">
          {LAYERS.map((layer, i) => (
            <article
              key={layer.id}
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              className={`trade-layer trade-layer--${layer.tone}`}
            >
              <div className="trade-layer__motion" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <div className="trade-layer__copy">
                <p className="trade-layer__index">0{i + 1}</p>
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Scene03Global;
