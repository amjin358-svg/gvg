"use client";

import { TradeShell } from "../../../../components/TradeShell";

export default function Page() {
  return (
    <TradeShell title="PO" titleZh="採購單">
      <p style={{ color: "#64748B", maxWidth: 520 }}>
        PO module for GVG Trade operations.
      </p>
    </TradeShell>
  );
}