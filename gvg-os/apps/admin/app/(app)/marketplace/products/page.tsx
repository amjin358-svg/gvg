"use client";

import { MarketplaceShell } from "../../../../components/MarketplaceShell";

export default function Page() {
  return (
    <MarketplaceShell title="Product" titleZh="產品">
      <p style={{ color: "#64748B", maxWidth: 520 }}>
        Product module for the GVG Marketplace.
      </p>
    </MarketplaceShell>
  );
}