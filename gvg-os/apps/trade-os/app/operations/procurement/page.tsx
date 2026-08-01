import type { Metadata } from "next";
import Link from "next/link";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { PROCUREMENT_PROGRAMS } from "@/frontend/data/operations/content";

export const metadata: Metadata = {
  title: "採購",
};

export default function OpsProcurementPage() {
  return (
    <OpsShell
      title="Procurement"
      titleZh="採購"
      description="全球尋源、OEM／ODM 與美國代採。實機：/procurement · 規格：docs/018_SUPPLY_CHAIN.md。"
    >
      <section className="grid gap-4 sm:grid-cols-2">
        {PROCUREMENT_PROGRAMS.map((program) => (
          <article key={program.name} className="border border-[var(--color-line)] bg-white p-5">
            <p className="text-sm font-semibold text-[var(--color-navy)]">{program.name}</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{program.detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-[var(--color-navy)] p-6 text-white">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">Buyer path</h2>
        <p className="mt-3 text-sm text-white/75">
          需求定義 → 供應商短名單 → RFQ → 樣品／OEM → 訂單 → 物流結算
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/rfq" className="text-[var(--color-gold)] hover:underline">
            建立 RFQ →
          </Link>
          <Link href="/ai" className="text-white/85 hover:underline">
            AI 採購助理 →
          </Link>
        </div>
      </section>

      <p className="mt-6 text-sm">
        <Link href="/procurement" className="font-semibold text-[var(--color-accent-strong)] hover:underline">
          開啟採購模組 →
        </Link>
      </p>
    </OpsShell>
  );
}
