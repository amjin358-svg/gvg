import type { Metadata } from "next";
import Link from "next/link";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { CRM_ACCOUNTS } from "@/frontend/data/operations/content";

export const metadata: Metadata = {
  title: "CRM",
};

export default function OpsCrmPage() {
  return (
    <OpsShell
      title="CRM"
      titleZh="CRM"
      description="帳戶、聯絡人、商機與活動。實機：/crm · 規格：docs/020_CRM.md。"
    >
      <section className="overflow-x-auto border border-[var(--color-line)] bg-white p-6">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
              <th className="py-2 pr-3">Account</th>
              <th className="py-2 pr-3">Type</th>
              <th className="py-2 pr-3">Owner</th>
              <th className="py-2">Stage</th>
            </tr>
          </thead>
          <tbody>
            {CRM_ACCOUNTS.map((account) => (
              <tr key={account.name} className="border-b border-[var(--color-line)]/70">
                <td className="py-3 pr-3 font-medium">{account.name}</td>
                <td className="py-3 pr-3 text-[var(--color-muted)]">{account.type}</td>
                <td className="py-3 pr-3 text-[var(--color-muted)]">{account.owner}</td>
                <td className="py-3">{account.stage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Workflows
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-[var(--color-muted)]">
          <li>Lead → Account</li>
          <li>Account → RFQ (Sales / Purchasing)</li>
          <li>Won quote → Order on opportunity</li>
          <li>Post-delivery follow-up</li>
        </ol>
      </section>

      <p className="mt-6 text-sm">
        <Link href="/crm" className="font-semibold text-[var(--color-accent-strong)] hover:underline">
          開啟 CRM 模組 →
        </Link>
      </p>
    </OpsShell>
  );
}
