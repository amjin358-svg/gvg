import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";
import { products, quotes } from "@/frontend/data/mock/catalog";
import { ROLE_LABELS } from "@/types/roles";

export const metadata: Metadata = {
  title: "Supplier Portal",
  description: "Supplier operations for catalog, quotes, and order fulfillment.",
};

export default function SupplierPortalPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 09"
        title="Supplier Portal"
        description="Catalog management, quote response, production lead times, and fulfillment visibility for suppliers."
      />
      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Catalog snapshot
            </h2>
            <ul className="mt-5 space-y-4">
              {products.slice(0, 4).map((product) => (
                <li key={product.id} className="border-b border-[var(--color-line)] pb-4">
                  <p className="font-medium">{product.name}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {product.sku} · MOQ {product.moq.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
            <Link href="/products" className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent-strong)]">
              View catalog →
            </Link>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Outstanding quotes
            </h2>
            <ul className="mt-5 space-y-4">
              {quotes.map((quote) => (
                <li key={quote.id} className="border-b border-[var(--color-line)] pb-4">
                  <p className="font-medium">{quote.supplierName}</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {quote.id} · {quote.status} · {quote.leadTimeDays}d lead
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-[var(--color-muted)]">
              Primary role: {ROLE_LABELS.supplier}. Coordinated with Sales and Purchasing.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
