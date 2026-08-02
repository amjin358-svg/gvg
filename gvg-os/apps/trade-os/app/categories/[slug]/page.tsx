import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCenterView } from "@/frontend/features/products/ProductCenterView";
import { resolveCatalogNav } from "@/frontend/data/mock/catalogNav";
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
  if (slug === "furniture") {
    return {
      title: "居家生活 / 傢俱",
      description: "精選全球傢俱品牌，適合零售、專案與跨境批發採購。",
    };
  }
  const nav = resolveCatalogNav(slug);
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

  const nav = resolveCatalogNav(slug);
  const items = products.filter((product) => product.categorySlug === category.slug);

  return (
    <ProductCenterView
      mode="listing"
      activeSlug={category.slug as ProductCategory}
      title={
        slug === "furniture" ? "居家生活 / 傢俱" : nav?.nameZh ?? category.name
      }
      description={
        slug === "furniture"
          ? "精選全球傢俱品牌，適合零售、專案與跨境批發採購。"
          : `精選優質${nav?.nameZh ?? category.name}，專業耐用，滿足全球貿易與通路需求。`
      }
      items={items}
      totalCount={nav?.count ?? items.length}
    />
  );
}
