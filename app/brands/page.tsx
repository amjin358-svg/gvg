import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";
import { brands } from "@/frontend/data/mock/catalog";

export const metadata: Metadata = {
  title: "Brands",
  description: "Trusted manufacturers and private-label partners on GVG Trade OS.",
};

export default function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 04"
        title="Brands"
        description="Manufacturer brands and OEM partners with country-of-origin and certification context."
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 sm:grid-cols-2">
          {brands.map((brand) => (
            <article
              key={brand.id}
              className="border-t border-[var(--color-line)] pt-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">
                {brand.country}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
                {brand.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {brand.description}
              </p>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
