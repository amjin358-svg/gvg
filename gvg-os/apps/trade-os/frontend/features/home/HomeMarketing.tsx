"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Globe2,
  Handshake,
  Package,
  ShieldCheck,
  Ship,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { BRAND, CORE_SERVICES, HOME_STATS, HOT_CATEGORIES } from "@/lib/constants";

const ICONS = {
  globe: Globe2,
  cart: ShoppingCart,
  package: Package,
  ship: Ship,
  shield: ShieldCheck,
  handshake: Handshake,
} as const;

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[88vh] overflow-hidden text-white">
      <Image
        src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2400&q=80"
        alt="全球港口與貨櫃運輸"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy-deep)]/90 via-[var(--color-navy)]/75 to-[var(--color-navy)]/35" />

      <Container className="relative flex min-h-[88vh] flex-col justify-center pb-36 pt-16">
        <motion.h1
          className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          {BRAND.taglineZh}
        </motion.h1>
        <motion.p
          className="mt-5 max-w-xl text-base text-white/80 sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          您值得信賴的全球貿易與供應鏈合作夥伴
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/services">
            <Button size="lg" variant="primary">
              探索我們的服務
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/rfq">
            <Button size="lg" variant="outlineLight">
              立即詢價
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.ul
          className="mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {HOME_STATS.map((stat) => (
            <li key={stat.label}>
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-gold)] sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-white/75 sm:text-sm">{stat.label}</p>
            </li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

export function HomeServices() {
  return (
    <section className="relative z-10 -mt-24 pb-8">
      <Container>
        <div className="grid gap-0 overflow-hidden rounded-xl bg-white shadow-[0_20px_60px_rgba(10,22,40,0.12)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {CORE_SERVICES.map((service) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS];
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group border-b border-r border-[var(--color-line)] p-5 transition-colors hover:bg-[var(--color-mist)]"
              >
                <Icon className="h-6 w-6 text-[var(--color-navy)]" />
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-ink)]">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center text-xs font-semibold text-[var(--color-navy)]">
                  了解更多
                  <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function HomeCategories() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
            熱門產品分類
          </h2>
          <Link
            href="/products"
            className="text-sm font-semibold text-[var(--color-navy)] hover:underline"
          >
            瀏覽所有產品 →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {HOT_CATEGORIES.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl"
            >
              <Image
                src={category.image}
                alt={category.nameZh}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="font-[family-name:var(--font-display)] text-base font-semibold">
                  {category.nameZh}
                </p>
                <p className="mt-1 text-xs text-white/75">{category.nameEn}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HomeCtaBand() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] py-16 text-white">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=60)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Container className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
            準備拓展全球市場？
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/75">
            讓 GVG 成為您最可靠的國際貿易夥伴 — 從採購、OEM、物流到報關文件一次整合。
          </p>
        </div>
        <Link href="/contact">
          <Button size="lg" variant="gold">
            立即聯絡專家
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </Container>
    </section>
  );
}
