"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND, NAV, SERVICES } from "@/lib/content";

export function SiteFooter() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  if (isHome) {
    return (
      <footer className="site-footer site-footer--minimal">
        <div className="site-footer__bar site-footer__bar--solo">
          <span>© 2026 {BRAND.nameEn}. All rights reserved.</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <div className="site-brand site-brand--footer">
            <span className="site-brand__mark">{BRAND.short}</span>
            <span className="site-brand__text">
              <strong>{BRAND.nameEn}</strong>
              <small>{BRAND.nameZh}</small>
            </span>
          </div>
          <p className="site-footer__lead">
            {BRAND.trustZh}
            <span className="en-soft"> — {BRAND.trustEn}</span>
          </p>
        </div>

        <div>
          <h3>網站導覽</h3>
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>核心服務</h3>
          <ul>
            {SERVICES.slice(0, 4).map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>聯絡資訊</h3>
          <ul className="site-footer__contact">
            <li>Email：trade@globalvistagroup.com</li>
            <li>電話：+886 2 0000 0000</li>
            <li>地址：台北市信義區（示意）</li>
          </ul>
        </div>
      </div>
      <div className="site-footer__bar">
        <span>© 2026 {BRAND.nameEn}. All rights reserved.</span>
        <span className="en-soft">{BRAND.taglineEn}</span>
      </div>
    </footer>
  );
}

export default SiteFooter;
