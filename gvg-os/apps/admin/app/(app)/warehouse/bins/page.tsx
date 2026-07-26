"use client";

import { WarehouseShell } from "../../../../components/WarehouseShell";

export default function Page() {
  return (
    <WarehouseShell title="Bin" titleZh="儲位">
      <p style={{ color: "#64748B", maxWidth: 520 }}>
        Bin module for GVG Warehouse operations.
      </p>
    </WarehouseShell>
  );
}