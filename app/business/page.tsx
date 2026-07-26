import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CircleDollarSign,
  ClipboardList,
  FolderKanban,
  Ship,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { StatusBadge } from "@/components/molecules/StatusBadge";
import { BusinessShell } from "@/frontend/features/business/BusinessShell";
import {
  AI_SUMMARY_POINTS,
  BUSINESS_NAV,
  DASHBOARD_PROJECTS,
  RECENT_ACTIVITIES,
  REVENUE_SNAPSHOT,
  TODAY_KPIS,
  TRADE_STATUS_BOARD,
} from "@/frontend/data/business/content";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { orders, rfqs, shipments } from "@/frontend/data/mock/catalog";

export const metadata: Metadata = {
  title: "商務儀表板",
};

export default function BusinessDashboardPage() {
  const openRfqs = rfqs.filter((item) => item.status === "open" || item.status === "quoted").length;
  const activeOrders = orders.length;
  const movingShipments = shipments.filter((item) => item.status !== "delivered").length;

  return (
    <BusinessShell
      title="Business Dashboard"
      titleZh="商務儀表板"
      description="公司總覽、今日 KPI、營收、專案、貿易狀態、AI 摘要與近期動態 — 給經營層的一日戰情室。"
    >
      {/* Company Overview */}
      <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--color-navy)] text-white">
              <BriefcaseBusiness className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
                Company Overview
              </h2>
              <p className="text-xs text-[var(--color-muted)]">公司總覽</p>
            </div>
          </div>
          <Link href="/business/company-profile">
            <Button size="sm" variant="outline">
              完整簡介
            </Button>
          </Link>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold text-[var(--color-ink)]">
              {BRAND.shortName} {BRAND.name} · {BRAND.product}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              {BRAND.descriptionZh}
            </p>
            <p className="mt-3 text-xs tracking-[0.14em] text-[var(--color-gold-strong)]">
              {BRAND.tagline} · {BRAND.taglineZh}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-[var(--color-mist)] p-3">
              <dt className="text-xs text-[var(--color-muted)]">開放 RFQ</dt>
              <dd className="mt-1 text-2xl font-semibold text-[var(--color-navy)]">{openRfqs}</dd>
            </div>
            <div className="rounded-lg bg-[var(--color-mist)] p-3">
              <dt className="text-xs text-[var(--color-muted)]">活躍訂單</dt>
              <dd className="mt-1 text-2xl font-semibold text-[var(--color-navy)]">{activeOrders}</dd>
            </div>
            <div className="rounded-lg bg-[var(--color-mist)] p-3">
              <dt className="text-xs text-[var(--color-muted)]">在途貨況</dt>
              <dd className="mt-1 text-2xl font-semibold text-[var(--color-navy)]">{movingShipments}</dd>
            </div>
            <div className="rounded-lg bg-[var(--color-mist)] p-3">
              <dt className="text-xs text-[var(--color-muted)]">階段</dt>
              <dd className="mt-1 text-lg font-semibold text-[var(--color-navy)]">Phase 1</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Today's KPI */}
      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
              Today&apos;s KPI
            </h2>
            <p className="text-xs text-[var(--color-muted)]">今日關鍵指標（示範數據）</p>
          </div>
          <p className="text-xs text-[var(--color-muted)]">更新：今日 09:45</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {TODAY_KPIS.map((kpi) => (
            <article
              key={kpi.label}
              className="rounded-xl border border-[var(--color-line)] bg-white p-5"
            >
              <p className="text-xs font-semibold text-[var(--color-muted)]">{kpi.label}</p>
              <div className="mt-3 flex items-end justify-between">
                <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
                  {kpi.value}
                </p>
                <span
                  className={cn(
                    "text-xs font-semibold",
                    kpi.tone === "up" && "text-emerald-700",
                    kpi.tone === "down" && "text-rose-700",
                    kpi.tone === "flat" && "text-[var(--color-muted)]",
                  )}
                >
                  {kpi.delta}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-4 xl:grid-cols-2">
        {/* Revenue */}
        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  Revenue
                </h2>
                <p className="text-xs text-[var(--color-muted)]">營收快照</p>
              </div>
            </div>
            <Link href="/business/revenue-model" className="text-xs font-semibold text-[var(--color-navy)]">
              營收模型 →
            </Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {REVENUE_SNAPSHOT.map((item) => (
              <div key={item.label} className="rounded-lg bg-[var(--color-mist)] p-4">
                <p className="text-xs text-[var(--color-muted)]">{item.label}</p>
                <p className="mt-2 text-xl font-semibold text-[var(--color-navy)]">{item.value}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{item.hint}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trade Status */}
        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Ship className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  Trade Status
                </h2>
                <p className="text-xs text-[var(--color-muted)]">貿易狀態看板</p>
              </div>
            </div>
            <Link href="/trade" className="text-xs font-semibold text-[var(--color-navy)]">
              國際貿易 →
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {TRADE_STATUS_BOARD.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-lg border border-[var(--color-line)] px-4 py-3 hover:border-[var(--color-navy)]"
                >
                  <span className="text-sm font-medium text-[var(--color-ink)]">{item.label}</span>
                  <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
                    {item.count}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Projects */}
      <section className="mt-8 rounded-xl border border-[var(--color-line)] bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FolderKanban className="h-5 w-5 text-[var(--color-navy)]" />
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                Projects
              </h2>
              <p className="text-xs text-[var(--color-muted)]">關鍵專案進度</p>
            </div>
          </div>
          <Link href="/business/roadmap" className="text-xs font-semibold text-[var(--color-navy)]">
            路線圖 →
          </Link>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                <th className="py-2 pr-3">專案</th>
                <th className="py-2 pr-3">負責人</th>
                <th className="py-2 pr-3">狀態</th>
                <th className="py-2 pr-3">進度</th>
                <th className="py-2">到期</th>
              </tr>
            </thead>
            <tbody>
              {DASHBOARD_PROJECTS.map((project) => (
                <tr key={project.name} className="border-b border-[var(--color-line)]/70">
                  <td className="py-3 pr-3 font-medium text-[var(--color-ink)]">{project.name}</td>
                  <td className="py-3 pr-3 text-[var(--color-muted)]">{project.owner}</td>
                  <td className="py-3 pr-3">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 bg-[var(--color-mist)]">
                        <div
                          className="h-full bg-[var(--color-navy)]"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-[var(--color-muted)]">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-[var(--color-muted)]">{project.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-8 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        {/* AI Summary */}
        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  AI Summary
                </h2>
                <p className="text-xs text-[var(--color-muted)]">今日營運智慧摘要</p>
              </div>
            </div>
            <Link href="/ai">
              <Button size="sm" variant="outline">
                開啟 AI
              </Button>
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {AI_SUMMARY_POINTS.map((point) => (
              <li
                key={point}
                className="rounded-lg border border-[var(--color-line)] bg-[var(--color-mist)] px-4 py-3 text-sm leading-relaxed text-[var(--color-ink)]"
              >
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* Recent Activities */}
        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-[var(--color-navy)]" />
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                Recent Activities
              </h2>
              <p className="text-xs text-[var(--color-muted)]">近期動態</p>
            </div>
          </div>
          <ul className="mt-5 space-y-3">
            {RECENT_ACTIVITIES.map((activity) => (
              <li
                key={`${activity.time}-${activity.detail}`}
                className="border-b border-[var(--color-line)] pb-3 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center justify-between gap-3 text-xs text-[var(--color-muted)]">
                  <span>{activity.time}</span>
                  <span>{activity.actor}</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">{activity.action}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{activity.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Quick links */}
      <section className="mt-8 rounded-xl border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
          策略文件入口
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {BUSINESS_NAV.filter((item) => item.href !== "/business").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-lg border border-[var(--color-line)] px-4 py-3 hover:border-[var(--color-navy)]"
            >
              <p className="text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-navy)]">
                {item.labelZh}
              </p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">{item.label}</p>
              <span className="mt-3 inline-flex items-center text-xs font-semibold text-[var(--color-navy)]">
                開啟
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </BusinessShell>
  );
}
