"use client";

import { useRef } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { GalaxyPhotoLayer } from "@/components/home/GalaxyPhotoLayer";
import { HeroCinematic } from "@/components/home/HeroCinematic";
import { ModulesSection } from "@/components/home/ModulesSection";
import { ValueBar } from "@/components/home/ValueBar";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

/**
 * Marketing homepage matching the Global Vista Group design mock:
 * galaxy hero → modules → values. Movie lives at /experience.
 */
export function HomePage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current) return;

      const sections = root.current.querySelectorAll(
        ".home-modules, .home-values, .home-about, .home-footer",
      );
      gsap.from(sections, {
        opacity: 0,
        y: 48,
        duration: 1.05,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="home-root">
      <GalaxyPhotoLayer className="home-root__galaxy" />
      <div className="galaxy-backdrop home-root__galaxy home-root__galaxy--fx" aria-hidden>
        <div className="galaxy-backdrop__nebula" />
        <div className="galaxy-backdrop__stars galaxy-backdrop__stars--far" />
        <div className="galaxy-backdrop__stars galaxy-backdrop__stars--near" />
        <div className="galaxy-backdrop__dust" />
      </div>

      <SiteHeader />
      <HeroCinematic />
      <ModulesSection />
      <ValueBar />

      <section className="home-about" id="about">
        <p className="home-about__eyebrow">About Global Vista Group</p>
        <h2>Connecting Markets. Creating Value.</h2>
        <p>
          Global Vista Group 以電影級敘事與一體化營運系統，串連全球貿易、市場合作、
          AI 決策與企業服務——從第一眼宇宙地球，到完整商業旅程。
        </p>
      </section>

      <footer className="home-footer" id="get-started">
        <div>
          <strong>Global Vista Group</strong>
          <p>Building the Future of Global Business.</p>
        </div>
        <a className="btn btn--glow" href="mailto:hello@globalvistagroup.com">
          Get Started
        </a>
      </footer>
    </div>
  );
}

export default HomePage;
