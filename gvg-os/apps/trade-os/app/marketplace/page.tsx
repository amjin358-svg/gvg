import type { Metadata } from "next";
import { MarketplaceView } from "@/frontend/features/marketplace/MarketplaceView";

export const metadata: Metadata = {
  title: "Marketplace 市集",
  description: "連結全球供應商與買方的 GVG 市集：篩選、比價、詢價一次完成。",
};

export default function MarketplacePage() {
  return <MarketplaceView />;
}
