"use client";

import Link from "next/link";

const NAV = [
  { href: "#overview", label: "Overview" },
  { href: "#modules", label: "Modules" },
  { href: "#solutions", label: "Solutions" },
  { href: "/marketplace", label: "Marketplace", external: true },
  { href: "/ai", label: "AI Services", external: true },
  { href: "#about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a
        className="site-header__brand"
        href="#overview"
        aria-label="Global Vista Group"
      >
        <span className="site-header__mark" aria-hidden>
          <svg viewBox="0 0 32 32" width="28" height="28">
            <path
              d="M16 2 L28 9 V23 L16 30 L4 23 V9 Z"
              fill="none"
              stroke="url(#gvg-mark)"
              strokeWidth="1.6"
            />
            <path
              d="M16 8 L22 11.5 V18.5 L16 22 L10 18.5 V11.5 Z"
              fill="url(#gvg-mark)"
              opacity="0.9"
            />
            <defs>
              <linearGradient id="gvg-mark" x1="4" y1="2" x2="28" y2="30">
                <stop stopColor="#7EB6FF" />
                <stop offset="1" stopColor="#8B6CFF" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="site-header__name">Global Vista Group</span>
      </a>

      <nav className="site-header__nav" aria-label="Primary">
        {NAV.map((item) =>
          item.external ? (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ) : (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ),
        )}
      </nav>

      <a className="site-header__cta" href="#get-started">
        Get Started
      </a>
    </header>
  );
}

export default SiteHeader;
