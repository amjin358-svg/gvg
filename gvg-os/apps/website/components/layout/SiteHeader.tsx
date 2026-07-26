"use client";

import { BrandLogo } from "@/components/brand/BrandLogo";

const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL || "http://localhost:3001";

const NAV = [
  { href: "#overview", label: "Overview" },
  { href: "#modules", label: "Modules" },
  { href: "#solutions", label: "Solutions" },
  {
    href: `${portalUrl}/marketplace`,
    label: "Marketplace",
    external: true,
  },
  { href: `${portalUrl}/ai`, label: "AI Services", external: true },
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
        <BrandLogo size="sm" />
      </a>

      <nav className="site-header__nav" aria-label="Primary">
        {NAV.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="site-header__cta" href="#get-started">
        Get Started
      </a>
    </header>
  );
}

export default SiteHeader;
