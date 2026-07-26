import Link from "next/link";
import { SERVICES } from "@/lib/content";
import { IconArrow, ServiceIcon } from "@/components/icons";

export function ServicesSection() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="section__head">
        <div>
          <p className="eyebrow">Services</p>
          <h2 id="services-title">核心服務項目</h2>
          <p>以專業流程串聯採購、貿易、物流與合規，協助企業高效進出全球市場。</p>
        </div>
        <Link href="/services" className="text-link">
          查看全部服務 <IconArrow />
        </Link>
      </div>

      <div className="service-grid">
        {SERVICES.map((item, index) => (
          <Link key={item.href} href={item.href} className="service-card">
            <span className="service-card__icon">
              <ServiceIcon index={index} />
            </span>
            <h3>
              {item.title}
              <small>{item.en}</small>
            </h3>
            <p>{item.desc}</p>
            <span className="service-card__more" aria-hidden>
              <IconArrow />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
