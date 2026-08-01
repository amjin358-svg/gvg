import type { Metadata } from "next";
import Link from "next/link";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { ANALYTICS_KPIS } from "@/frontend/data/operations/content";

export const metadata: Metadata = {
  title: "分析",
};

export default function OpsAnalyticsPage() {
  return (
    <OpsShell
      title="Analytics"
      titleZh="分析"
      description="營運 KPI 與產品分析。實機：/analytics · 規格：docs/024_ANALYTICS.md。"
    >
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {ANALYTICS_KPIS.map((kpi) => (
          <article key={kpi.label} className="border-t-2 border-[var(--color-navy)] bg-white px-4 py-4">
            <p className="text-xs text-[var(--color-muted)]">{kpi.label}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
              {kpi.value}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
            Phase 2 dashboards
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
            <li>· RFQ → Quote → Order conversion</li>
            <li>· Landed-cost variance</li>
            <li>· Supplier OTIF</li>
            <li>· Customs hold rate / GMV by corridor</li>
          </ul>
        </div>
        <div className="border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
            Monitoring stack
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
            <li>· GA4 · Microsoft Clarity</li>
            <li>· Sentry · OpenTelemetry</li>
            <li>· Search Console / Bing</li>
          </ul>
        </div>
      </section>

      <p className="mt-6 text-sm">
        <Link href="/analytics" className="font-semibold text-[var(--color-accent-strong)] hover:underline">
          開啟分析模組 →
        </Link>
      </p>
    </OpsShell>
  );
}
