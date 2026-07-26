import type { Brand, Category, Product } from "@gvg/core";
import {
  getBrandBySlug,
  getCategoryBySlug,
  getProductBySlug,
  listBrands,
  listCategories,
  listFavorites,
  listProducts,
} from "./repository";

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  const products = await listProducts();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  );
}

export async function getCatalogHome(): Promise<{
  products: Product[];
  categories: Category[];
  brands: Brand[];
}> {
  const [products, categories, brands] = await Promise.all([
    listProducts(),
    listCategories(),
    listBrands(),
  ]);
  return { products, categories, brands };
}

export async function getProductPage(slug: string): Promise<Product | null> {
  return getProductBySlug(slug);
}

export async function getCategoryPage(slug: string): Promise<Category | null> {
  return getCategoryBySlug(slug);
}

export async function getBrandPage(slug: string): Promise<Brand | null> {
  return getBrandBySlug(slug);
}

export async function getFavoritesPage() {
  const [ids, products] = await Promise.all([listFavorites(), listProducts()]);
  return {
    favorites: products.filter((p) => ids.includes(p.id)),
  };
}
