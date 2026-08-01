import type { Metadata } from "next";
import { ProductCenterView } from "@/frontend/features/products/ProductCenterView";

export const metadata: Metadata = {
  title: "商品中心",
  description:
    "GVG 商品中心：保健食品、食品飲料、居家生活、五金工具、裝潢建材、品牌服飾與汽車用品。",
};

/** Product Center hub — choose a vertical, then browse listing pages. */
export default function ProductsPage() {
  return <ProductCenterView mode="hub" />;
}
