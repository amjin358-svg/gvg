import type { Metadata } from "next";
import { DevShell } from "@/frontend/features/development/DevShell";
import { MASTER_PHASES, PROGRESS_METRICS } from "@/frontend/data/development/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "進度",
};

export default function ProgressPage() {
  return (
    <DevShell
      title="Progress"
      titleZh="進度"
      description="Phase 完成度與交付軌跡。細節 backlog：docs/026_MASTER_TASKS.md。"
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {PROGRESS_METRICS.map((metric) => (
          <article key={metric.label} className="border border-[var(--color-line)] bg-white p-5">
            <p className="text-xs font-semibold text-[var(--color-muted)]">{metric.label}</p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold">
              {metric.value}%
            </p>
            <div className="mt-3 h-1.5 bg-[var(--color-mist)]">
              <div className="h-full bg-[var(--color-navy)]" style={{ width: `${metric.value}%` }} />
            </div>
            <p className="mt-2 text-xs text-[var(--color-muted)]">{metric.hint}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {MASTER_PHASES.map((phase) => (
          <section key={phase.name} className="border border-[var(--color-line)] bg-white p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-[var(--color-navy)]">{phase.name}</h2>
              <span
                className={cn(
                  "text-xs font-semibold uppercase tracking-[0.12em]",
                  phase.status === "done" && "text-emerald-700",
                  phase.status === "next" && "text-[var(--color-gold-strong)]",
                  phase.status === "planned" && "text-[var(--color-muted)]",
                )}
              >
                {phase.status}
              </span>
            </div>
            <p className="mt-2 text-xs text-[var(--color-muted)]">
              {phase.items.length} workstreams
            </p>
          </section>
        ))}
      </div>
    </DevShell>
  );
}
