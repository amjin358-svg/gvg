import Link from "next/link";
import {
  BadgeCheck,
  Globe2,
  Headphones,
  Lock,
  ShieldCheck,
  Star,
  Truck,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { CommerceProductCard } from "@/components/molecules/CommerceProductCard";
import {
  CATALOG_NAV,
  MARKETPLACE_SUPPLIERS,
  TRUST_BADGES,
} from "@/frontend/data/mock/catalogNav";
import { products } from "@/frontend/data/mock/catalog";

const CATEGORIES = CATALOG_NAV.map((item) => item.nameZh);
const SUPPLIER_TYPES = ["製造商", "貿易商", "品牌商", "批發商", "OEM 工廠"];
const REGIONS = ["台灣", "美國", "中國", "日本", "韓國"];

export function MarketplaceView() {
  const catalog = [...products, ...products];

  return (
    <div className="bg-[var(--color-mist)] pb-0">
      <Container className="grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit space-y-5 rounded-xl border border-[var(--color-line)] bg-white p-4">
          <div>
            <p className="text-sm font-semibold text-[var(--color-navy)]">瀏覽分類</p>
            <ul className="mt-3 space-y-1 text-sm">
              {CATALOG_NAV.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2.5 py-2 text-[var(--color-muted)] hover:bg-[var(--color-mist)] hover:text-[var(--color-navy)]"
                  >
                    {item.nameZh}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-navy)]">供應商類型</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
              {SUPPLIER_TYPES.map((type) => (
                <li key={type} className="flex items-center gap-2">
                  <input type="checkbox" id={`type-${type}`} className="accent-[var(--color-navy)]" />
                  <label htmlFor={`type-${type}`}>{type}</label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--color-navy)]">出貨地區</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
              {REGIONS.map((region) => (
                <li key={region} className="flex items-center gap-2">
                  <input type="checkbox" id={`region-${region}`} className="accent-[var(--color-navy)]" />
                  <label htmlFor={`region-${region}`}>{region}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-[var(--color-navy)]">價格區間（USD）</p>
            <div className="grid grid-cols-2 gap-2">
              <input placeholder="最低" className="h-9 rounded-md border border-[var(--color-line)] px-2 text-sm" />
              <input placeholder="最高" className="h-9 rounded-md border border-[var(--color-line)] px-2 text-sm" />
            </div>
            <Button type="button" size="sm" className="w-full">
              確定
            </Button>
          </div>
        </aside>

        <div className="space-y-8">
          <p className="text-xs text-[var(--color-muted)]">首頁 &gt; Marketplace</p>

          <section className="grid gap-4 rounded-xl border border-[var(--color-line)] bg-white p-6 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-navy)] sm:text-4xl">
                Marketplace
              </h1>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                連結全球供應商與買方，快速搜尋、比價並發起詢價。
              </p>
            </div>
            <div className="rounded-xl bg-[var(--color-navy)] p-6 text-white">
              <p className="font-[family-name:var(--font-display)] text-xl font-semibold">
                Global Opportunities, Infinite Reach
              </p>
              <p className="mt-2 text-sm text-white/70">成為賣家，拓展全球市場</p>
              <Link href="/portal/supplier" className="mt-5 inline-block">
                <Button variant="outlineLight" size="sm">
                  Become a Seller
                </Button>
              </Link>
            </div>
          </section>

          <form className="flex flex-col gap-3 rounded-xl border border-[var(--color-line)] bg-white p-4 lg:flex-row lg:items-center">
            <select className="h-11 rounded-md border border-[var(--color-line)] px-3 text-sm" defaultValue="">
              <option value="">全部分類</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              name="q"
              placeholder="搜尋產品／供應商／品牌"
              className="h-11 flex-1 rounded-md border border-[var(--color-line)] px-3 text-sm"
            />
            <select className="h-11 rounded-md border border-[var(--color-line)] px-3 text-sm" defaultValue="">
              <option value="">出貨地區</option>
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
              <input type="checkbox" className="accent-[var(--color-navy)]" />
              Ready to Ship
            </label>
            <Button type="button">搜尋</Button>
          </form>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              精選供應商
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {MARKETPLACE_SUPPLIERS.map((supplier) => (
                <article
                  key={supplier.name}
                  className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-white"
                >
                  <div className="relative aspect-[16/10]">
                    <Image src={supplier.image} alt={supplier.name} fill className="object-cover" sizes="20vw" />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded bg-white/95 px-2 py-1 text-[11px] font-semibold text-[var(--color-navy)]">
                      <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" />
                      Verified
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--color-ink)]">{supplier.name}</h3>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      {supplier.country} · {supplier.type}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--color-gold-strong)]">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {supplier.rating} ({supplier.reviews})
                    </p>
                    <Link href="/portal/supplier" className="mt-4 block">
                      <Button size="sm" variant="outline" className="w-full">
                        查看商店
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">熱門商品</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
              {catalog.map((product, index) => (
                <CommerceProductCard
                  key={`${product.id}-${index}`}
                  product={product}
                  badge={index % 2 === 0 ? "熱銷" : "新品"}
                />
              ))}
            </div>
          </section>

          <section className="grid gap-4 rounded-xl border border-[var(--color-line)] bg-white p-5 sm:grid-cols-2 xl:grid-cols-5">
            {[
              { icon: Globe2, title: "全球買方", text: "連結 50+ 國家供應網絡" },
              { icon: Lock, title: "交易安全", text: "多重驗證機制" },
              { icon: WalletCards, title: "多元支付", text: "支援多國貨幣" },
              { icon: Truck, title: "物流支援", text: "整合全球物流" },
              { icon: Headphones, title: "專業客服", text: "中英雙語 24/7" },
            ].map((item) => (
              <div key={item.title} className="text-center sm:text-left">
                <item.icon className="mx-auto h-5 w-5 text-[var(--color-navy)] sm:mx-0" />
                <p className="mt-2 text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{item.text}</p>
              </div>
            ))}
          </section>
        </div>
      </Container>

      <section className="bg-[var(--color-navy)] py-12 text-white">
        <Container className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              成為賣家，拓展全球市場
            </h2>
            <p className="mt-3 text-sm text-white/70">
              免費註冊 → 上架商品 → 觸及全球買方 → 提升業績
            </p>
          </div>
          <Link href="/portal/supplier">
            <Button variant="gold" size="lg">
              立即成為賣家
            </Button>
          </Link>
        </Container>
      </section>

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
