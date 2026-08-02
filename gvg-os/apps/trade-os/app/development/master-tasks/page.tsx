import type { Metadata } from "next";
import { DevShell } from "@/frontend/features/development/DevShell";
import { MASTER_PHASES, PRIORITY_NEXT } from "@/frontend/data/development/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "主任務",
};

const STATUS_LABEL: Record<string, string> = {
  done: "Done",
  next: "Next",
  planned: "Planned",
};

export default function MasterTasksPage() {
  return (
    <DevShell
      title="Master Tasks"
      titleZh="主任務"
      description="交付 backlog 與優先順序。完整清單：docs/026_MASTER_TASKS.md。"
    >
      <div className="space-y-4">
        {MASTER_PHASES.map((phase) => (
          <section key={phase.name} className="border border-[var(--color-line)] bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
                {phase.name}
              </h2>
              <span
                className={cn(
                  "text-xs font-semibold uppercase tracking-[0.12em]",
                  phase.status === "done" && "text-emerald-700",
                  phase.status === "next" && "text-[var(--color-gold-strong)]",
                  phase.status === "planned" && "text-[var(--color-muted)]",
                )}
              >
                {STATUS_LABEL[phase.status]}
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
              {phase.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className={phase.status === "done" ? "text-emerald-700" : "text-[var(--color-line)]"}>
                    {phase.status === "done" ? "✓" : "○"}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
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
