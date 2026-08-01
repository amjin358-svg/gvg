import type { Metadata } from "next";
import Link from "next/link";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { WMS_PROCESSES } from "@/frontend/data/operations/content";
import { warehouses } from "@/frontend/data/mock/catalog";

export const metadata: Metadata = {
  title: "WMS",
};

export default function OpsWmsPage() {
  return (
    <OpsShell
      title="WMS"
      titleZh="WMS"
      description="倉庫與庫存作業。實機：/warehouses · /inventory · 規格：docs/021_WMS.md。"
    >
      <section className="overflow-x-auto border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Warehouse hubs
        </h2>
        <table className="mt-4 w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
              <th className="py-2 pr-3">Code</th>
              <th className="py-2 pr-3">Name</th>
              <th className="py-2 pr-3">Location</th>
              <th className="py-2">Util.</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.slice(0, 6).map((hub) => (
              <tr key={hub.id} className="border-b border-[var(--color-line)]/70">
                <td className="py-3 pr-3 font-mono text-xs">{hub.code}</td>
                <td className="py-3 pr-3 font-medium">{hub.name}</td>
                <td className="py-3 pr-3 text-[var(--color-muted)]">
                  {hub.city}, {hub.country}
                </td>
                <td className="py-3">{hub.utilizationPct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {WMS_PROCESSES.map((process) => (
          <article key={process.name} className="border-t border-[var(--color-line)] bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--color-navy)]">{process.name}</p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">{process.detail}</p>
          </article>
        ))}
      </section>

      <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
        <Link href="/warehouses" className="text-[var(--color-accent-strong)] hover:underline">
          Warehouses →
        </Link>
        <Link href="/inventory" className="text-[var(--color-accent-strong)] hover:underline">
          Inventory →
        </Link>
      </div>
    </OpsShell>
  );
}
