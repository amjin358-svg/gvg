"use client";

import { useRef } from "react";
import { createLogoIntro } from "@/components/animation/GSAPTimeline";
import { MOVIE_V2 } from "@/lib/movieContent";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Scene 1｜Logo (GSAP) — Homepage-aligned opening
 * GVG fade/scale → punch → tagline → scroll hint
 */
export function Scene01Logo() {
  const root = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLHeadingElement>(null);
  const tag = useRef<HTMLParagraphElement>(null);
  const hint = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !mark.current) return;

      if (tag.current) gsap.set(tag.current, { opacity: 0, y: 16 });
      if (hint.current) gsap.set(hint.current, { opacity: 0, y: 12 });

      const tl = createLogoIntro(mark.current);
      if (tag.current) {
        tl.to(tag.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");
      }
      if (hint.current) {
        tl.to(hint.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.25");
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
            {MOVIE_V2.opening.mark}
          </h1>
          <p ref={tag} className="opening-scene__tagline">
            <strong>{MOVIE_V2.opening.tag}</strong>
            <span>{MOVIE_V2.opening.tagZh}</span>
          </p>
        </div>
        <div ref={hint} className="opening-scene__hint" aria-hidden>
          <span className="opening-scene__mouse" />
          <span>{MOVIE_V2.opening.scroll}</span>
        </div>
      </section>
    </div>
  );
}

export default Scene01Logo;
