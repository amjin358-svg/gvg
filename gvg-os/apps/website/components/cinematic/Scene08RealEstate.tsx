"use client";

import { useRef } from "react";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

const LAYERS = [
  { title: "City", body: "Skyline as the operating canvas." },
  { title: "Architecture", body: "Towers · mixed-use · landmarks." },
  { title: "Community", body: "Places where markets meet life." },
  { title: "GVG Project", body: "Developments shaped for the long view." },
];

/**
 * Scene 8｜Real Estate
 * Camera flies toward city → buildings → community → GVG Project
 */
export function Scene08RealEstate() {
  const root = useRef<HTMLDivElement>(null);
  const skylineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      const items = itemRefs.current.filter(Boolean) as HTMLElement[];
      gsap.set(items, { opacity: 0, y: 40 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0 });
      if (skylineRef.current) {
        gsap.set(skylineRef.current, { scale: 1.25, y: 40, opacity: 0.4 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2600",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (titleRef.current) {
        tl.to(titleRef.current, { opacity: 1, duration: 0.5 });
      }
      if (skylineRef.current) {
        tl.to(
          skylineRef.current,
          { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
          "<",
        );
      }
      tl.to(items, {
        opacity: 1,
        y: 0,
        stagger: 0.25,
        duration: 0.55,
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--navy estate-scene" aria-label="Real Estate">
        <div ref={skylineRef} className="estate-scene__skyline" aria-hidden>
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              style={{
                height: `${40 + ((i * 23) % 55)}%`,
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>
        <div className="estate-scene__content">
          <h2 ref={titleRef}>Real Estate</h2>
          <ul>
            {LAYERS.map((layer, i) => (
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
