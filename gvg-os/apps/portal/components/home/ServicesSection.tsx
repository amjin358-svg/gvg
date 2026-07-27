"use client";

import Link from "next/link";
import { SERVICES } from "@/lib/content";
import { IconArrow, ServiceIcon } from "@/components/icons";
import { RiseTitle } from "@/components/RiseTitle";

/** Horizontal service strip overlapping the hero */
export function ServicesSection() {
  return (
    <section className="services-strip" id="services" aria-label="核心服務項目">
      <div className="services-strip__label">
        <RiseTitle as="p" className="eyebrow" delay={40}>
          Business Lines
        </RiseTitle>
        <RiseTitle as="h2" delay={120}>
          核心業務項目
        </RiseTitle>
      </div>
      <div className="services-strip__inner">
        {SERVICES.map((item, index) => (
          <RiseTitle
            as={Link}
            key={item.href}
            href={item.href}
            className="services-strip__item"
            delay={100 + index * 60}
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
    </section>
  );
}

export default ServicesSection;
