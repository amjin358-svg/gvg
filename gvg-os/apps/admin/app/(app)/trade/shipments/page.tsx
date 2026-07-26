"use client";

import { TradeShell } from "../../../../components/TradeShell";

export default function Page() {
  return (
    <TradeShell title="Shipment" titleZh="出貨">
      <p style={{ color: "#64748B", maxWidth: 520 }}>
        Shipment module for GVG Trade operations.
      </p>
    </TradeShell>
  );
}