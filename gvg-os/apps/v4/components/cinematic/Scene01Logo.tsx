"use client";

import { useRef } from "react";
import { createLogoIntro } from "@/components/animation/GSAPTimeline";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 1｜Logo (GSAP)
 * GVG fade/scale → punch → fade out
 */
export function Scene01Logo() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLHeadingElement>(null);
  const hint = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !mark.current) return;

      if (hint.current) gsap.set(hint.current, { opacity: 0, y: 12 });

      const tl = createLogoIntro(mark.current);
      if (hint.current) {
        tl.to(hint.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35");
      }
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="scene scene--black opening-scene" aria-label="Logo">
        <div className="noise-overlay" aria-hidden />
        <div className="opening-scene__copy opening-scene__copy--logo">
          <h1 ref={mark} className="logo opening-scene__logo opening-scene__logo--gvg">
            GVG
          </h1>
        </div>
        <div ref={hint} className="opening-scene__hint" aria-hidden>
          <span className="opening-scene__mouse" />
          <span>Scroll</span>
        </div>
      </section>
    </div>
  );
}

export default Scene01Logo;
