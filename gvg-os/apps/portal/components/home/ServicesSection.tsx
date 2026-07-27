import Link from "next/link";
import { SERVICES } from "@/lib/content";
import { IconArrow, ServiceIcon } from "@/components/icons";

/** Horizontal service strip overlapping the hero — original corporate mock */
export function ServicesSection() {
  return (
    <section className="services-strip" id="services" aria-label="核心服務項目">
      <div className="services-strip__inner">
        {SERVICES.map((item, index) => (
          <Link key={item.href} href={item.href} className="services-strip__item">
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
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
