import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/molecules/StatusBadge";
import { DesignShell } from "@/frontend/features/design/DesignShell";
import { DASHBOARD_RULES } from "@/frontend/data/design/content";

export const metadata: Metadata = {
  title: "儀表板預覽",
};

export default function DashboardPreviewPage() {
  return (
    <DesignShell
      title="Dashboard Preview"
      titleZh="儀表板預覽"
      description="營運介面預覽：App bar、側欄、KPI 頂線與工作表。實機頁面：/business。"
    >
      <section className="overflow-hidden border border-[var(--color-line)] bg-white shadow-[0_24px_60px_-36px_rgba(0,21,41,0.5)]">
        <div className="flex items-center justify-between bg-[var(--color-navy)] px-4 py-3 text-white">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/gvg-mark.svg" alt="" className="h-7 w-7" />
            <span className="text-sm font-semibold">GVG Ops</span>
            <span className="hidden text-xs text-white/55 sm:inline">Business Dashboard</span>
          </div>
          <span className="text-xs text-[var(--color-gold)]">Role · Exec</span>
        </div>
        <div className="grid lg:grid-cols-[180px_1fr]">
          <aside className="border-b border-[var(--color-line)] bg-[var(--color-mist)] p-3 lg:border-b-0 lg:border-r">
            <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Modules
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              {["Overview", "KPI", "Trade", "Projects", "AI"].map((item, index) => (
                <li
                  key={item}
                  className={
                    index === 0
                      ? "rounded-md bg-[var(--color-navy)] px-2 py-1.5 text-white"
                      : "rounded-md px-2 py-1.5 text-[var(--color-muted)]"
                  }
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
          <div className="p-4 sm:p-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
              Today&apos;s KPI
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {[
                { label: "RFQ", value: "12" },
                { label: "Quotes", value: "28" },
                { label: "Orders", value: "47" },
                { label: "Holds", value: "3" },
              ].map((kpi) => (
                <div key={kpi.label} className="border-t-2 border-[var(--color-navy)] pt-3">
                  <p className="text-xs text-[var(--color-muted)]">{kpi.label}</p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">
                    {kpi.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-line)] text-xs text-[var(--color-muted)]">
                    <th className="py-2 pr-3">專案</th>
                    <th className="py-2 pr-3">狀態</th>
                    <th className="py-2">進度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--color-line)]/70">
                    <td className="py-3 pr-3">Pacific Wellness OEM</td>
                    <td className="py-3 pr-3">
                      <StatusBadge status="in_progress" />
                    </td>
                    <td className="py-3">72%</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3">Auth Rollout</td>
                    <td className="py-3 pr-3">
                      <StatusBadge status="blocked" />
                    </td>
                    <td className="py-3">25%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {DASHBOARD_RULES.map((rule) => (
          <article key={rule.title} className="border-t border-[var(--color-line)] bg-white px-5 py-4">
            <h3 className="text-sm font-semibold text-[var(--color-navy)]">{rule.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{rule.body}</p>
          </article>
        ))}
      </section>

      <p className="mt-8 text-sm">
        <Link href="/business" className="font-semibold text-[var(--color-accent-strong)] hover:underline">
          開啟實際商務儀表板 →
        </Link>
      </p>
    </DesignShell>
  );
}
