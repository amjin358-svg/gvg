import type { Metadata } from "next";
import Link from "next/link";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { TRADE_FLOW } from "@/frontend/data/operations/content";
import { orders, rfqs, shipments } from "@/frontend/data/mock/catalog";

export const metadata: Metadata = {
  title: "貿易中心",
};

export default function OpsTradeCenterPage() {
  const openRfqs = rfqs.filter((item) => item.status === "open" || item.status === "quoted").length;
  const moving = shipments.filter((item) => item.status !== "delivered").length;

  return (
    <OpsShell
      title="Trade Center"
      titleZh="貿易中心"
      description="跨境貿易作業主幹：RFQ → Quote → Order → Logistics → Customs。實機：/trade · 規格：docs/017_GLOBAL_TRADE.md。"
    >
      <section className="grid gap-3 sm:grid-cols-3">
        <div className="border-t-2 border-[var(--color-navy)] bg-white px-4 py-4">
          <p className="text-xs text-[var(--color-muted)]">Open RFQ</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">{openRfqs}</p>
        </div>
        <div className="border-t-2 border-[var(--color-navy)] bg-white px-4 py-4">
          <p className="text-xs text-[var(--color-muted)]">Orders</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">
            {orders.length}
          </p>
        </div>
        <div className="border-t-2 border-[var(--color-navy)] bg-white px-4 py-4">
          <p className="text-xs text-[var(--color-muted)]">In motion</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">{moving}</p>
        </div>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Trade flow
        </h2>
        <ol className="mt-5 grid gap-3 sm:grid-cols-5">
          {TRADE_FLOW.map((step) => (
            <li key={step.step}>
              <Link
                href={step.href}
                className="block border border-[var(--color-line)] px-3 py-4 hover:border-[var(--color-navy)]"
              >
                <p className="text-xs text-[var(--color-gold-strong)]">{step.step}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]">{step.title}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-6 text-sm">
        <Link href="/trade" className="font-semibold text-[var(--color-accent-strong)] hover:underline">
          開啟國際貿易頁 →
        </Link>
      </p>
    </OpsShell>
  );
}
