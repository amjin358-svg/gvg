import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";
import { products, warehouses } from "@/frontend/data/mock/catalog";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Stock visibility across GVG warehouses and supplier programs.",
};

export default function InventoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 11"
        title="Inventory"
        description="SKU availability, warehouse allocation, and replenishment signals for purchasing and warehouse teams."
      />
      <section className="py-16">
        <Container>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  <th className="py-3 pr-4 font-semibold">SKU</th>
                  <th className="py-3 pr-4 font-semibold">Product</th>
                  <th className="py-3 pr-4 font-semibold">Origin</th>
                  <th className="py-3 pr-4 font-semibold">Lead time</th>
                  <th className="py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-[var(--color-line)]/70">
                    <td className="py-4 pr-4 font-medium">{product.sku}</td>
                    <td className="py-4 pr-4">{product.name}</td>
                    <td className="py-4 pr-4">{product.originCountry}</td>
                    <td className="py-4 pr-4">{product.leadTimeDays} days</td>
                    <td className="py-4">{product.inStock ? "Available" : "Made to order"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-sm text-[var(--color-muted)]">
            Network hubs: {warehouses.map((warehouse) => warehouse.code).join(" · ")}
          </p>
        </Container>
      </section>
    </>
  );
}
