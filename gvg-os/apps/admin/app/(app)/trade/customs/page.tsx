"use client";

import { TradeShell } from "../../../../components/TradeShell";

export default function Page() {
  return (
    <TradeShell title="Customs" titleZh="報關">
      <p style={{ color: "#64748B", maxWidth: 520 }}>
        Customs module for GVG Trade operations.
      </p>
    </TradeShell>
  );
}