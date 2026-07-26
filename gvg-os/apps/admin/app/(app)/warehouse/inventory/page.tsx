"use client";

import { WarehouseShell } from "../../../../components/WarehouseShell";

export default function Page() {
  return (
    <WarehouseShell title="Inventory" titleZh="庫存">
      <p style={{ color: "#64748B", maxWidth: 520 }}>
        Inventory module for GVG Warehouse operations.
      </p>
    </WarehouseShell>
  );
}