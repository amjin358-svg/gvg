"use client";

import Link from "next/link";
import { BRAND, STATS } from "@/lib/content";
import { asset } from "@/lib/assets";
import { IconArrow, StatIcon } from "@/components/icons";
import { RiseTitle } from "@/components/RiseTitle";

/**
 * Official homepage hero — mockup order:
 * full-bleed port → H1 → sub → stats+icons → CTAs
 */
export function HomeHero() {
  const heroSrc = asset("/images/hero/home-full.jpg");

  return (
    <section className="home-hero home-hero--fullbleed" aria-label="首頁主視覺">
      <div
        className="home-hero__media"
        aria-hidden
        style={{ backgroundImage: `url("${heroSrc}")` }}
      />
      <div className="home-hero__veil" aria-hidden />

      <div className="home-hero__content">
        <RiseTitle as="h1" delay={80} immediate>
          {BRAND.taglineZh}
        </RiseTitle>
        <RiseTitle as="p" className="home-hero__sub" delay={180} immediate>
          {BRAND.trustZh}
        </RiseTitle>

        <ul className="home-hero__stats">
          {STATS.map((item, i) => (
            <RiseTitle as="li" key={item.label} delay={280 + i * 70} immediate>
              <span className="home-hero__stat-icon" aria-hidden>
                <StatIcon name={item.icon} />
              </span>
              <div className="home-hero__stat-copy">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            </RiseTitle>
          ))}
        </ul>

        <RiseTitle as="div" className="home-hero__cta" delay={620} immediate>
          <Link href="/services" className="btn btn--primary">
            探索我們的服務 <IconArrow />
          </Link>
          <Link href="/contact#rfq" className="btn btn--ghost">
            立即詢價 <IconArrow />
          </Link>
        </RiseTitle>
      </div>
    </section>
  );
}

export default HomeHero;
