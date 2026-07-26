"use client";

import { WarehouseShell } from "../../../../components/WarehouseShell";

export default function Page() {
  return (
    <WarehouseShell title="Shipping" titleZh="出庫">
      <p style={{ color: "#64748B", maxWidth: 520 }}>
        Shipping module for GVG Warehouse operations.
      </p>
    </WarehouseShell>
  );
}