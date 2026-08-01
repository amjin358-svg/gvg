import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { SUPPLIER_BOARD } from "@/frontend/data/operations/content";

export const metadata: Metadata = {
  title: "供應商",
};

export default function OpsSupplierPage() {
  return (
    <OpsShell
      title="Supplier"
      titleZh="供應商"
      description="供應商評級與待回報價。入口：/portal/supplier · CRM：/crm。"
    >
      <section className="overflow-x-auto border border-[var(--color-line)] bg-white p-6">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
              <th className="py-2 pr-3">Supplier</th>
              <th className="py-2 pr-3">Region</th>
              <th className="py-2 pr-3">Score</th>
              <th className="py-2">Open quotes</th>
            </tr>
          </thead>
          <tbody>
            {SUPPLIER_BOARD.map((supplier) => (
              <tr key={supplier.name} className="border-b border-[var(--color-line)]/70">
                <td className="py-3 pr-3 font-semibold">{supplier.name}</td>
                <td className="py-3 pr-3 text-[var(--color-muted)]">{supplier.region}</td>
                <td className="py-3 pr-3">
                  <Badge tone="accent">{supplier.score}</Badge>
                </td>
                <td className="py-3">{supplier.openQuotes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
        <Link href="/portal/supplier" className="text-[var(--color-accent-strong)] hover:underline">
          供應商入口 →
        </Link>
        <Link href="/quotes" className="text-[var(--color-accent-strong)] hover:underline">
          報價 →
        </Link>
      </div>
    </OpsShell>
  );
}
