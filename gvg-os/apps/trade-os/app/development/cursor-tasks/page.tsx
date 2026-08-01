import type { Metadata } from "next";
import { Badge } from "@/components/atoms/Badge";
import { DevShell } from "@/frontend/features/development/DevShell";
import { CURSOR_TASKS, PRIORITY_NEXT } from "@/frontend/data/development/content";

export const metadata: Metadata = {
  title: "Cursor 任務",
};

export default function CursorTasksPage() {
  return (
    <DevShell
      title="Cursor Tasks"
      titleZh="Cursor 任務"
      description="給 Cursor Agent 的可執行任務，對齊 `.cursor/rules/` 與 Phase 1 優先順序。"
    >
      <div className="space-y-3">
        {CURSOR_TASKS.map((task, index) => (
          <article key={task.title} className="border border-[var(--color-line)] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-[var(--color-ink)]">
                <span className="mr-2 text-[var(--color-gold-strong)]">{index + 1}.</span>
                {task.title}
              </p>
              <div className="flex items-center gap-2">
                <Badge tone="info">{task.area}</Badge>
                <Badge tone="warning">{task.status}</Badge>
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{task.detail}</p>
            <p className="mt-2 font-mono text-xs text-[var(--color-navy)]">{task.rule}</p>
          </article>
        ))}
      </div>

      <section className="mt-8 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Priority — next 10
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-[var(--color-ink)]">
          {PRIORITY_NEXT.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </DevShell>
  );
}
