"use client";

import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroCinematic } from "@/components/home/HeroCinematic";
import { ModulesSection } from "@/components/home/ModulesSection";
import { ValueBar } from "@/components/home/ValueBar";

const InteractiveMovie = dynamic(
  () =>
    import("@/components/cinematic/InteractiveMovie").then(
      (m) => m.InteractiveMovie,
    ),
  { ssr: false },
);

/** Marketing landing + embedded Cinematic Experience */
export function HomePage() {
  return (
    <div className="home-root">
      <SiteHeader />
      <HeroCinematic />
      <ModulesSection />
      <ValueBar />

      <section className="home-cinematic-gate" id="cinematic">
        <div className="home-cinematic-gate__inner" id="about">
          <p className="home-cinematic-gate__eyebrow">Cinematic Experience</p>
          <h2>Enter the Interactive Movie</h2>
          <p>
            從品牌標誌到地球航線、市場合作與 AI 決策——以捲動敘事感受 GVG 的全球願景。
          </p>
          <a className="btn btn--glow" href="#movie-start">
            Begin Experience <span aria-hidden>↓</span>
          </a>
        </div>
      </section>

      <div id="movie-start">
        <InteractiveMovie />
      </div>

      <footer className="home-footer" id="get-started">
        <div>
          <strong>GVG OS</strong>
          <p>Connecting Markets. Creating Value.</p>
        </div>
        <a className="btn btn--glow" href="mailto:hello@globalvistagroup.com">
          Get Started
        </a>
      </footer>
    </div>
  );
}

export default HomePage;
