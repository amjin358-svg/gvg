import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/molecules/StatusBadge";
import { DevShell } from "@/frontend/features/development/DevShell";
import { CURRENT_SPRINT } from "@/frontend/data/development/content";

export const metadata: Metadata = {
  title: "目前 Sprint",
};

export default function CurrentSprintPage() {
  const totalPoints = CURRENT_SPRINT.items.reduce((sum, item) => sum + item.points, 0);

  return (
    <DevShell
      title="Current Sprint"
      titleZh="目前 Sprint"
      description={`${CURRENT_SPRINT.nameZh} · ${CURRENT_SPRINT.window}。目標：${CURRENT_SPRINT.goal}`}
    >
      <section className="grid gap-3 sm:grid-cols-3">
        <div className="border-t-2 border-[var(--color-navy)] bg-white px-4 py-4">
          <p className="text-xs text-[var(--color-muted)]">Phase</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">
            {CURRENT_SPRINT.phase}
          </p>
        </div>
        <div className="border-t-2 border-[var(--color-navy)] bg-white px-4 py-4">
          <p className="text-xs text-[var(--color-muted)]">Stories</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">
            {CURRENT_SPRINT.items.length}
          </p>
        </div>
        <div className="border-t-2 border-[var(--color-navy)] bg-white px-4 py-4">
          <p className="text-xs text-[var(--color-muted)]">Points</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold">
            {totalPoints}
          </p>
        </div>
      </section>

      <section className="mt-6 overflow-x-auto border border-[var(--color-line)] bg-white p-6">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
              <th className="py-2 pr-3">Task</th>
              <th className="py-2 pr-3">Owner</th>
              <th className="py-2 pr-3">Status</th>
              <th className="py-2">Pts</th>
            </tr>
          </thead>
          <tbody>
            {CURRENT_SPRINT.items.map((item) => (
              <tr key={item.title} className="border-b border-[var(--color-line)]/70">
                <td className="py-3 pr-3 font-medium text-[var(--color-ink)]">{item.title}</td>
                <td className="py-3 pr-3 text-[var(--color-muted)]">{item.owner}</td>
                <td className="py-3 pr-3">
                  <StatusBadge status={item.status} />
                </td>
                <td className="py-3 font-mono text-xs">{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="mt-6 text-sm">
        <Link
          href="/development/master-tasks"
          className="font-semibold text-[var(--color-accent-strong)] hover:underline"
        >
          對照 Master Tasks →
        </Link>
      </p>
    </DevShell>
  );
}
