"use client";

import { useRef } from "react";
import { MOVIE_ASSETS, SCRUB_SMOOTH } from "@/lib/cinematic";
import { MOVIE_V2 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 6｜Core Services — portal business lines
 */
export function Scene06Business() {
  const root = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const services = MOVIE_V2.business.services;

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      const items = itemRefs.current.filter(Boolean) as HTMLElement[];
      gsap.set(items, { opacity: 0, x: -28 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2800",
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (titleRef.current) {
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
        });
      }

      items.forEach((item, i) => {
        tl.to(
          item,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0.4 + i * 0.4,
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section
        className="scene scene--navy business-scene"
        aria-label="Core Services"
      >
        <div
          className="business-scene__office"
          aria-hidden
          style={{
            backgroundImage: `
              linear-gradient(105deg, rgba(2,6,15,0.88) 0%, rgba(7,20,40,0.55) 48%, rgba(2,6,15,0.72) 100%),
              url("${MOVIE_ASSETS.office}")
            `,
          }}
        />
        <div className="business-scene__content">
          <p className="scene-eyebrow">{MOVIE_V2.business.eyebrow}</p>
          <h2 ref={titleRef}>{MOVIE_V2.business.title}</h2>
          <ul className="business-scene__list">
            {services.map((svc, i) => (
              <li
                key={svc.title}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
              >
                <span>0{i + 1}</span>
                <div>
                  <strong>{svc.title}</strong>
                  <p>{svc.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Scene06Business;
