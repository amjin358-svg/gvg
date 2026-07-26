import Link from "next/link";
import { BRAND, NAV } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label={`${BRAND.short} ${BRAND.nameEn}`}>
          <span className="brand__mark">{BRAND.short}</span>
          <span className="brand__en">{BRAND.nameEn}</span>
        </Link>
        <nav className="nav" aria-label="主要導覽">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="btn btn--gold btn--sm" href="#contact">
          立即詢價
        </a>
      </div>
    </header>
  );
}

export default SiteHeader;
