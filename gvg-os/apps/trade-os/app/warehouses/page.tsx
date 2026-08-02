import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";
import { warehouses } from "@/frontend/data/mock/catalog";

export const metadata: Metadata = {
  title: "Warehouses",
  description: "GVG bonded and cross-dock warehouse network.",
};

export default function WarehousesPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 12"
        title="Warehouses"
        description="Capacity, utilization, and location intelligence across the GVG fulfillment network."
      />
      <section className="py-16">
        <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {warehouses.map((warehouse) => (
            <article key={warehouse.id} className="border-t border-[var(--color-line)] pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">
                {warehouse.code}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">
                {warehouse.name}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {warehouse.city}, {warehouse.country}
              </p>
              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[var(--color-muted)]">Capacity</dt>
                  <dd className="font-semibold">{warehouse.capacityUnits.toLocaleString()} units</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--color-muted)]">Utilization</dt>
                  <dd className="font-semibold">{warehouse.utilizationPct}%</dd>
                </div>
              </dl>
              <div className="mt-4 h-1.5 w-full bg-[var(--color-mist)]">
                <div
                  className="h-full bg-[var(--color-accent)]"
                  style={{ width: `${warehouse.utilizationPct}%` }}
                />
              </div>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
