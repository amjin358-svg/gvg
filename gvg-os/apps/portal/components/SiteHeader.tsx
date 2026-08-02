"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BRAND, NAV } from "@/lib/content";
import { IconGlobe, IconUser } from "@/components/icons";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-brand" href="/" aria-label={`${BRAND.short} ${BRAND.nameEn}`}>
          <span className="site-brand__mark">{BRAND.short}</span>
          <span className="site-brand__text">
            <strong>{BRAND.nameEn.toUpperCase()}</strong>
          </span>
        </Link>

        <button
          className="site-header__menu"
          type="button"
          aria-expanded={open}
          aria-label="開啟選單"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="主要導覽">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "is-active" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-header__utils">
          <button type="button" className="util-link" aria-label="語言">
            <IconGlobe />
            <span>繁體中文</span>
          </button>
          <Link href="/contact#login" className="util-link">
            <IconUser />
            <span>登入 / 註冊</span>
          </Link>
          <Link href="/contact#rfq" className="btn btn--primary btn--sm">
            立即詢價
          </Link>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
