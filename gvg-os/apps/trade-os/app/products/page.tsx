import type { Metadata } from "next";
import { ProductCenterView } from "@/frontend/features/products/ProductCenterView";

export const metadata: Metadata = {
  title: "商品中心",
  description: "GVG 全球商品中心：保健食品、五金工具、居家生活、品牌服飾與裝潢建材。",
};

export default function ProductsPage() {
  return (
    <ProductCenterView
      title="商品中心"
      description="精選全球優質商品，支援批發、OEM 與跨境貿易採購。"
    />
  );
}
