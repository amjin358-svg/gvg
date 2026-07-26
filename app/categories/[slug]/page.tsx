import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/atoms/Container";
import { ProductCard } from "@/components/molecules/ProductCard";
import { PageHero } from "@/components/organisms/PageHero";
import { categories, products } from "@/frontend/data/mock/catalog";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return { title: "Category" };
  return { title: category.name, description: category.description };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const items = products.filter((product) => product.categorySlug === category.slug);

  return (
    <>
      <PageHero eyebrow="Category" title={category.name} description={category.description} />
      <section className="py-16">
        <Container>
          {items.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-[var(--color-muted)]">
              No demo products in this category yet. Browse the full catalog or open an RFQ.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
