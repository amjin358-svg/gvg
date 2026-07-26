import type { Product } from "@gvg/core";
import { formatMoney } from "@gvg/core";

/** Presentational helpers for marketplace UI hosts */

export function ProductCardModel(product: Product) {
  return {
    title: product.name,
    subtitle: product.brandName,
    price: formatMoney(product.unitPrice, product.currency),
    href: `/products/${product.slug}`,
    moq: product.moq,
    inStock: product.inStock,
  };
}

export type ProductCardView = ReturnType<typeof ProductCardModel>;
