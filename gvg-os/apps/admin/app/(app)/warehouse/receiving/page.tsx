"use client";

import { WarehouseShell } from "../../../../components/WarehouseShell";

export default function Page() {
  return (
    <WarehouseShell title="Receiving" titleZh="收貨">
      <p style={{ color: "#64748B", maxWidth: 520 }}>
        Receiving module for GVG Warehouse operations.
      </p>
    </WarehouseShell>
  );
}