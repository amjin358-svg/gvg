import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  FileCheck2,
  Globe2,
  Network,
  PackageSearch,
  Scale,
  Ship,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { newsArticles } from "@/frontend/data/mock/catalog";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "國際貿易",
  description: "GVG 國際貿易服務：進出口、全球採購、物流、合規與貿易金融。",
};

const SIDEBAR = [
  { label: "貿易總覽", href: "/trade", icon: Globe2, active: true },
  { label: "進出口業務", href: "/trade#import-export", icon: Ship },
  { label: "全球採購", href: "/procurement", icon: PackageSearch },
  { label: "供應商開發", href: "/marketplace", icon: Network },
  { label: "物流服務", href: "/logistics", icon: Boxes },
  { label: "關務法規", href: "/customs", icon: Scale },
  { label: "貿易金融", href: "/trade#finance", icon: Wallet },
  { label: "認證服務", href: "/trade#cert", icon: BadgeCheck },
  { label: "市場情報", href: "/news", icon: FileCheck2 },
];

const METRICS = [
  { label: "服務國家／地區", value: "100+" },
  { label: "合作供應商", value: "5,000+" },
  { label: "年交易額", value: "$120M+" },
  { label: "成功案例", value: "2,000+" },
];

const PROCESS = [
  "需求諮詢",
  "供應商開發",
  "報價確認",
  "合約簽訂",
  "生產出貨",
  "交付完成",
];

const SERVICE_CARDS = [
  {
    title: "進出口服務",
    description: "文件、報關、貿易條款與端到端出貨協調。",
    href: "/customs",
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "全球採購",
    description: "多國尋源、比價與供應商品質把關。",
    href: "/procurement",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "物流整合",
    description: "海空陸運追蹤與跨倉調度。",
    href: "/logistics",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "貿易合規",
    description: "HS 編碼、原產地證明與清關文件包。",
    href: "/customs",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "貿易金融",
    description: "付款條件規劃與應收風險控管建議。",
    href: "/trade#finance",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
  },
];

export default function TradePage() {
  return (
    <div className="bg-[var(--color-mist)] pb-16">
      <Container className="grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-xl border border-[var(--color-line)] bg-white p-4">
          <p className="px-2 text-sm font-semibold text-[var(--color-navy)]">國際貿易服務</p>
          <ul className="mt-3 space-y-1">
            {SIDEBAR.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-2 text-sm",
                      item.active
                        ? "bg-[var(--color-navy)] text-white"
                        : "text-[var(--color-muted)] hover:bg-[var(--color-mist)] hover:text-[var(--color-ink)]",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 rounded-lg bg-[var(--color-mist)] p-4">
            <p className="text-sm font-semibold text-[var(--color-ink)]">為什麼選擇 GVG</p>
            <ul className="mt-3 space-y-2 text-xs text-[var(--color-muted)]">
              <li>全球網絡</li>
              <li>一站式服務</li>
              <li>合規把關</li>
              <li>高效率物流</li>
            </ul>
            <Link href="/contact" className="mt-4 block">
              <Button size="sm" className="w-full">
                聯絡我們
              </Button>
            </Link>
          </div>
        </aside>

        <div className="space-y-8">
          <p className="text-xs text-[var(--color-muted)]">首頁 &gt; 國際貿易</p>

          <section className="grid overflow-hidden rounded-xl border border-[var(--color-line)] bg-white lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 sm:p-8">
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-navy)] sm:text-4xl">
                國際貿易
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                從全球採購、供應商開發、報價合約到物流報關，GVG 提供可追蹤、可稽核的跨境貿易作業流程。
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-[var(--color-ink)]">
                <li className="flex items-center gap-2">
                  <PackageSearch className="h-4 w-4 text-[var(--color-navy)]" />
                  全球採購
                </li>
                <li className="flex items-center gap-2">
                  <Ship className="h-4 w-4 text-[var(--color-navy)]" />
                  物流整合
                </li>
                <li className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-[var(--color-navy)]" />
                  合規控管
                </li>
                <li className="flex items-center gap-2">
                  <ShieldIcon />
                  風險管理
                </li>
              </ul>
              <Link href="/contact" className="mt-8 inline-block">
                <Button>
                  立即諮詢專家
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative min-h-64">
              <Image
                src="https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1400&q=80"
                alt="貨櫃輪"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-[var(--color-navy)]/45" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-xs tracking-[0.16em]">YOUR TRUSTED PARTNER IN GLOBAL TRADE</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">
                  值得信賴的全球貿易夥伴
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-[var(--color-line)] bg-white p-5"
              >
                <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-navy)]">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{metric.label}</p>
              </div>
            ))}
          </section>

          <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
                我們的服務流程
              </h2>
              <Link href="/rfq" className="text-sm font-semibold text-[var(--color-navy)]">
                了解更多 →
              </Link>
            </div>
            <ol className="grid gap-3 sm:grid-cols-3 xl:grid-cols-6">
              {PROCESS.map((step, index) => (
                <li
                  key={step}
                  className="rounded-lg border border-[var(--color-line)] bg-[var(--color-mist)] px-3 py-4 text-center"
                >
                  <p className="text-xs font-semibold text-[var(--color-gold-strong)]">
                    0{index + 1}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[var(--color-ink)]">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {SERVICE_CARDS.map((card) => (
                <article
                  key={card.title}
                  className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-white"
                >
                  <div className="relative aspect-[16/10]">
                    <Image src={card.image} alt={card.title} fill className="object-cover" sizes="40vw" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--color-ink)]">{card.title}</h3>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">{card.description}</p>
                    <Link
                      href={card.href}
                      className="mt-3 inline-flex text-sm font-semibold text-[var(--color-navy)]"
                    >
                      了解更多 →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <aside className="space-y-4">
              <div className="rounded-xl border border-[var(--color-line)] bg-white p-5">
                <h3 className="font-semibold">熱門貿易市場</h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
                  <li>北美 · 美國採購轉運</li>
                  <li>東亞 · 台灣／中國／日本／韓國</li>
                  <li>東南亞 · OEM／ODM 產線</li>
                  <li>歐洲 · 合規與通路導入</li>
                </ul>
              </div>
              <div className="rounded-xl border border-[var(--color-line)] bg-white p-5">
                <h3 className="font-semibold">最新市場情報</h3>
                <ul className="mt-4 space-y-3">
                  {newsArticles.slice(0, 3).map((article) => (
                    <li key={article.id}>
                      <Link
                        href={`/news/${article.slug}`}
                        className="text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-navy)]"
                      >
                        {article.title}
                      </Link>
                      <p className="mt-1 text-xs text-[var(--color-muted)]">{article.publishedAt}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <form className="rounded-xl border border-[var(--color-line)] bg-white p-5">
                <h3 className="font-semibold">訂閱市場快訊</h3>
                <label className="sr-only" htmlFor="trade-newsletter">
                  Email
                </label>
                <input
                  id="trade-newsletter"
                  type="email"
                  placeholder="your@email.com"
                  className="mt-3 h-10 w-full rounded-md border border-[var(--color-line)] px-3 text-sm"
                />
                <Button type="submit" className="mt-3 w-full" size="sm">
                  訂閱
                </Button>
              </form>
            </aside>
          </section>
        </div>
      </Container>

      <section className="relative mt-8 overflow-hidden bg-[var(--color-navy)] py-14 text-white">
        <Container className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">
              準備擴展全球市場？
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/75">
              讓 GVG 成為您最可靠的國際貿易夥伴。
            </p>
          </div>
          <Link href="/contact">
            <Button variant="gold" size="lg">
              立即聯絡專家
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}

function ShieldIcon() {
  return <Scale className="h-4 w-4 text-[var(--color-navy)]" />;
}
