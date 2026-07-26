"use client";

import { useRef } from "react";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

const SERVICES = [
  { title: "Enterprise Office", body: "HQ operating system for global teams." },
  { title: "Legal", body: "Cross-border compliance & counsel workflows." },
  { title: "Finance", body: "Treasury, FX, and consolidated reporting." },
  { title: "Procurement", body: "Sourcing desks with landed-cost control." },
  { title: "ERP", body: "Core ledgers synchronized across markets." },
  { title: "CRM", body: "Accounts, pipeline, and partner networks." },
];

/**
 * Scene 6｜Business Services
 * Camera flies into the enterprise stack — services unfold one by one
 */
export function Scene06Business() {
  const root = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      const items = itemRefs.current.filter(Boolean) as HTMLElement[];
      gsap.set(items, { opacity: 0, x: -40, filter: "blur(8px)" });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2800",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (titleRef.current) {
        tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.5 });
      }

      items.forEach((item, i) => {
        tl.to(
          item,
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power2.out",
          },
          0.35 + i * 0.45,
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--navy business-scene" aria-label="Business Services">
        <div className="business-scene__office" aria-hidden />
        <div className="business-scene__content">
          <h2 ref={titleRef}>Business Services</h2>
          <ul className="business-scene__list">
            {SERVICES.map((svc, i) => (
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
