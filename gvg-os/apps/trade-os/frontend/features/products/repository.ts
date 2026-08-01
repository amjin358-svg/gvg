import type { Product } from "@/types";
import { products as mockProducts } from "@/frontend/data/mock/catalog";

export interface ProductRepository {
  list(): Promise<Product[]>;
  getBySlug(slug: string): Promise<Product | null>;
  listByCategory(categorySlug: string): Promise<Product[]>;
}

export class MockProductRepository implements ProductRepository {
  async list(): Promise<Product[]> {
    return mockProducts;
  }

  async getBySlug(slug: string): Promise<Product | null> {
    return mockProducts.find((product) => product.slug === slug) ?? null;
  }

  async listByCategory(categorySlug: string): Promise<Product[]> {
    return mockProducts.filter((product) => product.categorySlug === categorySlug);
  }
}

export const productRepository: ProductRepository = new MockProductRepository();
