import type { Metadata } from "next";
import Link from "next/link";
import { DevShell } from "@/frontend/features/development/DevShell";
import { API_ENDPOINTS } from "@/frontend/data/development/content";

export const metadata: Metadata = {
  title: "API",
};

export default function ApiPage() {
  return (
    <DevShell
      title="API"
      titleZh="API"
      description="REST 合約（v1）：JSON、錯誤物件、分頁查詢參數。完整表：docs/006_API_SPEC.md。目前實作：GET /api/health。"
    >
      <section className="border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Conventions
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
          <li>· Base path：`/api`</li>
          <li>· Auth：Supabase session / Bearer</li>
          <li>· Errors：{`{ "error": { "code", "message" } }`}</li>
          <li>· Lists：`?page&pageSize&q&status`</li>
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/api/health" className="font-semibold text-[var(--color-accent-strong)] hover:underline">
            探測 /api/health →
          </Link>
        </p>
      </section>

      <section className="mt-6 overflow-x-auto border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Contracts (highlight)
        </h2>
        <table className="mt-5 w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
              <th className="py-2 pr-3">Method</th>
              <th className="py-2 pr-3">Path</th>
              <th className="py-2 pr-3">Auth</th>
              <th className="py-2">Module</th>
            </tr>
          </thead>
          <tbody>
            {API_ENDPOINTS.map((row) => (
              <tr key={`${row.method}-${row.path}`} className="border-b border-[var(--color-line)]/70">
                <td className="py-3 pr-3 font-mono text-xs font-semibold text-[var(--color-navy)]">
                  {row.method}
                </td>
                <td className="py-3 pr-3 font-mono text-xs">{row.path}</td>
                <td className="py-3 pr-3 text-[var(--color-muted)]">{row.auth}</td>
                <td className="py-3 text-[var(--color-muted)]">{row.module}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </DevShell>
  );
}
