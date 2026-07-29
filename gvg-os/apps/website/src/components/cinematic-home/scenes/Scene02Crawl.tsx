"use client";

import { useRef } from "react";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";
import { SCRUB_SMOOTH } from "@/lib/cinematic";
import { CRAWL_LINES, SCENE_SCROLL } from "@/lib/cinematicHomeContent";
import { MetalGVGLogo } from "@/components/cinematic-home/ui/MetalGVGLogo";

/**
 * Scene 02 — Logo rises · Star Wars perspective crawl · large readable type.
 */
export function Scene02Crawl() {
  const root = useRef<HTMLElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const crawl = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !logo.current || !crawl.current) return;

      gsap.set(logo.current, { yPercent: 0, scale: 1, opacity: 1, force3D: true });
      gsap.set(crawl.current, { yPercent: 55, opacity: 0.2, force3D: true });

      const tl = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${SCENE_SCROLL.crawl}`,
          scrub: SCRUB_SMOOTH,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(logo.current, { yPercent: -72, scale: 0.42, opacity: 0.55, duration: 0.28 }, 0)
        .to(crawl.current, { opacity: 1, duration: 0.12 }, 0.08)
        .to(crawl.current, { yPercent: -118, duration: 0.92 }, 0.08);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="cx-scene cx-scene--crawl" aria-label="Perspective Crawl">
      <div className="cx-scene__stage">
        <div ref={logo} className="cx-crawl__logo">
          <MetalGVGLogo />
        </div>
        <div className="cx-crawl__perspective">
          <div ref={crawl} className="cx-crawl__track">
            {CRAWL_LINES.map((line) => (
              <p key={line} className="cx-crawl__line">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
