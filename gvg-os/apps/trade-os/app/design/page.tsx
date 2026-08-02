import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DesignShell } from "@/frontend/features/design/DesignShell";
import { DESIGN_NAV, DESIGN_PRINCIPLES } from "@/frontend/data/design/content";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "設計中心",
};

export default function DesignCenterPage() {
  return (
    <DesignShell
      title="Design Center"
      titleZh="設計中心"
      description={`${BRAND.shortName} ${BRAND.product} 設計中心：標誌、色彩盤、UI 套件、元件庫，以及儀表板／官網／行動預覽。`}
    >
      <section className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-navy)] px-6 py-8 text-white sm:px-8">
        <p className="text-xs tracking-[0.18em] text-[var(--color-gold)]">GVG DESIGN CENTER v1.0</p>
        <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-4xl">
          Logo · Palette · UI · Previews
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
          從品牌資產到可點擊預覽，同一套海軍藍／金色系統貫穿官網、儀表板與行動端。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          設計原則
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {DESIGN_PRINCIPLES.map((item) => (
            <li key={item.title} className="border-t border-[var(--color-line)] bg-white px-5 py-4">
              <p className="text-sm font-semibold text-[var(--color-ink)]">{item.titleZh}</p>
              <p className="mt-0.5 text-xs text-[var(--color-gold-strong)]">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          目錄
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {DESIGN_NAV.filter((item) => item.href !== "/design").map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-start justify-between border border-[var(--color-line)] bg-white px-4 py-4 hover:border-[var(--color-navy)]"
              >
                <span>
                  <span className="block text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-navy)]">
                    {item.labelZh}
                  </span>
                  <span className="mt-1 block text-xs text-[var(--color-muted)]">{item.label}</span>
                </span>
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-navy)] opacity-50 transition group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </DesignShell>
  );
}
