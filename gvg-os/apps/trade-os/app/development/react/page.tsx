import type { Metadata } from "next";
import { DevShell } from "@/frontend/features/development/DevShell";
import { REACT_RULES } from "@/frontend/data/development/content";

export const metadata: Metadata = {
  title: "React",
};

export default function ReactPage() {
  return (
    <DevShell
      title="React"
      titleZh="React"
      description="React 19 + 嚴格 TypeScript。前端標準：docs/012_FRONTEND_STANDARD.md · 元件庫：docs/010_COMPONENT_LIBRARY.md。"
    >
      <section className="grid gap-4 lg:grid-cols-2">
        {REACT_RULES.map((rule) => (
          <article key={rule.title} className="border-t border-[var(--color-line)] bg-white px-5 py-4">
            <h2 className="text-sm font-semibold text-[var(--color-navy)]">{rule.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{rule.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Folder map
        </h2>
        <ul className="mt-4 space-y-2 font-mono text-xs text-[var(--color-muted)]">
          <li>components/ — atoms · molecules · organisms</li>
          <li>frontend/features/ — home · business · design · development</li>
          <li>frontend/data/ — mock + content modules</li>
          <li>hooks/ · types/ · lib/</li>
        </ul>
      </section>
    </DevShell>
  );
}
