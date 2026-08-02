"use client";

import Link from "next/link";
import { BRAND, SERVICES, STATS } from "@/lib/content";
import { asset } from "@/lib/assets";
import { IconArrow, ServiceIcon, StatIcon } from "@/components/icons";
import { RiseTitle } from "@/components/RiseTitle";

/**
 * Homepage hero — title area hosts the service icon strip;
 * categories overlap the former services slot below.
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
        <RiseTitle as="h1" delay={60} immediate>
          {BRAND.taglineZh}
        </RiseTitle>
        <RiseTitle as="p" className="home-hero__sub" delay={140} immediate>
          {BRAND.trustZh}
        </RiseTitle>

        <div className="home-hero__services" id="services" aria-label="核心服務項目">
          <div className="services-strip__inner services-strip__inner--on-hero">
            {SERVICES.map((item, index) => (
              <RiseTitle
                as={Link}
                key={item.href}
                href={item.href}
                className="services-strip__item"
                delay={200 + index * 45}
                immediate
              >
                <span className="services-strip__icon">
                  <ServiceIcon index={index} />
                </span>
                <span className="services-strip__text">
                  <strong>{item.title}</strong>
                  <small>{item.desc}</small>
                </span>
                <span className="services-strip__arrow" aria-hidden>
                  <IconArrow />
                </span>
              </RiseTitle>
            ))}
          </div>
        </div>

        <ul className="home-hero__stats">
          {STATS.map((item, i) => (
            <RiseTitle as="li" key={item.label} delay={480 + i * 55} immediate>
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
