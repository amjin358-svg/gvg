"use client";

import { useRef } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { GalaxyPhotoLayer } from "@/components/home/GalaxyPhotoLayer";
import { HeroCinematic } from "@/components/home/HeroCinematic";
import { ModulesSection } from "@/components/home/ModulesSection";
import { ValueBar } from "@/components/home/ValueBar";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Marketing homepage — continuous galaxy plate, tuned for smooth scroll.
 */
export function HomePage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const sections = root.current.querySelectorAll(
        ".home-modules, .home-values, .home-about, .home-footer",
      );

      // Play once — avoid reverse re-tweening that fights native scroll
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0.35,
          y: 18,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            once: true,
            fastScrollEnd: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="home-root home-root--seamless home-root--perf">
      {/* Single photo plate only — no animated blur/star FX stack while scrolling */}
      <GalaxyPhotoLayer className="home-root__galaxy" mode="absolute" />

      <SiteHeader />
      <HeroCinematic />
      <ModulesSection />
      <ValueBar />

      <section className="home-about" id="about">
        <BrandLogo size="lg" className="home-about__logo" />
        <p className="home-about__eyebrow">About Global Vista Group</p>
        <h2>Connecting Markets. Creating Value.</h2>
        <p>
          Global Vista Group 以電影級敘事與一體化營運系統，串連全球貿易、市場合作、
          AI 決策與企業服務——從第一眼宇宙地球，到完整商業旅程。
        </p>
      </section>

      <footer className="home-footer" id="get-started">
        <div className="home-footer__brand">
          <BrandLogo size="md" />
        </div>
        <a className="btn btn--glow" href="mailto:hello@globalvistagroup.com">
          Get Started
        </a>
      </footer>
    </div>
  );
}

export default HomePage;
