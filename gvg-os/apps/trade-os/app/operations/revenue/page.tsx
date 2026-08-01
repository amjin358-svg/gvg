import type { Metadata } from "next";
import Link from "next/link";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { REVENUE_TODAY } from "@/frontend/data/operations/content";

export const metadata: Metadata = {
  title: "營收",
};

export default function OpsRevenuePage() {
  return (
    <OpsShell
      title="Revenue"
      titleZh="營收"
      description="今日與本月營收快照（示範數據）。財務詳情：/finance · /operations/finance。"
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {REVENUE_TODAY.map((item) => (
          <article key={item.label} className="border-t-2 border-[var(--color-navy)] bg-white px-4 py-4">
            <p className="text-xs text-[var(--color-muted)]">{item.label}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-navy)]">
              {item.value}
            </p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">{item.hint}</p>
          </article>
        ))}
      </div>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
          Mix (demo)
        </h2>
        <ul className="mt-4 space-y-3 text-sm">
          {[
            { label: "Marketplace GMV", pct: 62 },
            { label: "Procurement services", pct: 23 },
            { label: "SaaS / platform", pct: 15 },
          ].map((row) => (
            <li key={row.label}>
              <div className="flex justify-between gap-2">
                <span>{row.label}</span>
                <span className="text-[var(--color-muted)]">{row.pct}%</span>
              </div>
              <div className="mt-1.5 h-1.5 bg-[var(--color-mist)]">
                <div className="h-full bg-[var(--color-gold)]" style={{ width: `${row.pct}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-6 text-sm">
        <Link href="/finance" className="font-semibold text-[var(--color-accent-strong)] hover:underline">
          開啟財務模組 →
        </Link>
      </p>
    </OpsShell>
  );
}
