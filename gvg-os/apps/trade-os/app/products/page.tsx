import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ProductCard } from "@/components/molecules/ProductCard";
import { PageHero } from "@/components/organisms/PageHero";
import { products } from "@/frontend/data/mock/catalog";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse the GVG global product catalog across trade verticals.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 02"
        title="Products"
        description="Search and quote from a multi-vertical catalog with MOQ, lead time, origin, and compliance tags."
      />
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Global catalog"
            description={`${products.length} featured SKUs in this demo dataset.`}
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
