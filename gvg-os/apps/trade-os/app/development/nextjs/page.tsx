import type { Metadata } from "next";
import { DevShell } from "@/frontend/features/development/DevShell";
import { NEXT_RULES } from "@/frontend/data/development/content";

export const metadata: Metadata = {
  title: "Next.js",
};

export default function NextjsPage() {
  return (
    <DevShell
      title="Next.js"
      titleZh="Next.js"
      description="Next.js 15 App Router。架構：docs/002_SYSTEM_ARCHITECTURE.md · 資料夾：docs/004_FOLDER_STRUCTURE.md · 技術棧：docs/003_TECH_STACK.md。"
    >
      <section className="grid gap-4 lg:grid-cols-2">
        {NEXT_RULES.map((rule) => (
          <article key={rule.title} className="border-t border-[var(--color-line)] bg-white px-5 py-4">
            <h2 className="text-sm font-semibold text-[var(--color-navy)]">{rule.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{rule.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-[var(--color-navy)] p-6 text-white">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">Scripts</h2>
        <ul className="mt-4 space-y-2 font-mono text-sm text-white/80">
          <li>npm run dev</li>
          <li>npm run lint</li>
          <li>npm run test</li>
          <li>npm run build</li>
        </ul>
      </section>
    </DevShell>
  );
}
