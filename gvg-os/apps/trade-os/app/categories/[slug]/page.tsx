import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCenterView } from "@/frontend/features/products/ProductCenterView";
import { CATALOG_NAV } from "@/frontend/data/mock/catalogNav";
import { categories, products } from "@/frontend/data/mock/catalog";
import type { ProductCategory } from "@/types";

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
  const nav = CATALOG_NAV.find((item) => item.slug === slug);
  const category = categories.find((item) => item.slug === slug);
  if (!category) return { title: "Category" };
  return {
    title: nav?.nameZh ?? category.name,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const nav = CATALOG_NAV.find((item) => item.slug === slug);
  const items = products.filter((product) => product.categorySlug === category.slug);

  return (
    <ProductCenterView
      activeSlug={category.slug as ProductCategory}
      title={nav?.nameZh ?? category.name}
      description={
        nav
          ? `精選優質${nav.nameZh}，專業耐用，滿足全球貿易與通路需求。`
          : category.description
      }
      items={items}
      totalCount={nav?.count ?? items.length}
    />
  );
}
