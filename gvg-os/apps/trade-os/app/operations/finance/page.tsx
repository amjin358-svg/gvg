import type { Metadata } from "next";
import Link from "next/link";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { FINANCE_CAPABILITIES } from "@/frontend/data/operations/content";

export const metadata: Metadata = {
  title: "財務",
};

export default function OpsFinancePage() {
  return (
    <OpsShell
      title="Finance"
      titleZh="財務"
      description="訂單金額可視與發票／收款路線圖。實機：/finance · 規格：docs/023_FINANCE.md。"
    >
      <section className="grid gap-3 sm:grid-cols-3">
        <div className="border-t-2 border-[var(--color-navy)] bg-white px-4 py-4">
          <p className="text-xs text-[var(--color-muted)]">AR open (demo)</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">US$ 420k</p>
        </div>
        <div className="border-t-2 border-[var(--color-navy)] bg-white px-4 py-4">
          <p className="text-xs text-[var(--color-muted)]">Invoices</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">64</p>
        </div>
        <div className="border-t-2 border-[var(--color-navy)] bg-white px-4 py-4">
          <p className="text-xs text-[var(--color-muted)]">Past due</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">7</p>
        </div>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Capability roadmap
        </h2>
        <ul className="mt-4 space-y-3">
          {FINANCE_CAPABILITIES.map((item) => (
            <li
              key={item.name}
              className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-line)] pt-3 text-sm"
            >
              <span className="font-medium text-[var(--color-ink)]">{item.name}</span>
              <span className="text-xs text-[var(--color-muted)]">{item.phase}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
          Controls
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
          <li>· Sales 不可自行標記發票已付（需 Finance）</li>
          <li>· 金額變更需審計紀錄</li>
          <li>· 開立發票時鎖定財稅快照</li>
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
