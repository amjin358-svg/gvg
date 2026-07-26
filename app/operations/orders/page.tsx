import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/molecules/StatusBadge";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { TODAY_ORDERS } from "@/frontend/data/operations/content";
import { orders } from "@/frontend/data/mock/catalog";

export const metadata: Metadata = {
  title: "今日訂單",
};

export default function OpsOrdersPage() {
  return (
    <OpsShell
      title="Today's Orders"
      titleZh="今日訂單"
      description="今日新單與進行中訂單。實機模組：/orders。"
    >
      <section className="overflow-x-auto border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Today
        </h2>
        <table className="mt-4 w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
              <th className="py-2 pr-3">Order</th>
              <th className="py-2 pr-3">Buyer</th>
              <th className="py-2 pr-3">Supplier</th>
              <th className="py-2 pr-3">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {TODAY_ORDERS.map((order) => (
              <tr key={order.orderNumber} className="border-b border-[var(--color-line)]/70">
                <td className="py-3 pr-3 font-mono text-xs font-semibold">{order.orderNumber}</td>
                <td className="py-3 pr-3">{order.buyer}</td>
                <td className="py-3 pr-3 text-[var(--color-muted)]">{order.supplier}</td>
                <td className="py-3 pr-3 font-semibold">{order.amount}</td>
                <td className="py-3">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-6 overflow-x-auto border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Active book
        </h2>
        <table className="mt-4 w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
              <th className="py-2 pr-3">Order</th>
              <th className="py-2 pr-3">Buyer</th>
              <th className="py-2 pr-3">Status</th>
              <th className="py-2">ETA</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-[var(--color-line)]/70">
                <td className="py-3 pr-3 font-mono text-xs font-semibold">{order.orderNumber}</td>
                <td className="py-3 pr-3">{order.buyerName}</td>
                <td className="py-3 pr-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="py-3 text-[var(--color-muted)]">{order.eta ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="mt-6 text-sm">
        <Link href="/orders" className="font-semibold text-[var(--color-accent-strong)] hover:underline">
          開啟訂單模組 →
        </Link>
      </p>
    </OpsShell>
  );
}
