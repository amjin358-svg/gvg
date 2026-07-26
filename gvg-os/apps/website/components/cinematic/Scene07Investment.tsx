"use client";

import { useRef } from "react";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

const PILLARS = [
  { title: "Building", body: "Hard assets with long-horizon yield." },
  { title: "Capital", body: "Structured vehicles across markets." },
  { title: "Investment", body: "Allocation intelligence for growth." },
];

/**
 * Scene 7｜Investment
 * World finance charts · Building · Capital · Investment rise
 */
export function Scene07Investment() {
  const root = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      const bars = barRefs.current.filter(Boolean) as HTMLElement[];
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      gsap.set(bars, { scaleY: 0, transformOrigin: "50% 100%" });
      gsap.set(cards, { opacity: 0, y: 50 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 20 });
      if (chartRef.current) gsap.set(chartRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=2400",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (titleRef.current) {
        tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.5 });
      }
      if (chartRef.current) {
        tl.to(chartRef.current, { opacity: 1, duration: 0.5 }, "<");
      }
      tl.to(bars, {
        scaleY: 1,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
      });
      tl.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.6,
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black invest-scene" aria-label="Investment">
        <h2 ref={titleRef}>Investment</h2>
        <div ref={chartRef} className="invest-scene__chart" aria-hidden>
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                barRefs.current[i] = el;
              }}
              style={{ height: `${35 + ((i * 17) % 55)}%` }}
            />
          ))}
        </div>
        <div className="invest-scene__pillars">
          {PILLARS.map((p, i) => (
            <article
              key={p.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Scene07Investment;
