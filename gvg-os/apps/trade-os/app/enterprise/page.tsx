import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, ClipboardList, Gauge } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { RECENT_ACTIVITIES } from "@/frontend/data/business/content";
import {
  ENTERPRISE_AI_SUMMARY,
  ENTERPRISE_KPIS,
  ENTERPRISE_PILLARS,
  ENTERPRISE_SURFACES,
} from "@/frontend/data/enterprise/content";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "GVG Enterprise",
  description: "Global Vista Group enterprise portal — Business, Design, Development, Operations.",
};

export default function EnterprisePage() {
  return (
    <div className="bg-[var(--color-mist)]">
      {/* Brand masthead */}
      <section className="border-b border-[var(--color-line)] bg-[var(--color-navy)] text-white">
        <Container className="py-10 sm:py-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/gvg-mark.svg" alt="" className="h-14 w-14" />
              <div>
                <p className="text-xs tracking-[0.22em] text-[var(--color-gold)]">GVG ENTERPRISE</p>
                <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-5xl">
                  {BRAND.shortName} Enterprise
                </h1>
                <p className="mt-2 text-sm text-white/70 sm:text-base">
                  {BRAND.name} · {BRAND.product}
                </p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              {BRAND.tagline}
              <span className="mt-1 block text-white/45">{BRAND.taglineZh}</span>
            </p>
          </div>
        </Container>
      </section>

      {/* Pillars: Business · Design · Development · Operations */}
      <section className="border-b border-[var(--color-line)] bg-white">
        <Container className="py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
            Enterprise pillars
          </p>
          <div className="mt-5 grid gap-px bg-[var(--color-line)] sm:grid-cols-2 xl:grid-cols-4">
            {ENTERPRISE_PILLARS.map((pillar) => (
              <Link
                key={pillar.href}
                href={pillar.href}
                className="group bg-white px-5 py-6 transition-colors hover:bg-[var(--color-mist)]"
              >
                <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
                  {pillar.label}
                </p>
                <p className="mt-1 text-xs text-[var(--color-gold-strong)]">{pillar.labelZh}</p>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{pillar.detail}</p>
                <span className="mt-4 inline-flex items-center text-xs font-semibold text-[var(--color-navy)] opacity-60 group-hover:opacity-100">
                  Enter
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Command strip: Recent Activities · AI Summary · Today's KPI */}
      <section className="border-b border-[var(--color-line)]">
        <Container className="grid gap-px bg-[var(--color-line)] py-0 lg:grid-cols-3">
          <div className="bg-[var(--color-mist)] px-5 py-8 sm:px-6">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
                  Recent Activities
                </h2>
                <p className="text-xs text-[var(--color-muted)]">近期動態</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3">
              {RECENT_ACTIVITIES.slice(0, 5).map((activity) => (
                <li
                  key={`${activity.time}-${activity.detail}`}
                  className="border-t border-[var(--color-line)] pt-3"
                >
                  <div className="flex justify-between gap-2 text-xs text-[var(--color-muted)]">
                    <span>{activity.time}</span>
                    <span>{activity.actor}</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">{activity.action}</p>
                  <p className="mt-0.5 text-xs text-[var(--color-muted)]">{activity.detail}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/business"
              className="mt-5 inline-flex text-xs font-semibold text-[var(--color-navy)] hover:underline"
            >
              Business Dashboard →
            </Link>
          </div>

          <div className="bg-white px-5 py-8 sm:px-6">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
                  AI Summary
                </h2>
                <p className="text-xs text-[var(--color-muted)]">AI 摘要</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3">
              {ENTERPRISE_AI_SUMMARY.map((point) => (
                <li
                  key={point}
                  className="border-t border-[var(--color-line)] pt-3 text-sm leading-relaxed text-[var(--color-ink)]"
                >
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/operations/ai-insight"
              className="mt-5 inline-flex text-xs font-semibold text-[var(--color-navy)] hover:underline"
            >
              AI Insight →
            </Link>
          </div>

          <div className="bg-[var(--color-mist)] px-5 py-8 sm:px-6">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
                  Today&apos;s KPI
                </h2>
                <p className="text-xs text-[var(--color-muted)]">今日關鍵指標</p>
              </div>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {ENTERPRISE_KPIS.map((kpi) => (
                <li key={kpi.label} className="border-t-2 border-[var(--color-navy)] bg-white px-3 py-3">
                  <p className="text-[11px] text-[var(--color-muted)]">{kpi.label}</p>
                  <div className="mt-1 flex items-end justify-between gap-2">
                    <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
                      {kpi.value}
                    </p>
                    <span className="text-xs font-semibold text-emerald-700">{kpi.delta}</span>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/operations"
              className="mt-5 inline-flex text-xs font-semibold text-[var(--color-navy)] hover:underline"
            >
              Operations Dashboard →
            </Link>
          </div>
        </Container>
      </section>

      {/* Product surfaces */}
      <section className="border-b border-[var(--color-line)] bg-white">
        <Container className="py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
            Product surfaces
          </p>
          <div className="mt-5 grid gap-px bg-[var(--color-line)] sm:grid-cols-2 xl:grid-cols-4">
            {ENTERPRISE_SURFACES.map((surface) => (
              <Link
                key={surface.href}
                href={surface.href}
                className="group bg-white px-5 py-6 hover:bg-[var(--color-mist)]"
              >
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
                  {surface.label}
                </p>
                <p className="mt-1 text-xs text-[var(--color-gold-strong)]">{surface.labelZh}</p>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{surface.detail}</p>
                <span className="mt-4 inline-flex items-center text-xs font-semibold text-[var(--color-navy)] opacity-60 group-hover:opacity-100">
                  Open
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Enterprise footer band (site footer follows) */}
      <section className="bg-[var(--color-navy)] text-white">
        <Container className="flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
              {BRAND.shortName} Enterprise
            </p>
            <p className="mt-1 text-xs text-white/55">
              {BRAND.name} · {BRAND.productZh}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-white/80">
            <Link href="/business" className="hover:text-white">
              Business
            </Link>
            <Link href="/design" className="hover:text-white">
              Design
            </Link>
            <Link href="/development" className="hover:text-white">
              Development
            </Link>
            <Link href="/operations" className="hover:text-white">
              Operations
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
