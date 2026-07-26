import type { Brand, Category, Product } from "@gvg/core";

/** Product catalog repository (seed / mock) */

const products: Product[] = [
  {
    id: "p1",
    sku: "GVG-OMEGA-1000",
    name: "Omega-3 Softgel 1000mg",
    slug: "omega-3-softgel-1000mg",
    description: "Pharmaceutical-grade fish oil softgels for global distribution.",
    categorySlug: "health-supplements",
    brandId: "b1",
    brandName: "Vista Health",
    moq: 500,
    unitPrice: 8.5,
    currency: "USD",
    originCountry: "US",
    leadTimeDays: 21,
    inStock: true,
    tags: ["health", "oem"],
  },
  {
    id: "p2",
    sku: "GVG-HEX-BIT",
    name: "Pro Torque Hex Bit Set",
    slug: "pro-torque-hex-bit-set",
    description: "Industrial hex bit set for hardware partners.",
    categorySlug: "hardware-tools",
    brandId: "b2",
    brandName: "Forge Pro",
    moq: 200,
    unitPrice: 24,
    currency: "USD",
    originCountry: "TW",
    leadTimeDays: 14,
    inStock: true,
    tags: ["tools", "b2b"],
  },
];

const categories: Category[] = [
  {
    id: "c1",
    name: "Health Supplements",
    slug: "health-supplements",
    description: "Nutraceuticals and wellness",
    productCount: 1,
  },
  {
    id: "c2",
    name: "Hardware & Tools",
    slug: "hardware-tools",
    description: "Industrial and pro tools",
    productCount: 1,
  },
];

const brands: Brand[] = [
  {
    id: "b1",
    name: "Vista Health",
    slug: "vista-health",
    country: "US",
    description: "Global nutraceutical brand",
  },
  {
    id: "b2",
    name: "Forge Pro",
    slug: "forge-pro",
    country: "TW",
    description: "Professional tools",
  },
];

const favorites = new Set<string>();

export async function listProducts(): Promise<Product[]> {
  return [...products];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function listCategories(): Promise<Category[]> {
  return [...categories];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function listBrands(): Promise<Brand[]> {
  return [...brands];
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  return brands.find((b) => b.slug === slug) ?? null;
}

export async function listFavorites(): Promise<string[]> {
  return [...favorites];
}

export async function addFavorite(productId: string): Promise<void> {
  favorites.add(productId);
}

export async function removeFavorite(productId: string): Promise<void> {
  favorites.delete(productId);
}
