"use client";

import Link from "next/link";
import { BRAND, STATS } from "@/lib/content";
import { asset } from "@/lib/assets";
import { IconArrow } from "@/components/icons";
import { RiseTitle } from "@/components/RiseTitle";

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
        <RiseTitle as="p" className="home-hero__brand" delay={60} immediate>
          <span>{BRAND.short}</span> {BRAND.nameEn}
        </RiseTitle>
        <RiseTitle as="h1" delay={160} immediate>
          {BRAND.taglineZh}
        </RiseTitle>
        <RiseTitle as="p" className="home-hero__sub" delay={280} immediate>
          {BRAND.trustZh}
        </RiseTitle>

        <ul className="home-hero__stats">
          {STATS.map((item, i) => (
            <RiseTitle
              as="li"
              key={item.label}
              delay={360 + i * 70}
              immediate
            >
              <strong>{item.value}</strong>
              <span>
                {item.label}
                <small>{item.en}</small>
              </span>
            </RiseTitle>
          ))}
        </ul>

        <RiseTitle as="div" className="home-hero__cta" delay={720} immediate>
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
