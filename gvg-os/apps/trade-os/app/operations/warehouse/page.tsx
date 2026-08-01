import type { Metadata } from "next";
import Link from "next/link";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { warehouses } from "@/frontend/data/mock/catalog";

export const metadata: Metadata = {
  title: "倉庫",
};

export default function OpsWarehousePage() {
  return (
    <OpsShell
      title="Warehouse"
      titleZh="倉庫"
      description="據點利用率與產能。實機：/warehouses · WMS：/operations/wms。"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {warehouses.map((hub) => (
          <article key={hub.id} className="border border-[var(--color-line)] bg-white p-5">
            <p className="font-mono text-xs text-[var(--color-gold-strong)]">{hub.code}</p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">{hub.name}</p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">
              {hub.city}, {hub.country}
            </p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-navy)]">
              {hub.utilizationPct}%
            </p>
            <div className="mt-2 h-1.5 bg-[var(--color-mist)]">
              <div className="h-full bg-[var(--color-navy)]" style={{ width: `${hub.utilizationPct}%` }} />
            </div>
            <p className="mt-2 text-xs text-[var(--color-muted)]">
              Capacity {hub.capacityUnits.toLocaleString()} units
            </p>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm">
        <Link href="/warehouses" className="font-semibold text-[var(--color-accent-strong)] hover:underline">
          開啟倉庫模組 →
        </Link>
      </p>
    </OpsShell>
  );
}
