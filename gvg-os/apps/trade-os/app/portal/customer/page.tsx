import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";
import { orders, rfqs } from "@/frontend/data/mock/catalog";
import { ROLE_LABELS } from "@/types/roles";

export const metadata: Metadata = {
  title: "Customer Portal",
  description: "Buyer workspace for RFQs, orders, and logistics visibility.",
};

export default function CustomerPortalPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 10"
        title="Customer Portal"
        description="Workspace for Customer and Business Customer roles — RFQs, quotes, orders, and shipment tracking."
      />
      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Active RFQs
            </h2>
            <ul className="mt-5 space-y-4">
              {rfqs.map((rfq) => (
                <li key={rfq.id} className="border-b border-[var(--color-line)] pb-4">
                  <p className="font-medium text-[var(--color-ink)]">{rfq.title}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {rfq.buyerName} · {rfq.status}
                  </p>
                </li>
              ))}
            </ul>
            <Link href="/rfq" className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent-strong)]">
              Manage RFQs →
            </Link>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Recent orders
            </h2>
            <ul className="mt-5 space-y-4">
              {orders.map((order) => (
                <li key={order.id} className="border-b border-[var(--color-line)] pb-4">
                  <p className="font-medium text-[var(--color-ink)]">{order.orderNumber}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {order.status} · ETA {order.eta ?? "TBD"}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-[var(--color-muted)]">
              Role access includes {ROLE_LABELS.customer} and {ROLE_LABELS.business_customer}.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
