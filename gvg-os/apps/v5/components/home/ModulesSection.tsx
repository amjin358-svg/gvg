"use client";

import { useRef } from "react";

const MODULES = [
  {
    title: "Member Center",
    zh: "會員中心",
    body: "會員層級、權益與通路身份的一體化管理。",
    tone: "blue",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden>
        <circle cx="20" cy="14" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8 32c2.5-6 8-9 12-9s9.5 3 12 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    title: "Product Center",
    zh: "商品中心",
    body: "商品分類、上架控管與多市場目錄同步。",
    tone: "blue",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden>
        <path
          d="M10 14h20l-2 16H12L10 14z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M15 14V11a5 5 0 0 1 10 0v3" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Order Center",
    zh: "訂單中心",
    body: "訂單處理與流程自動化，貫穿履約全鏈。",
    tone: "cyan",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden>
        <circle cx="14" cy="30" r="3" fill="currentColor" />
        <circle cx="28" cy="30" r="3" fill="currentColor" />
        <path
          d="M6 8h4l3 14h14l3-9H14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    title: "Inventory Center",
    zh: "庫存中心",
    body: "多倉調度、即時追蹤與安全庫存預警。",
    tone: "violet",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden>
        <path
          d="M20 6l12 7v14L20 34 8 27V13L20 6z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M20 20v14M8 13l12 7 12-7" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "AI Services",
    zh: "AI 智慧服務",
    body: "客服、銷售預測與自動化建議一站啟動。",
    tone: "teal",
    icon: (
      <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden>
        <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M20 6v4M20 30v4M6 20h4M30 20h4M10 10l3 3M27 27l3 3M30 10l-3 3M13 27l-3 3"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

export function ModulesSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section className="home-modules" id="modules">
      <div className="home-modules__head">
        <p className="home-modules__eyebrow">All-In-One Business Platform</p>
        <h2 className="home-modules__title">
          <span className="home-modules__title-accent">26 Core Modules.</span>{" "}
          Unlimited Possibilities.
        </h2>
      </div>

      <div className="home-modules__rail">
        <button
          type="button"
          className="home-modules__nav"
          aria-label="Previous modules"
          onClick={() => scrollBy(-1)}
        >
          ‹
        </button>

        <div className="home-modules__track" ref={trackRef}>
          {MODULES.map((mod) => (
            <article
              key={mod.title}
              className={`home-module-card home-module-card--${mod.tone}`}
            >
              <div className="home-module-card__icon">{mod.icon}</div>
              <h3>
                {mod.title}
                <span>{mod.zh}</span>
              </h3>
              <p>{mod.body}</p>
              <span className="home-module-card__arrow" aria-hidden>
                →
              </span>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="home-modules__nav"
          aria-label="Next modules"
          onClick={() => scrollBy(1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default ModulesSection;
