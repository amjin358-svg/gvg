import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  FileText,
  LineChart,
  Megaphone,
  Search,
  Sparkles,
  Target,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { AiAssistantPanel } from "@/frontend/features/ai/AiAssistantPanel";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI 智慧服務",
  description: "GVG AI 智慧服務：市場趨勢、智慧採購、供應商推薦、價格預測與文件翻譯。",
};

const SIDEBAR = [
  { label: "商務顧問", href: "/ai#consultant" },
  { label: "市場趨勢分析", href: "/ai#trends" },
  { label: "智慧採購", href: "/ai#procurement", active: true },
  { label: "供應商推薦", href: "/ai#suppliers" },
  { label: "價格預測", href: "/ai#pricing" },
  { label: "行銷助理", href: "/ai#marketing" },
  { label: "文件翻譯", href: "/ai#translate" },
];

const AI_SERVICES = [
  {
    title: "市場趨勢",
    description: "追蹤品類與走廊需求變化，輔助採購決策。",
    icon: LineChart,
    tone: "bg-sky-100 text-sky-700",
  },
  {
    title: "智慧採購助理",
    description: "自然語言尋源、RFQ 草稿與到岸成本估算。",
    icon: Bot,
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "供應商推薦",
    description: "依 MOQ、交期、產地與認證推薦合適工廠。",
    icon: Search,
    tone: "bg-violet-100 text-violet-700",
  },
  {
    title: "價格預測",
    description: "結合歷史報價區間給出目標價建議。",
    icon: BarChart3,
    tone: "bg-orange-100 text-orange-700",
  },
  {
    title: "行銷助理",
    description: "生成商品說明與跨市場溝通文案。",
    icon: Megaphone,
    tone: "bg-teal-100 text-teal-700",
  },
  {
    title: "文件翻譯",
    description: "貿易文件與規格書多語翻譯支援。",
    icon: FileText,
    tone: "bg-indigo-100 text-indigo-700",
  },
];

const INDUSTRIES = [
  {
    title: "貿易批發",
    text: "詢價加速 · 供應商比對 · 風險提示",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "居家生活",
    text: "選品建議 · 包裝合規 · 通路文案",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "健康保健",
    text: "認證標籤 · OEM 規格 · 到岸成本",
    image:
      "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "五金工具",
    text: "交期預測 · 工廠配對 · 報價比較",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1000&q=80",
  },
];

const STEPS = ["需求描述", "AI 分析", "方案建議", "執行優化", "成效追蹤"];

export default function AiServicesPage() {
  return (
    <div className="bg-[var(--color-mist)] pb-16">
      <Container className="grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit space-y-4 rounded-xl border border-[var(--color-line)] bg-white p-4">
          <p className="px-2 text-sm font-semibold text-[var(--color-navy)]">AI 智慧服務</p>
          <ul className="space-y-1">
            {SIDEBAR.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-md px-2 py-2 text-sm",
                    item.active
                      ? "bg-[var(--color-navy)] text-white"
                      : "text-[var(--color-muted)] hover:bg-[var(--color-mist)]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="rounded-lg bg-[var(--color-navy)] p-4 text-white">
            <p className="text-sm font-semibold">客製 AI 方案</p>
            <p className="mt-2 text-xs text-white/70">为企业流程打造專屬助理與知識庫。</p>
            <Link href="/contact" className="mt-4 block">
              <Button size="sm" variant="gold" className="w-full">
                洽詢方案
              </Button>
            </Link>
          </div>
          <div className="rounded-lg bg-[var(--color-mist)] p-4 text-sm">
            <p className="font-semibold text-[var(--color-ink)]">我的 AI 工具箱</p>
            <ul className="mt-3 space-y-2 text-[var(--color-muted)]">
              <li>我的專案</li>
              <li>我的報告</li>
              <li>使用紀錄</li>
            </ul>
          </div>
        </aside>

        <div className="space-y-8">
          <p className="text-xs text-[var(--color-muted)]">首頁 &gt; AI 智慧服務</p>

          <section className="grid overflow-hidden rounded-xl border border-[var(--color-line)] bg-white lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 sm:p-8">
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-navy)] sm:text-4xl">
                AI 智慧服務
              </h1>
              <p className="mt-4 text-sm text-[var(--color-muted)]">
                以資料驅動決策，提升效率、降低成本，發掘更多跨境商機。
              </p>
              <ul className="mt-6 space-y-2 text-sm text-[var(--color-ink)]">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[var(--color-navy)]" />
                  資料驅動決策
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-[var(--color-navy)]" />
                  提升作業效率
                </li>
                <li className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-[var(--color-navy)]" />
                  降低採購成本
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[var(--color-navy)]" />
                  創造更多機會
                </li>
              </ul>
              <a href="#assistant" className="mt-8 inline-block">
                <Button>
                  探索 AI 服務
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
            <div className="relative min-h-64 bg-[var(--color-navy)]">
              <Image
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80"
                alt="AI technology"
                fill
                className="object-cover opacity-80"
                sizes="40vw"
              />
            </div>
          </section>

          <section id="procurement">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              熱門 AI 服務
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {AI_SERVICES.map((service) => (
                <article
                  key={service.title}
                  className="rounded-xl border border-[var(--color-line)] bg-white p-5"
                >
                  <span className={cn("inline-flex rounded-md p-2", service.tone)}>
                    <service.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-[var(--color-ink)]">{service.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">{service.description}</p>
                  <a
                    href="#assistant"
                    className="mt-4 inline-flex text-sm font-semibold text-[var(--color-navy)]"
                  >
                    立即使用 →
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              產業解決方案
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {INDUSTRIES.map((industry) => (
                <article
                  key={industry.title}
                  className="relative aspect-[4/5] overflow-hidden rounded-xl"
                >
                  <Image src={industry.image} alt={industry.title} fill className="object-cover" sizes="25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className="font-semibold">{industry.title}</h3>
                    <p className="mt-1 text-xs text-white/80">{industry.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { value: "2,500+", label: "企業用戶", icon: Users },
              { value: "98.5%", label: "預測準確率", icon: Target },
              { value: "35%", label: "效率提升", icon: LineChart },
              { value: "$2.8M+", label: "客戶節省成本", icon: Wallet },
            ].map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-[var(--color-line)] bg-white p-5"
              >
                <metric.icon className="h-5 w-5 text-[var(--color-navy)]" />
                <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-navy)]">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{metric.label}</p>
              </div>
            ))}
          </section>

          <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              如何運作
            </h2>
            <ol className="mt-5 grid gap-3 sm:grid-cols-5">
              {STEPS.map((step, index) => (
                <li
                  key={step}
                  className="rounded-lg border border-[var(--color-line)] bg-[var(--color-mist)] px-3 py-4 text-center"
                >
                  <p className="text-xs font-semibold text-[var(--color-gold-strong)]">
                    0{index + 1}
                  </p>
                  <p className="mt-2 text-sm font-semibold">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="assistant" className="rounded-xl border border-[var(--color-line)] bg-white p-6">
            <h2 className="mb-6 font-[family-name:var(--font-display)] text-2xl font-semibold">
              智慧採購助理
            </h2>
            <AiAssistantPanel />
          </section>
        </div>
      </Container>

      <section className="bg-[var(--color-navy)] py-14 text-white">
        <Container className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
            準備體驗 AI 的力量？
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
            從免費諮詢開始，讓 GVG AI 協助您縮短尋源與詢價週期。
          </p>
          <Link href="/contact" className="mt-8 inline-block">
            <Button variant="gold" size="lg">
              開始免費諮詢
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}
