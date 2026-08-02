import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/molecules/StatusBadge";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { TODAY_SHIPMENTS } from "@/frontend/data/operations/content";
import { shipments } from "@/frontend/data/mock/catalog";

export const metadata: Metadata = {
  title: "今日出貨",
};

export default function OpsShipmentsPage() {
  return (
    <OpsShell
      title="Today's Shipment"
      titleZh="今日出貨"
      description="在途、預訂與報關滞留貨況。實機：/logistics。"
    >
      <section className="overflow-x-auto border border-[var(--color-line)] bg-white p-6">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
              <th className="py-2 pr-3">Tracking</th>
              <th className="py-2 pr-3">Lane</th>
              <th className="py-2 pr-3">Mode</th>
              <th className="py-2 pr-3">ETA</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {TODAY_SHIPMENTS.map((shipment) => (
              <tr key={shipment.tracking} className="border-b border-[var(--color-line)]/70">
                <td className="py-3 pr-3 font-mono text-xs font-semibold">{shipment.tracking}</td>
                <td className="py-3 pr-3">{shipment.lane}</td>
                <td className="py-3 pr-3 text-[var(--color-muted)]">{shipment.mode}</td>
                <td className="py-3 pr-3 text-[var(--color-muted)]">{shipment.eta}</td>
                <td className="py-3">
                  <StatusBadge status={shipment.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
          Network snapshot
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
          {shipments.map((item) => (
            <li key={item.id} className="flex flex-wrap justify-between gap-2 border-t border-[var(--color-line)] pt-2">
              <span className="font-mono text-xs text-[var(--color-ink)]">{item.trackingNumber}</span>
              <span>
                {item.origin} → {item.destination}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-6 text-sm">
        <Link href="/logistics" className="font-semibold text-[var(--color-accent-strong)] hover:underline">
          開啟物流模組 →
        </Link>
      </p>
    </OpsShell>
  );
}
