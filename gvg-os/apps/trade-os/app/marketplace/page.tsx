import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  Headphones,
  Lock,
  Star,
  Truck,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { products } from "@/frontend/data/mock/catalog";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "市集 Marketplace",
  description: "連結全球供應商與買方的 GVG 市集：篩選、比價、詢價一次完成。",
};

const CATEGORIES = [
  "食品飲料",
  "居家生活",
  "五金工具",
  "汽車用品",
  "辦公用品",
  "健康保健",
  "建材裝修",
  "品牌服飾",
];

const SUPPLIER_TYPES = ["製造商", "貿易商", "品牌商", "批發商", "OEM 工廠"];
const REGIONS = ["台灣", "美國", "中國", "日本", "韓國"];

const SUPPLIERS = [
  {
    name: "Green Life Co., Ltd.",
    country: "台灣",
    type: "製造商",
    rating: 4.9,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "HarborCraft Manufacturing",
    country: "台灣",
    type: "OEM 工廠",
    rating: 4.8,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "VistaWell Labs",
    country: "美國",
    type: "品牌商",
    rating: 4.7,
    reviews: 212,
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Pacific Thread",
    country: "越南",
    type: "製造商",
    rating: 4.6,
    reviews: 74,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
  },
];

/** Static export: query filtering is client/URL-driven later; prerender full catalog. */
export default function MarketplacePage() {
  const q = "";
  const filtered = products;

  return (
    <div className="bg-[var(--color-mist)] pb-16">
      <Container className="grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit space-y-5 rounded-xl border border-[var(--color-line)] bg-white p-4">
          <div>
            <p className="text-sm font-semibold text-[var(--color-navy)]">瀏覽分類</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <Link href={`/marketplace?q=${encodeURIComponent(category)}`} className="hover:text-[var(--color-navy)]">
                    {category}
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

          <form className="space-y-3">
            <p className="text-sm font-semibold text-[var(--color-navy)]">價格區間（USD）</p>
            <div className="grid grid-cols-2 gap-2">
              <input
                name="min"
                placeholder="最低"
                className="h-9 rounded-md border border-[var(--color-line)] px-2 text-sm"
              />
              <input
                name="max"
                placeholder="最高"
                className="h-9 rounded-md border border-[var(--color-line)] px-2 text-sm"
              />
            </div>
            <Button type="submit" size="sm" className="w-full">
              確認
            </Button>
          </form>
        </aside>

        <div className="space-y-8">
          <p className="text-xs text-[var(--color-muted)]">首頁 &gt; 市集</p>

          <section className="grid gap-4 rounded-xl border border-[var(--color-line)] bg-white p-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-navy)] sm:text-4xl">
                Marketplace 市集
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

          <form
            action="/marketplace"
            className="flex flex-col gap-3 rounded-xl border border-[var(--color-line)] bg-white p-4 lg:flex-row"
          >
            <select
              name="category"
              className="h-11 rounded-md border border-[var(--color-line)] px-3 text-sm"
              defaultValue=""
            >
              <option value="">全部分類</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              name="q"
              defaultValue={q ?? ""}
              placeholder="搜尋產品／供應商／品牌"
              className="h-11 flex-1 rounded-md border border-[var(--color-line)] px-3 text-sm"
            />
            <select
              name="region"
              className="h-11 rounded-md border border-[var(--color-line)] px-3 text-sm"
              defaultValue=""
            >
              <option value="">出貨地區</option>
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
              <input type="checkbox" name="ready" className="accent-[var(--color-navy)]" />
              Ready to Ship
            </label>
            <Button type="submit">搜尋</Button>
          </form>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              精選供應商
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {SUPPLIERS.map((supplier) => (
                <article
                  key={supplier.name}
                  className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-white"
                >
                  <div className="relative aspect-[16/10]">
                    <Image src={supplier.image} alt={supplier.name} fill className="object-cover" sizes="25vw" />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded bg-white/95 px-2 py-1 text-[11px] font-semibold text-[var(--color-navy)]">
                      <BadgeCheck className="h-3.5 w-3.5" />
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
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              熱門商品 {q ? `· 「${q}」` : ""}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition-shadow hover:shadow-md"
                >
                  <div className={`relative aspect-[16/10] bg-gradient-to-br ${product.imageGradient}`}>
                    <span className="absolute left-3 top-3 rounded bg-red-500 px-2 py-0.5 text-[11px] font-semibold text-white">
                      {index % 2 === 0 ? "Hot Sale" : "New"}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--color-ink)]">{product.name}</h3>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      Origin: {product.originCountry}
                    </p>
                    <p className="mt-3 text-base font-semibold text-[var(--color-navy)]">
                      {formatCurrency(product.unitPrice, product.currency)} / Unit
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-muted)]">
                      MOQ: {product.moq.toLocaleString()} Units
                    </p>
                  </div>
                </Link>
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
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}
