"use client";

import { useRef } from "react";
import Link from "next/link";
import { CanvasSafe } from "@/components/three/CanvasSafe";
import { HeroGlobe } from "@/components/three/HeroGlobe";
import { gsap, registerGsapPlugins, useGSAP } from "@/lib/gsap";

const STATS = [
  {
    value: "$ 1.2B+",
    label: "GMV / Year",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
        <rect x="3" y="12" width="3" height="8" rx="1" fill="currentColor" />
        <rect x="9" y="8" width="3" height="12" rx="1" fill="currentColor" />
        <rect x="15" y="4" width="3" height="16" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    value: "26",
    label: "Core Modules",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
        <rect
          x="3"
          y="14"
          width="18"
          height="4"
          rx="1"
          fill="currentColor"
          opacity="0.45"
        />
        <rect
          x="5"
          y="9"
          width="14"
          height="4"
          rx="1"
          fill="currentColor"
          opacity="0.7"
        />
        <rect x="7" y="4" width="10" height="4" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    value: "500+",
    label: "Enterprise Users",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
        <circle cx="9" cy="8" r="3" fill="currentColor" />
        <circle cx="17" cy="9" r="2.5" fill="currentColor" opacity="0.7" />
        <path
          d="M3 19c0-3 2.5-5 6-5s6 2 6 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    value: "99.9%",
    label: "System Uptime",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
        <path
          d="M12 3l7 3v5c0 4.5-2.8 7.8-7 9-4.2-1.2-7-4.5-7-9V6l7-3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M9 12l2 2 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
];

export function HeroCinematic() {
  const root = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();
      if (!root.current || !copyRef.current || !statsRef.current) return;

      const lines = copyRef.current.querySelectorAll(
        ".home-hero__eyebrow, .home-hero__title, .home-hero__lead, .home-hero__actions",
      );
      const stats = statsRef.current.querySelectorAll(".home-stat");

      gsap.set(lines, { opacity: 0, y: 28 });
      gsap.set(stats, { opacity: 0, x: 24 });
      if (scrollRef.current) gsap.set(scrollRef.current, { opacity: 0, y: 12 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(lines, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.15)
        .to(stats, { opacity: 1, x: 0, duration: 0.7, stagger: 0.1 }, 0.55)
        .to(
          scrollRef.current,
          { opacity: 1, y: 0, duration: 0.6 },
          1.1,
        );

      gsap.to(stats, {
        y: -6,
        duration: 2.8,
        stagger: { each: 0.35, yoyo: true, repeat: -1 },
        ease: "sine.inOut",
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="home-hero" id="overview">
      <div className="home-hero__stage" aria-hidden>
        <CanvasSafe
          camera={{ position: [0.2, 0.05, 5.1], fov: 40 }}
          fallback={<div className="opening-scene__fallback" />}
        >
          <HeroGlobe />
        </CanvasSafe>
        <div className="home-hero__flare" />
        <div className="home-hero__vignette" />
      </div>

      <div ref={copyRef} className="home-hero__content">
        <p className="home-hero__eyebrow">Global Vista Group</p>
        <h1 className="home-hero__title">
          One OS.{" "}
          <span className="home-hero__title-accent">Limitless Vision.</span>
        </h1>
        <p className="home-hero__lead">
          以 AI 與自動化整合全球企業基礎建設，打造可擴展的一體化營運系統——
          從市場合作、供應鏈到智慧決策，盡在 Global Vista Group。
        </p>

        <div className="home-hero__actions">
          <a className="btn btn--glow" href="#modules">
            Explore Modules <span aria-hidden>→</span>
          </a>
          <Link className="btn btn--ghost" href="/experience">
            <span className="btn__play" aria-hidden />
            Watch Movie
          </Link>
        </div>
      </div>

      <aside
        ref={statsRef}
        className="home-hero__stats"
        aria-label="Platform metrics"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="home-stat">
            <span className="home-stat__icon">{stat.icon}</span>
            <div>
              <strong className="home-stat__value">{stat.value}</strong>
              <span className="home-stat__label">{stat.label}</span>
            </div>
          </div>
        ))}
      </aside>

      <a ref={scrollRef} className="home-hero__scroll" href="#modules">
        <span className="home-hero__scroll-mouse" aria-hidden />
        Scroll to explore
      </a>
    </section>
  );
}

export default HeroCinematic;
