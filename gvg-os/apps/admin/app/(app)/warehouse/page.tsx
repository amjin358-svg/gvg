"use client";

import { WAREHOUSE_MODULES } from "@gvg/plugin-warehouse";
import { WarehouseShell } from "../../../components/WarehouseShell";

export default function WarehouseHomePage() {
  return (
    <WarehouseShell title="Warehouse" titleZh="倉儲">
      <p style={{ color: "#475569", maxWidth: 560, marginBottom: 28 }}>
        Inventory, bins, barcodes, picking, packing, receiving, and shipping.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 14,
        }}
      >
        {WAREHOUSE_MODULES.map((m) => (
          <a
            key={m.id}
            href={m.href}
            style={{
              display: "block",
              padding: 20,
              borderRadius: 14,
              background: "#fff",
              border: "1px solid #E2E8F0",
              textDecoration: "none",
              color: "#0F172A",
              boxShadow: "0 1px 3px rgba(0,0,0,.06)",
            }}
          >
            <div style={{ fontWeight: 650, fontSize: 16 }}>{m.label}</div>
            <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>
              {m.labelZh}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#64748B",
                marginTop: 10,
                lineHeight: 1.45,
              }}
            >
              {m.description}
            </div>
          </a>
        ))}
      </div>
    </WarehouseShell>
  );
}
