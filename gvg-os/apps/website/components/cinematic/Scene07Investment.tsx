"use client";

import { useRef } from "react";
import { MOVIE_ASSETS, SCRUB_SMOOTH } from "@/lib/cinematic";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

const PILLARS = [
  {
    title: "Building",
    body: "長期收益導向的實體資產配置，構築穩健基本面。",
  },
  {
    title: "Capital",
    body: "跨市場結構性工具，靈活調度成長動能。",
  },
  {
    title: "Investment",
    body: "以智慧配置捕捉全球商機與價值曲線。",
  },
];

/**
 * Scene 7｜Investment — finance plate + rising metrics
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
      gsap.set(cards, { opacity: 0, y: 40 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 18 });
      if (chartRef.current) gsap.set(chartRef.current, { opacity: 0 });

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

      if (titleRef.current) {
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
        });
      }
      if (chartRef.current) {
        tl.to(chartRef.current, { opacity: 1, duration: 0.6 }, "<0.1");
      }
      tl.to(bars, {
        scaleY: 1,
        stagger: 0.06,
        duration: 0.85,
        ease: "power2.out",
      });
      tl.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.16,
        duration: 0.7,
        ease: "power2.out",
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black invest-scene" aria-label="Investment">
        <div
          className="invest-scene__plate"
          aria-hidden
          style={{
            backgroundImage: `
              linear-gradient(180deg, rgba(2,6,16,0.55) 0%, rgba(2,6,16,0.82) 100%),
              url("${MOVIE_ASSETS.finance}")
            `,
          }}
        />
        <p className="scene-eyebrow">07 · Capital Intelligence</p>
        <h2 ref={titleRef}>Investment</h2>
        <div ref={chartRef} className="invest-scene__chart" aria-hidden>
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                barRefs.current[i] = el;
              }}
              style={{ height: `${38 + ((i * 17) % 52)}%` }}
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
