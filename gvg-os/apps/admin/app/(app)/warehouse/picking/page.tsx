"use client";

import { WarehouseShell } from "../../../../components/WarehouseShell";

export default function Page() {
  return (
    <WarehouseShell title="Picking" titleZh="揀貨">
      <p style={{ color: "#64748B", maxWidth: 520 }}>
        Picking module for GVG Warehouse operations.
      </p>
    </WarehouseShell>
  );
}