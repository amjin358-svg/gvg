import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { BRAND, PLATFORM_MODULES, PRIMARY_NAV, UTILITY_NAV } from "@/lib/constants";

export function SiteFooter() {
  const ops = PLATFORM_MODULES.filter((module) =>
    ["/orders", "/procurement", "/inventory", "/warehouses", "/customs", "/crm", "/analytics", "/admin", "/trade", "/marketplace"].includes(
      module.href,
    ),
  );

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-navy)] text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/gvg-mark.svg" alt="" className="h-10 w-10" />
            <div>
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
                {BRAND.shortName}
              </p>
              <p className="text-xs tracking-[0.14em] text-white/55">{BRAND.productZh}</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {BRAND.descriptionZh}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">導覽</p>
          <ul className="mt-4 space-y-2">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">營運模組</p>
          <ul className="mt-4 space-y-2">
            {ops.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/80 hover:text-white">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">服務</p>
          <ul className="mt-4 space-y-2">
            {UTILITY_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/enterprise" className="text-sm text-white/80 hover:text-white">
                GVG Enterprise
              </Link>
            </li>
            <li>
              <Link href="/design" className="text-sm text-white/80 hover:text-white">
                設計中心
              </Link>
            </li>
            <li>
              <Link href="/development" className="text-sm text-white/80 hover:text-white">
                開發儀表板
              </Link>
            </li>
            <li>
              <Link href="/operations" className="text-sm text-white/80 hover:text-white">
                營運儀表板
              </Link>
            </li>
            <li>
              <Link href="/rfq" className="text-sm text-white/80 hover:text-white">
                立即詢價
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </p>
        <p>Enterprise SaaS · Version 1.0</p>
      </Container>
    </footer>
  );
}
