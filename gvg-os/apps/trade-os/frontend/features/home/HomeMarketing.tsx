"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { BRAND, HOT_CATEGORIES } from "@/lib/constants";

/**
 * GVG homepage — Seedance-inspired cinematic product landing.
 * Full-bleed media, brand-first hero, one job per section.
 */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=2400&q=80";

type CapabilityItem = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  href: string;
  cta: string;
  reverse?: boolean;
};

const CAPABILITIES: CapabilityItem[] = [
  {
    eyebrow: "Global Trade",
    title: "從需求到交貨，一路可控",
    body: "進出口、合約條款與多幣別結算整合在同一條工作流，讓跨境交易像本地交易一樣清楚。",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80",
    href: "/trade",
    cta: "探索國際貿易",
  },
  {
    eyebrow: "Global Sourcing",
    title: "精準對接供應網絡",
    body: "依品類、MOQ、產地與認證推薦合適工廠，縮短尋源與打樣的往返時間。",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    href: "/procurement",
    cta: "開始全球採購",
    reverse: true,
  },
  {
    eyebrow: "Supply Chain",
    title: "物流與合規同步推進",
    body: "海空陸運可視、報關文件與 HS 編碼協助並行，減少卡關與重工。",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    href: "/logistics",
    cta: "了解供應鏈服務",
  },
];

const SHOWCASE = [
  {
    title: "港口與幹線",
    caption: "全球航線與貨櫃節點",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "智慧選品",
    caption: "商品中心垂直品類",
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "製造現場",
    caption: "OEM / ODM 落地執行",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1400&q=80",
  },
] as const;

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-[#05080f] text-white">
      <Image
        src={HERO_IMAGE}
        alt="GVG 全球貿易與航運場景"
        fill
        priority
        className="gvg-kenburns object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,8,15,0.25)_0%,rgba(5,8,15,0.72)_55%,rgba(5,8,15,0.92)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-[#05080f]/55" />

      <Container className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 pb-24 pt-28 text-center">
        <motion.p
          className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.55em] text-[var(--color-gold)] sm:text-base"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {BRAND.shortName}
        </motion.p>

        <motion.h1
          className="mt-5 max-w-5xl font-[family-name:var(--font-display)] text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[1.05] tracking-tight"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08 }}
        >
          {BRAND.name}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base text-white/75 sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.16 }}
        >
          連接全球市場，創造無限商機 — 採購、貿易、物流與 AI 服務，一站推進。
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24 }}
        >
          <Link href="/products">
            <Button
              size="lg"
              className="min-w-[10.5rem] rounded-full bg-white text-[var(--color-navy)] hover:bg-white/90"
            >
              進入商品中心
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/trade">
            <Button size="lg" variant="outlineLight" className="min-w-[10.5rem] rounded-full">
              了解國際貿易
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

export function HomeCapabilities() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#05080f] py-20 text-white sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-gold)]">
            Platform
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tight">
            專為跨境營運打造的工作流
          </h2>
          <p className="mt-4 text-sm text-white/60 sm:text-base">
            每一段能力對應一種真實場景 — 清楚、可執行、可延展。
          </p>
        </div>

        <div className="mt-16 space-y-20 sm:mt-24 sm:space-y-28">
          {CAPABILITIES.map((item, index) => (
            <motion.article
              key={item.title}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                item.reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080f]/50 to-transparent" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
                  {item.body}
                </p>
                <Link
                  href={item.href}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[var(--color-gold)]"
                >
                  {item.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HomeShowcase() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#05080f] pb-8 pt-4 text-white sm:pb-12">
      <Container>
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-gold)]">
              Visual Story
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.7rem,3.5vw,2.6rem)] font-semibold">
              真實場景，驅動決策
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/55">
            以影像呈現港口、選品與製造現場 — 讓全球營運看得見。
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3 md:gap-4">
          {SHOWCASE.map((shot, index) => (
            <motion.figure
              key={shot.title}
              className={`relative overflow-hidden rounded-2xl ${
                index === 0 ? "md:col-span-2 md:aspect-[21/11]" : "aspect-[4/5] md:aspect-auto md:min-h-[280px]"
              }`}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <Image
                src={shot.image}
                alt={shot.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                sizes="(max-width:768px) 100vw, 40vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
                  {shot.title}
                </p>
                <p className="mt-1 text-xs text-white/70">{shot.caption}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HomeCategories() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#05080f] py-20 text-white sm:py-28">
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-gold)]">
              Categories
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.7rem,3.5vw,2.6rem)] font-semibold">
              熱門產品垂直
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-[var(--color-gold)]"
          >
            進入商品中心
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HOT_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.href}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              <Link
                href={category.href}
                className="group relative block aspect-[16/10] overflow-hidden rounded-2xl"
              >
                <Image
                  src={category.image}
                  alt={category.nameZh}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080f]/90 via-[#05080f]/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-[family-name:var(--font-display)] text-xl font-semibold">
                    {category.nameZh}
                  </p>
                  <p className="mt-1 text-xs tracking-wide text-white/60">
                    {category.nameEn}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HomeCtaBand() {
  return (
    <section className="relative overflow-hidden bg-[#05080f] pb-28 pt-10 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(212,160,23,0.1),transparent_50%)]" />
      <Container className="relative mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.7rem,3.5vw,2.5rem)] font-semibold tracking-tight">
          準備開始全球佈局？
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/60 sm:text-base">
          從商品中心選品，或直接與專家討論採購、OEM 與物流方案。
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact">
            <Button
              size="lg"
              className="rounded-full bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[var(--color-gold-strong)]"
            >
              聯絡專家
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/ai">
            <Button size="lg" variant="outlineLight" className="rounded-full">
              試用 AI 智慧服務
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

/** @deprecated use HomeCapabilities — kept for import compatibility */
export function HomeServices() {
  return <HomeCapabilities />;
}
