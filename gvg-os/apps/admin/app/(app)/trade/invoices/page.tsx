"use client";

import { TradeShell } from "../../../../components/TradeShell";

export default function Page() {
  return (
    <TradeShell title="Invoice" titleZh="發票">
      <p style={{ color: "#64748B", maxWidth: 520 }}>
        Invoice module for GVG Trade operations.
      </p>
    </TradeShell>
  );
}