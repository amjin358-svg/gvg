import type { Metadata } from "next";
import Link from "next/link";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { CUSTOMER_BOARD } from "@/frontend/data/operations/content";

export const metadata: Metadata = {
  title: "客戶",
};

export default function OpsCustomerPage() {
  return (
    <OpsShell
      title="Customer"
      titleZh="客戶"
      description="客戶與商機階段。入口：/portal/customer · CRM：/operations/crm。"
    >
      <section className="overflow-x-auto border border-[var(--color-line)] bg-white p-6">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
              <th className="py-2 pr-3">Customer</th>
              <th className="py-2 pr-3">Type</th>
              <th className="py-2 pr-3">Stage</th>
              <th className="py-2">Owner</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMER_BOARD.map((customer) => (
              <tr key={customer.name} className="border-b border-[var(--color-line)]/70">
                <td className="py-3 pr-3 font-semibold">{customer.name}</td>
                <td className="py-3 pr-3 text-[var(--color-muted)]">{customer.type}</td>
                <td className="py-3 pr-3">{customer.stage}</td>
                <td className="py-3 text-[var(--color-muted)]">{customer.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
        <Link href="/portal/customer" className="text-[var(--color-accent-strong)] hover:underline">
          客戶入口 →
        </Link>
        <Link href="/crm" className="text-[var(--color-accent-strong)] hover:underline">
          CRM →
        </Link>
      </div>
    </OpsShell>
  );
}
