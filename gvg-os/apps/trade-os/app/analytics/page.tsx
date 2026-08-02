import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";
import { orders, rfqs, shipments, warehouses } from "@/frontend/data/mock/catalog";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Trade intelligence dashboards for operations and leadership.",
};

export default function AnalyticsPage() {
  const metrics = [
    { label: "Open RFQs", value: String(rfqs.filter((r) => r.status === "open" || r.status === "quoted").length) },
    { label: "Active orders", value: String(orders.length) },
    { label: "Shipments in motion", value: String(shipments.filter((s) => s.status !== "delivered").length) },
    {
      label: "Avg warehouse util.",
      value: `${Math.round(
        warehouses.reduce((sum, warehouse) => sum + warehouse.utilizationPct, 0) /
          warehouses.length,
      )}%`,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Module 18"
        title="Analytics"
        description="Operational KPIs spanning RFQ conversion, order velocity, freight status, and warehouse utilization."
      />
      <section className="py-16">
        <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="border-t border-[var(--color-line)] pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                {metric.label}
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--color-ink)]">
                {metric.value}
              </p>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
