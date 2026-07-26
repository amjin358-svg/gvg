import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { INVENTORY_BOARD } from "@/frontend/data/operations/content";

export const metadata: Metadata = {
  title: "庫存",
};

export default function OpsInventoryPage() {
  return (
    <OpsShell
      title="Inventory"
      titleZh="庫存"
      description="SKU × 倉庫水位（示範）。實機：/inventory。"
    >
      <section className="overflow-x-auto border border-[var(--color-line)] bg-white p-6">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
              <th className="py-2 pr-3">SKU</th>
              <th className="py-2 pr-3">Product</th>
              <th className="py-2 pr-3">Warehouse</th>
              <th className="py-2 pr-3">Qty</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {INVENTORY_BOARD.map((row) => (
              <tr key={row.sku} className="border-b border-[var(--color-line)]/70">
                <td className="py-3 pr-3 font-mono text-xs font-semibold">{row.sku}</td>
                <td className="py-3 pr-3">{row.name}</td>
                <td className="py-3 pr-3 text-[var(--color-muted)]">{row.warehouse}</td>
                <td className="py-3 pr-3">{row.qty.toLocaleString()}</td>
                <td className="py-3">
                  <Badge
                    tone={
                      row.status === "healthy" ? "success" : row.status === "low" ? "warning" : "warning"
                    }
                  >
                    {row.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="mt-6 text-sm">
        <Link href="/inventory" className="font-semibold text-[var(--color-accent-strong)] hover:underline">
          開啟庫存模組 →
        </Link>
      </p>
    </OpsShell>
  );
}
