import Link from "next/link";
import { BRAND, STATS } from "@/lib/content";
import { IconArrow } from "@/components/icons";

export function HomeHero() {
  return (
    <section className="home-hero" aria-label="首頁主視覺">
      <div className="home-hero__media" aria-hidden />
      <div className="home-hero__veil" aria-hidden />

      <div className="home-hero__content">
        <p className="home-hero__brand">
          <span>{BRAND.short}</span> {BRAND.nameEn}
        </p>
        <h1>{BRAND.taglineZh}</h1>
        <p className="home-hero__sub">{BRAND.trustZh}</p>

        <ul className="home-hero__stats">
          {STATS.map((item) => (
            <li key={item.label}>
              <strong>{item.value}</strong>
              <span>
                {item.label}
                <small>{item.en}</small>
              </span>
            </li>
          ))}
        </ul>

        <div className="home-hero__cta">
          <Link href="/services" className="btn btn--primary">
            探索我們的服務 <IconArrow />
          </Link>
          <Link href="/contact#rfq" className="btn btn--ghost">
            立即詢價 <IconArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
