import type { Metadata } from "next";
import { BusinessShell } from "@/frontend/features/business/BusinessShell";
import { ROADMAP_PHASES } from "@/frontend/data/business/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "產品路線圖" };

export default function RoadmapPage() {
  return (
    <BusinessShell
      title="Roadmap"
      titleZh="產品路線圖"
      description="Phase 0–3 交付節奏，對齊工程 docs/026_MASTER_TASKS.md。"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {ROADMAP_PHASES.map((phase) => (
          <article
            key={phase.phase}
            className="rounded-xl border border-[var(--color-line)] bg-white p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
                {phase.phase} · {phase.title}
              </h2>
              <span
                className={cn(
                  "rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
                  phase.status === "done" && "bg-emerald-100 text-emerald-800",
                  phase.status === "next" && "bg-amber-100 text-amber-900",
                  phase.status === "planned" && "bg-[var(--color-mist)] text-[var(--color-muted)]",
                )}
              >
                {phase.status}
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
              {phase.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </BusinessShell>
  );
}
