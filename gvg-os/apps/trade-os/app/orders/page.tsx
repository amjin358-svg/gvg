import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { StatusBadge } from "@/components/molecules/StatusBadge";
import { PageHero } from "@/components/organisms/PageHero";
import { orders } from "@/frontend/data/mock/catalog";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Orders",
  description: "Track order lifecycle from confirmation through delivery.",
};

export default function OrdersPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 07"
        title="Orders"
        description="Unified order lifecycle across buyers, suppliers, warehouse, and finance roles."
      />
      <section className="py-16">
        <Container>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  <th className="py-3 pr-4 font-semibold">Order</th>
                  <th className="py-3 pr-4 font-semibold">Buyer</th>
                  <th className="py-3 pr-4 font-semibold">Supplier</th>
                  <th className="py-3 pr-4 font-semibold">Total</th>
                  <th className="py-3 pr-4 font-semibold">Created</th>
                  <th className="py-3 pr-4 font-semibold">ETA</th>
                  <th className="py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-[var(--color-line)]/70">
                    <td className="py-4 pr-4 font-medium">{order.orderNumber}</td>
                    <td className="py-4 pr-4">{order.buyerName}</td>
                    <td className="py-4 pr-4">{order.supplierName}</td>
                    <td className="py-4 pr-4">
                      {formatCurrency(order.totalAmount, order.currency)}
                    </td>
                    <td className="py-4 pr-4">{formatDate(order.createdAt)}</td>
                    <td className="py-4 pr-4">
                      {order.eta ? formatDate(order.eta) : "—"}
                    </td>
                    <td className="py-4">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  );
}
