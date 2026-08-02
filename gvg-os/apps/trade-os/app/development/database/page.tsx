import type { Metadata } from "next";
import { DevShell } from "@/frontend/features/development/DevShell";
import { DB_ENTITIES } from "@/frontend/data/development/content";

export const metadata: Metadata = {
  title: "資料庫",
};

export default function DatabasePage() {
  return (
    <DevShell
      title="Database"
      titleZh="資料庫"
      description="PostgreSQL via Supabase。Canonical SQL：database/schema.sql；版本化遷移：supabase/migrations/。規格：docs/005_DATABASE_SCHEMA.md。"
    >
      <section className="border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Principles
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
          <li>· UUID primary keys</li>
          <li>· Soft status enums as TEXT with app-level unions</li>
          <li>· RLS on all tenant/user tables</li>
          <li>· Migrations through Supabase CLI</li>
        </ul>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Core entities
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {DB_ENTITIES.map((entity) => (
            <li key={entity.name} className="border-t border-[var(--color-line)] pt-3">
              <p className="font-mono text-sm font-semibold text-[var(--color-navy)]">{entity.name}</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">{entity.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-[var(--color-navy)] p-6 text-white">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">Trade cycle tables</h2>
        <p className="mt-3 font-mono text-sm text-[var(--color-gold)]">
          rfqs → quotes → orders → shipments / customs_documents
        </p>
        <p className="mt-3 text-sm text-white/70">
          Status examples: RFQ open|quoted|awarded · Order pending|in_transit|customs|delivered
        </p>
      </section>
    </DevShell>
  );
}
