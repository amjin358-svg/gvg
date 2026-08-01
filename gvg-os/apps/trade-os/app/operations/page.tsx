import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  Building2,
  CircleDollarSign,
  Package,
  Ship,
  ShoppingBag,
  Users,
  Warehouse,
} from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { StatusBadge } from "@/components/molecules/StatusBadge";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import {
  AI_INSIGHTS,
  CUSTOMER_BOARD,
  INVENTORY_BOARD,
  REVENUE_TODAY,
  SUPPLIER_BOARD,
  TODAY_ORDERS,
  TODAY_SHIPMENTS,
} from "@/frontend/data/operations/content";
import { warehouses } from "@/frontend/data/mock/catalog";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "營運儀表板",
};

export default function OperationsDashboardPage() {
  const avgUtil = Math.round(
    warehouses.reduce((sum, hub) => sum + hub.utilizationPct, 0) / warehouses.length,
  );

  return (
    <OpsShell
      title="Operations Dashboard"
      titleZh="營運儀表板"
      description={`${BRAND.shortName} 今日戰情：訂單、出貨、倉庫、營收、供應商、客戶、庫存與 AI 洞察。`}
    >
      {/* Today's Orders + Shipments */}
      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  Today&apos;s Orders
                </h2>
                <p className="text-xs text-[var(--color-muted)]">今日訂單</p>
              </div>
            </div>
            <Link href="/operations/orders" className="text-xs font-semibold text-[var(--color-navy)]">
              全部 →
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {TODAY_ORDERS.map((order) => (
              <li key={order.orderNumber} className="border-t border-[var(--color-line)] pt-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-xs font-semibold text-[var(--color-navy)]">
                    {order.orderNumber}
                  </p>
                  <StatusBadge status={order.status} />
                </div>
                <p className="mt-1 text-sm text-[var(--color-ink)]">
                  {order.buyer} · {order.supplier}
                </p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{order.amount}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Ship className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  Today&apos;s Shipment
                </h2>
                <p className="text-xs text-[var(--color-muted)]">今日出貨</p>
              </div>
            </div>
            <Link href="/operations/shipments" className="text-xs font-semibold text-[var(--color-navy)]">
              全部 →
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {TODAY_SHIPMENTS.map((shipment) => (
              <li key={shipment.tracking} className="border-t border-[var(--color-line)] pt-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-xs font-semibold text-[var(--color-navy)]">
                    {shipment.tracking}
                  </p>
                  <StatusBadge status={shipment.status} />
                </div>
                <p className="mt-1 text-sm text-[var(--color-ink)]">{shipment.lane}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">
                  {shipment.mode} · ETA {shipment.eta}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Warehouse + Revenue */}
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Warehouse className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  Warehouse
                </h2>
                <p className="text-xs text-[var(--color-muted)]">倉庫利用率</p>
              </div>
            </div>
            <Link href="/operations/warehouse" className="text-xs font-semibold text-[var(--color-navy)]">
              詳情 →
            </Link>
          </div>
          <p className="mt-4 text-xs text-[var(--color-muted)]">平均利用率</p>
          <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-navy)]">
            {avgUtil}%
          </p>
          <ul className="mt-4 space-y-3">
            {warehouses.map((hub) => (
              <li key={hub.id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{hub.code}</span>
                  <span className="text-[var(--color-muted)]">{hub.utilizationPct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 bg-[var(--color-mist)]">
                  <div
                    className="h-full bg-[var(--color-navy)]"
                    style={{ width: `${hub.utilizationPct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  Revenue
                </h2>
                <p className="text-xs text-[var(--color-muted)]">營收快照</p>
              </div>
            </div>
            <Link href="/operations/revenue" className="text-xs font-semibold text-[var(--color-navy)]">
              詳情 →
            </Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {REVENUE_TODAY.map((item) => (
              <div key={item.label} className="rounded-lg bg-[var(--color-mist)] p-4">
                <p className="text-xs text-[var(--color-muted)]">{item.label}</p>
                <p className="mt-2 text-xl font-semibold text-[var(--color-navy)]">{item.value}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{item.hint}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Supplier + Customer */}
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  Supplier
                </h2>
                <p className="text-xs text-[var(--color-muted)]">供應商看板</p>
              </div>
            </div>
            <Link href="/operations/supplier" className="text-xs font-semibold text-[var(--color-navy)]">
              全部 →
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {SUPPLIER_BOARD.map((supplier) => (
              <li
                key={supplier.name}
                className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-line)] pt-3 text-sm"
              >
                <span>
                  <span className="block font-semibold text-[var(--color-ink)]">{supplier.name}</span>
                  <span className="text-xs text-[var(--color-muted)]">
                    {supplier.region} · {supplier.openQuotes} open quotes
                  </span>
                </span>
                <Badge tone="accent">{supplier.score}</Badge>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  Customer
                </h2>
                <p className="text-xs text-[var(--color-muted)]">客戶看板</p>
              </div>
            </div>
            <Link href="/operations/customer" className="text-xs font-semibold text-[var(--color-navy)]">
              全部 →
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {CUSTOMER_BOARD.map((customer) => (
              <li key={customer.name} className="border-t border-[var(--color-line)] pt-3 text-sm">
                <p className="font-semibold text-[var(--color-ink)]">{customer.name}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)]">
                  {customer.type} · {customer.stage} · {customer.owner}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Inventory + AI Insight */}
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  Inventory
                </h2>
                <p className="text-xs text-[var(--color-muted)]">庫存水位</p>
              </div>
            </div>
            <Link href="/operations/inventory" className="text-xs font-semibold text-[var(--color-navy)]">
              詳情 →
            </Link>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  <th className="py-2 pr-3">SKU</th>
                  <th className="py-2 pr-3">Hub</th>
                  <th className="py-2 pr-3">Qty</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {INVENTORY_BOARD.map((row) => (
                  <tr key={row.sku} className="border-b border-[var(--color-line)]/70">
                    <td className="py-3 pr-3">
                      <span className="block font-mono text-xs font-semibold">{row.sku}</span>
                      <span className="text-xs text-[var(--color-muted)]">{row.name}</span>
                    </td>
                    <td className="py-3 pr-3 text-[var(--color-muted)]">{row.warehouse}</td>
                    <td className="py-3 pr-3">{row.qty.toLocaleString()}</td>
                    <td className="py-3">
                      <Badge
                        tone={
                          row.status === "healthy"
                            ? "success"
                            : row.status === "low"
                              ? "warning"
                              : "warning"
                        }
                      >
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  AI Insight
                </h2>
                <p className="text-xs text-[var(--color-muted)]">今日營運洞察</p>
              </div>
            </div>
            <Link href="/operations/ai-insight" className="text-xs font-semibold text-[var(--color-navy)]">
              更多 →
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {AI_INSIGHTS.map((insight) => (
              <li
                key={insight}
                className="rounded-lg border border-[var(--color-line)] bg-[var(--color-mist)] px-4 py-3 text-sm leading-relaxed text-[var(--color-ink)]"
              >
                {insight}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link href="/ai" className="font-semibold text-[var(--color-accent-strong)] hover:underline">
              開啟 AI 中心 →
            </Link>
          </p>
        </section>
      </div>
    </OpsShell>
  );
}
