"use client";

import { MarketplaceShell } from "../../../../components/MarketplaceShell";

export default function Page() {
  return (
    <MarketplaceShell title="RFQ" titleZh="詢價">
      <p style={{ color: "#64748B", maxWidth: 520 }}>
        RFQ module for the GVG Marketplace.
      </p>
    </MarketplaceShell>
  );
}