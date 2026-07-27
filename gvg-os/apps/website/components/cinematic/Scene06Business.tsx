"use client";

import { useRef } from "react";
import { MOVIE_ASSETS, SCRUB_SMOOTH } from "@/lib/cinematic";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

const SERVICES = [
  {
    title: "Enterprise Office",
    body: "總部級營運視圖，串聯跨國團隊決策與日常協作。",
  },
  {
    title: "Legal",
    body: "跨境合規與法務流程，降低制度與文件風險。",
  },
  {
    title: "Finance",
    body: "資金、外匯與合併報表，掌握全球財務節奏。",
  },
  {
    title: "Procurement",
    body: "採購中樞與落地成本控管，優化供應策略。",
  },
  {
    title: "ERP",
    body: "核心帳務與營運數據同步，市場之間無縫銜接。",
  },
  {
    title: "CRM",
    body: "客戶、管道與夥伴網絡，沉澱長期關係資產。",
  },
];

/**
 * Scene 6｜Business Services — photo plate + transform-only reveals
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
        aria-label="Business Services"
      >
        <div
          className="business-scene__office"
          aria-hidden
          style={{
            backgroundImage: `
              linear-gradient(105deg, rgba(5,14,32,0.88) 0%, rgba(5,14,32,0.55) 48%, rgba(5,14,32,0.72) 100%),
              url("${MOVIE_ASSETS.office}")
            `,
          }}
        />
        <div className="business-scene__content">
          <p className="scene-eyebrow">06 · Enterprise Stack</p>
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
