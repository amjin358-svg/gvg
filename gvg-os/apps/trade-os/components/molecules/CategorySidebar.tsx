"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CATALOG_NAV } from "@/frontend/data/mock/catalogNav";
import { cn } from "@/lib/utils";

type CategorySidebarProps = {
  activeSlug?: string;
  title?: string;
  brands?: { label: string; count: number }[];
  showPriceFilter?: boolean;
};

export function CategorySidebar({
  activeSlug,
  title = "商品分類",
  brands = [
    { label: "VistaWell", count: 128 },
    { label: "HarborCraft", count: 96 },
    { label: "NordicNest", count: 73 },
    { label: "Pacific Thread", count: 65 },
    { label: "Stanley", count: 58 },
  ],
  showPriceFilter = true,
}: CategorySidebarProps) {
  return (
    <aside className="h-fit space-y-5 rounded-xl border border-[var(--color-line)] bg-white p-4">
      <div>
        <p className="text-sm font-semibold text-[var(--color-navy)]">{title}</p>
        <ul className="mt-3 space-y-1 text-sm">
          {CATALOG_NAV.map((item) => {
            const active = activeSlug === item.slug;
            return (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-md px-2.5 py-2 transition-colors",
                    active
                      ? "bg-[var(--color-navy)] text-white"
                      : "text-[var(--color-muted)] hover:bg-[var(--color-mist)] hover:text-[var(--color-navy)]",
                  )}
                >
                  <span>{item.nameZh}</span>
                  <ChevronRight className={cn("h-3.5 w-3.5", active ? "opacity-90" : "opacity-40")} />
                </Link>
                {active && item.children ? (
                  <ul className="mt-1 space-y-0.5 border-l border-[var(--color-line)] pl-3 ml-2">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block rounded px-2 py-1.5 text-xs text-[var(--color-muted)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-navy)]"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <p className="text-sm font-semibold text-[var(--color-navy)]">品牌</p>
        <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
          {brands.map((brand) => (
            <li key={brand.label} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`brand-${brand.label}`}
                className="accent-[var(--color-navy)]"
              />
              <label htmlFor={`brand-${brand.label}`} className="flex-1">
                {brand.label}
                <span className="ml-1 text-xs text-[var(--color-muted)]">({brand.count})</span>
              </label>
            </li>
          ))}
        </ul>
        <button type="button" className="mt-2 text-xs font-medium text-[var(--color-accent)]">
          顯示更多 +
        </button>
      </div>

      {showPriceFilter ? (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[var(--color-navy)]">價格區間（USD）</p>
          <input type="range" min={0} max={2000} defaultValue={800} className="w-full accent-[var(--color-navy)]" />
          <div className="grid grid-cols-2 gap-2">
            <input
              name="min"
              placeholder="最低"
              defaultValue={10}
              className="h-9 rounded-md border border-[var(--color-line)] px-2 text-sm"
            />
            <input
              name="max"
              placeholder="最高"
              defaultValue={2000}
              className="h-9 rounded-md border border-[var(--color-line)] px-2 text-sm"
            />
          </div>
          <button
            type="button"
            className="h-9 w-full rounded-md bg-[var(--color-navy)] text-sm font-medium text-white"
          >
            確定
          </button>
        </div>
      ) : null}
    </aside>
  );
}
