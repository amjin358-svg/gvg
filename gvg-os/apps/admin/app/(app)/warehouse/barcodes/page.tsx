"use client";

import { WarehouseShell } from "../../../../components/WarehouseShell";

export default function Page() {
  return (
    <WarehouseShell title="Barcode" titleZh="條碼">
      <p style={{ color: "#64748B", maxWidth: 520 }}>
        Barcode module for GVG Warehouse operations.
      </p>
    </WarehouseShell>
  );
}