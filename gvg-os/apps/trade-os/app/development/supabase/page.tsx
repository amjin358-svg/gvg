import type { Metadata } from "next";
import { DevShell } from "@/frontend/features/development/DevShell";
import { SUPABASE_SERVICES } from "@/frontend/data/development/content";

export const metadata: Metadata = {
  title: "Supabase",
};

export default function SupabasePage() {
  return (
    <DevShell
      title="Supabase"
      titleZh="Supabase"
      description="Auth、Postgres、RLS、Storage、Realtime、Edge Functions。規格：docs/014_SUPABASE.md · Auth：docs/007_AUTHENTICATION.md。"
    >
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {SUPABASE_SERVICES.map((item) => (
          <article key={item.name} className="border border-[var(--color-line)] bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--color-navy)]">{item.name}</p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">{item.use}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          RLS patterns
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
          <li>· profiles：user self read/update；admin manage</li>
          <li>· rfqs：buyer owns；invited suppliers read open</li>
          <li>· quotes：supplier owns write；buyer reads own RFQ quotes</li>
          <li>· orders：participants + privileged staff</li>
        </ul>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Env (never commit)
        </h2>
        <ul className="mt-4 space-y-1 font-mono text-xs text-[var(--color-muted)]">
          <li>NEXT_PUBLIC_SUPABASE_URL=</li>
          <li>NEXT_PUBLIC_SUPABASE_ANON_KEY=</li>
          <li>SUPABASE_SERVICE_ROLE_KEY=</li>
        </ul>
        <p className="mt-4 text-xs text-[var(--color-muted)]">
          Layout：`supabase/migrations/` · canonical：`database/schema.sql`
        </p>
      </section>
    </DevShell>
  );
}
