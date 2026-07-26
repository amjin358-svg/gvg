"use client";

import { MarketplaceShell } from "../../../../components/MarketplaceShell";

export default function Page() {
  return (
    <MarketplaceShell title="Favorite" titleZh="收藏">
      <p style={{ color: "#64748B", maxWidth: 520 }}>
        Favorite module for the GVG Marketplace.
      </p>
    </MarketplaceShell>
  );
}