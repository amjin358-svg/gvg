import type { Metadata } from "next";
import Link from "next/link";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { ERP_DOMAINS } from "@/frontend/data/operations/content";

export const metadata: Metadata = {
  title: "ERP",
};

export default function OpsErpPage() {
  return (
    <OpsShell
      title="ERP"
      titleZh="ERP"
      description="Trade-ops ERP-lite，非完整總帳系統。規格：docs/019_ERP.md。"
    >
      <section className="border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          In-platform domains
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {ERP_DOMAINS.map((item) => (
            <li key={item.domain} className="border-t border-[var(--color-line)] pt-3">
              <p className="text-sm font-semibold text-[var(--color-ink)]">{item.domain}</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">{item.coverage}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Out of scope (v1)
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
          <li>· Full general ledger</li>
          <li>· Fixed assets / payroll</li>
          <li>· Complex MRP explosions</li>
        </ul>
      </section>

      <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
        <Link href="/orders" className="text-[var(--color-accent-strong)] hover:underline">
          Orders →
        </Link>
        <Link href="/products" className="text-[var(--color-accent-strong)] hover:underline">
          Products →
        </Link>
        <Link href="/finance" className="text-[var(--color-accent-strong)] hover:underline">
          Finance →
        </Link>
      </div>
    </OpsShell>
  );
}
