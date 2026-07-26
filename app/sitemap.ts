import type { MetadataRoute } from "next";
import { PLATFORM_MODULES } from "@/lib/constants";
import { categories, newsArticles, products } from "@/frontend/data/mock/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://globalvistagroup.com";
  const staticRoutes = PLATFORM_MODULES.map((module) => ({
    url: `${base}${module.href === "/" ? "" : module.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: module.href === "/" ? 1 : 0.7,
  }));

  const productRoutes = products.map((product) => ({
    url: `${base}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${base}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const newsRoutes = newsArticles.map((article) => ({
    url: `${base}/news/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...newsRoutes];
}
