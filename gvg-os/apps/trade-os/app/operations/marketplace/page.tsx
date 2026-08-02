import type { Metadata } from "next";
import Link from "next/link";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { categories, products } from "@/frontend/data/mock/catalog";

export const metadata: Metadata = {
  title: "市集",
};

export default function OpsMarketplacePage() {
  return (
    <OpsShell
      title="Marketplace"
      titleZh="市集"
      description="產品發現與供應商市集營運視角。實機：/marketplace · 規格：docs/016_MARKETPLACE.md。"
    >
      <section className="grid gap-3 sm:grid-cols-3">
        <div className="border-t-2 border-[var(--color-navy)] bg-white px-4 py-4">
          <p className="text-xs text-[var(--color-muted)]">Categories</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">
            {categories.length}
          </p>
        </div>
        <div className="border-t-2 border-[var(--color-navy)] bg-white px-4 py-4">
          <p className="text-xs text-[var(--color-muted)]">Demo products</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">
            {products.length}
          </p>
        </div>
        <div className="border-t-2 border-[var(--color-navy)] bg-white px-4 py-4">
          <p className="text-xs text-[var(--color-muted)]">Live route</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold">/marketplace</p>
        </div>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Verticals
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {categories.map((category) => (
            <li key={category.id} className="border-t border-[var(--color-line)] pt-2 text-sm">
              <Link
                href={`/categories/${category.slug}`}
                className="font-semibold text-[var(--color-ink)] hover:text-[var(--color-navy)]"
              >
                {category.name}
              </Link>
              <span className="mt-1 block text-xs text-[var(--color-muted)]">
                {category.productCount} SKUs
              </span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-6 text-sm">
        <Link href="/marketplace" className="font-semibold text-[var(--color-accent-strong)] hover:underline">
          開啟市集 →
        </Link>
      </p>
    </OpsShell>
  );
}
