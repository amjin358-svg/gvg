import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";
import { categories } from "@/frontend/data/mock/catalog";

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore GVG trade verticals from health supplements to OEM/ODM.",
};

export default function CategoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 03"
        title="Categories"
        description="Shop and source by vertical marketplace — each category maps to procurement, compliance, and logistics playbooks."
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group border-t border-[var(--color-line)] pt-5 transition-colors hover:border-[var(--color-accent)]"
            >
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent-strong)]">
                {category.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {category.description}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                {category.productCount} products
              </p>
            </Link>
          ))}
        </Container>
      </section>
    </>
  );
}
