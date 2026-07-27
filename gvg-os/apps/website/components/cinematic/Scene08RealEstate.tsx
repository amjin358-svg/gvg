"use client";

import { useRef } from "react";
import { MOVIE_ASSETS, SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V2 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 8｜Global Presence — markets & partners
 */
export function Scene08RealEstate() {
  const root = useRef<HTMLDivElement>(null);
  const skylineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const layers = MOVIE_V2.presence.layers;

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      const items = itemRefs.current.filter(Boolean) as HTMLElement[];
      gsap.set(items, { opacity: 0, y: 32 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0 });
      if (skylineRef.current) {
        gsap.set(skylineRef.current, { scale: 1.12, y: 28, opacity: 0.45 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2600",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (titleRef.current) {
        tl.to(titleRef.current, { opacity: 1, duration: 0.6 });
      }
      if (skylineRef.current) {
        tl.to(
          skylineRef.current,
          { scale: 1, y: 0, opacity: 1, duration: 1.35, ease: "power2.out" },
          "<",
        );
      }
      tl.to(items, {
        opacity: 1,
        y: 0,
        stagger: 0.22,
        duration: 0.65,
        ease: "power2.out",
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--navy estate-scene" aria-label="Global Presence">
        <div
          ref={skylineRef}
          className="estate-scene__skyline estate-scene__skyline--photo"
          aria-hidden
          style={{
            backgroundImage: `
              linear-gradient(180deg, rgba(2,6,15,0.35) 0%, rgba(2,6,15,0.78) 100%),
              url("${MOVIE_ASSETS.skyline}")
            `,
          }}
        />
        <div className="estate-scene__content">
          <p className="scene-eyebrow">{MOVIE_V2.presence.eyebrow}</p>
          <h2 ref={titleRef}>{MOVIE_V2.presence.title}</h2>
          <ul>
            {layers.map((layer, i) => (
              <li
                key={layer.title}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
              >
                <strong>{layer.title}</strong>
                <span>{layer.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Scene08RealEstate;
