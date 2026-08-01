import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { CategorySidebar } from "@/components/molecules/CategorySidebar";
import { CommerceProductCard } from "@/components/molecules/CommerceProductCard";
import { CATALOG_NAV, TRUST_BADGES } from "@/frontend/data/mock/catalogNav";
import { products } from "@/frontend/data/mock/catalog";
import type { Product, ProductCategory } from "@/types";

type ProductCenterViewProps = {
  activeSlug?: ProductCategory;
  title?: string;
  description?: string;
  items?: Product[];
  totalCount?: number;
};

export function ProductCenterView({
  activeSlug,
  title,
  description,
  items,
  totalCount,
}: ProductCenterViewProps) {
  const nav = activeSlug
    ? CATALOG_NAV.find((item) => item.slug === activeSlug)
    : undefined;
  const heading = title ?? nav?.nameZh ?? "商品中心";
  const blurb =
    description ??
    nav?.nameEn ??
    "精選全球優質商品，支援批發、OEM 與跨境貿易採購。";
  const list =
    items ??
    (activeSlug
      ? products.filter((product) => product.categorySlug === activeSlug)
      : products);
  const shown = list.length > 0 ? list : products;
  // Repeat for denser mockup grid when catalog is small
  const grid = shown.length < 6 ? [...shown, ...shown, ...shown, ...shown].slice(0, 12) : shown;
  const count = totalCount ?? nav?.count ?? grid.length;
  const crumbs = activeSlug
    ? ["首頁", "商品中心", heading]
    : ["首頁", "商品中心"];

  const shortcuts =
    nav?.children?.map((child) => ({ label: child.label, href: child.href })) ??
    CATALOG_NAV.slice(0, 8).map((item) => ({
      label: item.nameZh,
      href: item.href,
    }));

  return (
    <div className="bg-[var(--color-mist)]">
      <Container className="grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        <CategorySidebar activeSlug={activeSlug} />

        <div className="space-y-6">
          <p className="text-xs text-[var(--color-muted)]">{crumbs.join(" > ")}</p>

          <header>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-navy)]">
              {heading}
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-[var(--color-muted)]">{blurb}</p>
          </header>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 xl:grid-cols-8">
            <Link
              href={activeSlug ? `/categories/${activeSlug}` : "/products"}
              className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-line)] bg-white px-2 py-3 text-center text-xs font-medium text-[var(--color-navy)] hover:border-[var(--color-navy)]"
            >
              全部商品
            </Link>
            {shortcuts.slice(0, 7).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-line)] bg-white px-2 py-3 text-center text-xs font-medium text-[var(--color-muted)] hover:border-[var(--color-navy)] hover:text-[var(--color-navy)]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[var(--color-muted)]">共找到 {count.toLocaleString()} 項商品</p>
            <label className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
              排序方式:
              <select className="h-9 rounded-md border border-[var(--color-line)] bg-white px-2 text-sm text-[var(--color-ink)]">
                <option>熱門推薦</option>
                <option>價格由低到高</option>
                <option>價格由高到低</option>
                <option>最新上架</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {grid.map((product, index) => (
              <CommerceProductCard
                key={`${product.id}-${index}`}
                product={product}
                badge={index % 3 === 0 ? "熱銷" : index % 3 === 1 ? "新品" : null}
              />
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-[var(--color-line)] bg-white">
        <Container className="grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-5">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.title} className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--color-navy)]" />
              <div>
                <p className="text-sm font-semibold text-[var(--color-navy)]">{badge.title}</p>
                <p className="text-xs text-[var(--color-muted)]">{badge.text}</p>
              </div>
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
}
