import type { Metadata } from "next";
import { DevShell } from "@/frontend/features/development/DevShell";
import { PRD_GOALS, PRD_PERSONAS } from "@/frontend/data/development/content";

export const metadata: Metadata = {
  title: "產品需求",
};

export default function PrdPage() {
  return (
    <DevShell
      title="PRD"
      titleZh="產品需求"
      description="產品目標、非目標、角色與功能需求摘要。完整規格：docs/001_PRD.md · 願景：docs/PRODUCT_VISION.md。"
    >
      <section className="border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Goals
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-ink)]">
          {PRD_GOALS.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ol>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Personas
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {PRD_PERSONAS.map((item) => (
            <li key={item.role} className="border-t border-[var(--color-line)] pt-3">
              <p className="text-sm font-semibold text-[var(--color-ink)]">{item.role}</p>
              <p className="mt-1 text-xs text-[var(--color-muted)]">{item.need}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
            Functional (v1)
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
            <li>· Marketplace browse + product detail</li>
            <li>· RFQ → Quote → Order cycle</li>
            <li>· Inventory / warehouse / logistics / customs</li>
            <li>· AI procurement assistant</li>
          </ul>
        </div>
        <div className="border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
            Non-goals (foundation)
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
            <li>· Full ERP GL / bank reconciliation</li>
            <li>· Every-region carrier APIs</li>
            <li>· Multi-tenant white-label console</li>
            <li>· Native mobile apps (responsive web first)</li>
          </ul>
        </div>
      </section>
    </DevShell>
  );
}
