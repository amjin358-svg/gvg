import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { CategorySidebar } from "@/components/molecules/CategorySidebar";
import { CommerceProductCard } from "@/components/molecules/CommerceProductCard";
import {
  CATALOG_NAV,
  TRUST_BADGES,
  resolveCatalogNav,
} from "@/frontend/data/mock/catalogNav";
import { products } from "@/frontend/data/mock/catalog";
import type { Product, ProductCategory } from "@/types";

type ProductCenterViewProps = {
  /** Listing mode: category slug. Hub mode: omit. */
  activeSlug?: ProductCategory;
  title?: string;
  description?: string;
  items?: Product[];
  totalCount?: number;
  mode?: "hub" | "listing";
};

export function ProductCenterView({
  activeSlug,
  title,
  description,
  items,
  totalCount,
  mode = activeSlug ? "listing" : "hub",
}: ProductCenterViewProps) {
  if (mode === "hub") {
    return <ProductCenterHub />;
  }

  const nav = activeSlug ? resolveCatalogNav(activeSlug) : undefined;
  const heading =
    title ??
    (activeSlug === "furniture" ? "居家生活 / 傢俱" : nav?.nameZh) ??
    "商品中心";
  const blurb =
    description ??
    (activeSlug === "furniture"
      ? "精選全球傢俱品牌，適合零售、專案與跨境批發採購。"
      : `精選優質${nav?.nameZh ?? "商品"}，專業耐用，滿足全球貿易與通路需求。`);

  const list =
    items ??
    (activeSlug
      ? products.filter((product) => product.categorySlug === activeSlug)
      : products);
  const shown = list.length > 0 ? list : products;
  const grid =
    shown.length < 6
      ? [...shown, ...shown, ...shown, ...shown].slice(0, 12)
      : shown;
  const count = totalCount ?? nav?.count ?? grid.length;

  const crumbs =
    activeSlug === "furniture"
      ? ["首頁", "商品中心", "居家生活", "傢俱"]
      : ["首頁", "商品中心", heading];

  const shortcuts =
    nav?.children?.map((child) => ({
      label: child.label,
      href: child.href,
    })) ?? [];

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

          {shortcuts.length > 0 ? (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 xl:grid-cols-8">
              {shortcuts.slice(0, 8).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex min-h-[4.5rem] flex-col items-center justify-center rounded-xl border border-[var(--color-line)] bg-white px-2 py-3 text-center text-xs font-medium text-[var(--color-muted)] hover:border-[var(--color-navy)] hover:text-[var(--color-navy)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[var(--color-muted)]">
              共找到 {count.toLocaleString()} 項商品
            </p>
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

      <TrustBar />
    </div>
  );
}

function ProductCenterHub() {
  const images: Record<string, string> = {
    "health-supplements":
      "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=900&q=80",
    "packaged-foods":
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    "household-goods":
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
    "hardware-tools":
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80",
    "home-improvement":
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    "branded-apparel":
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
    "oem-odm":
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
  };

  return (
    <div className="bg-[var(--color-mist)]">
      <Container className="grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        <CategorySidebar />

        <div className="space-y-6">
          <p className="text-xs text-[var(--color-muted)]">首頁 &gt; 商品中心</p>
          <header>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-navy)]">
              商品中心
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-[var(--color-muted)]">
              依產業垂直選品：保健食品、食品飲料、居家生活、五金工具、裝潢建材、品牌服飾與汽車用品。
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {CATALOG_NAV.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="group overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={images[item.slug] ?? images["household-goods"]!}
                    alt={item.nameZh}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
                      {item.nameZh}
                    </p>
                    <p className="mt-1 text-xs text-white/80">
                      {item.count.toLocaleString()} 項商品 · {item.nameEn}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3 text-sm text-[var(--color-navy)]">
                  進入分類
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
      <TrustBar />
    </div>
  );
}

function TrustBar() {
  return (
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
  );
}
