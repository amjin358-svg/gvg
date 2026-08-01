import type { Metadata } from "next";
import Link from "next/link";
import {
  Boxes,
  Database,
  Gauge,
  ListTodo,
  Rocket,
  Server,
  SquareKanban,
} from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { StatusBadge } from "@/components/molecules/StatusBadge";
import { DevShell } from "@/frontend/features/development/DevShell";
import {
  API_STATUS,
  COMPONENT_INVENTORY,
  CURRENT_SPRINT,
  CURSOR_TASKS,
  DB_STATUS,
  DEPLOY_STATUS,
  PROGRESS_METRICS,
} from "@/frontend/data/development/content";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "開發儀表板",
};

function toneForDeploy(status: string): "success" | "warning" | "info" | "neutral" | "accent" {
  if (status === "live") return "success";
  if (status === "ready") return "accent";
  if (status === "pending") return "warning";
  return "neutral";
}

export default function DevelopmentDashboardPage() {
  const sprintTotal = CURRENT_SPRINT.items.length;
  const sprintStarted = CURRENT_SPRINT.items.filter((item) => item.status === "in_progress").length;
  const sprintPct = Math.max(
    8,
    Math.round(((sprintStarted * 0.5) / sprintTotal) * 100),
  );

  return (
    <DevShell
      title="Development Dashboard"
      titleZh="開發儀表板"
      description={`${BRAND.shortName} 工程戰情室：目前 Sprint、進度、Cursor 任務、API、資料庫、元件與部署狀態。`}
    >
      {/* Current Sprint */}
      <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--color-navy)] text-white">
              <SquareKanban className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
                Current Sprint
              </h2>
              <p className="text-xs text-[var(--color-muted)]">目前 Sprint</p>
            </div>
          </div>
          <Link href="/development/sprint" className="text-xs font-semibold text-[var(--color-navy)]">
            完整看板 →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold text-[var(--color-ink)]">{CURRENT_SPRINT.nameZh}</p>
            <p className="mt-1 text-xs text-[var(--color-gold-strong)]">{CURRENT_SPRINT.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{CURRENT_SPRINT.goal}</p>
            <p className="mt-2 text-xs text-[var(--color-muted)]">
              {CURRENT_SPRINT.phase} · {CURRENT_SPRINT.window}
            </p>
          </div>
          <div className="rounded-lg bg-[var(--color-mist)] p-4">
            <p className="text-xs text-[var(--color-muted)]">Sprint completion</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-navy)]">
              {sprintPct}%
            </p>
            <div className="mt-3 h-1.5 bg-white">
              <div className="h-full bg-[var(--color-navy)]" style={{ width: `${sprintPct}%` }} />
            </div>
            <p className="mt-2 text-xs text-[var(--color-muted)]">
              {sprintStarted}/{sprintTotal} in progress · early Phase 1
            </p>
          </div>
        </div>
        <ul className="mt-5 space-y-2">
          {CURRENT_SPRINT.items.slice(0, 4).map((item) => (
            <li
              key={item.title}
              className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-line)] pt-3 text-sm"
            >
              <span className="font-medium text-[var(--color-ink)]">{item.title}</span>
              <span className="flex items-center gap-2">
                <span className="text-xs text-[var(--color-muted)]">{item.owner}</span>
                <StatusBadge status={item.status} />
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Progress */}
      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-[var(--color-navy)]" />
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
                Progress
              </h2>
              <p className="text-xs text-[var(--color-muted)]">整體進度</p>
            </div>
          </div>
          <Link href="/development/progress" className="text-xs font-semibold text-[var(--color-navy)]">
            詳情 →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {PROGRESS_METRICS.map((metric) => (
            <article key={metric.label} className="border border-[var(--color-line)] bg-white p-5">
              <p className="text-xs font-semibold text-[var(--color-muted)]">{metric.label}</p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-ink)]">
                {metric.value}%
              </p>
              <div className="mt-3 h-1.5 bg-[var(--color-mist)]">
                <div
                  className="h-full bg-[var(--color-navy)]"
                  style={{ width: `${metric.value}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-[var(--color-muted)]">{metric.hint}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-4 xl:grid-cols-2">
        {/* Cursor Tasks */}
        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  Cursor Tasks
                </h2>
                <p className="text-xs text-[var(--color-muted)]">依 Rules 驅動的下一步</p>
              </div>
            </div>
            <Link href="/development/cursor-tasks" className="text-xs font-semibold text-[var(--color-navy)]">
              全部 →
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {CURSOR_TASKS.slice(0, 4).map((task) => (
              <li key={task.title} className="border-t border-[var(--color-line)] pt-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[var(--color-ink)]">{task.title}</p>
                  <Badge tone="warning">{task.status}</Badge>
                </div>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{task.detail}</p>
                <p className="mt-1 font-mono text-[11px] text-[var(--color-gold-strong)]">{task.rule}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* API */}
        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">API</h2>
                <p className="text-xs text-[var(--color-muted)]">合約實作狀態</p>
              </div>
            </div>
            <Link href="/development/api" className="text-xs font-semibold text-[var(--color-navy)]">
              規格 →
            </Link>
          </div>
          <ul className="mt-5 space-y-2">
            {API_STATUS.map((row) => (
              <li
                key={row.path}
                className="flex items-center justify-between gap-2 border-t border-[var(--color-line)] pt-2 text-sm"
              >
                <span>
                  <span className="font-mono text-xs font-semibold text-[var(--color-navy)]">{row.method}</span>
                  <span className="ml-2 font-mono text-xs text-[var(--color-ink)]">{row.path}</span>
                </span>
                <Badge
                  tone={
                    row.status === "live"
                      ? "success"
                      : row.status === "demo"
                        ? "accent"
                        : "neutral"
                  }
                >
                  {row.status}
                </Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        {/* Database */}
        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  Database
                </h2>
                <p className="text-xs text-[var(--color-muted)]">Schema · migrations · RLS</p>
              </div>
            </div>
            <Link href="/development/database" className="text-xs font-semibold text-[var(--color-navy)]">
              詳情 →
            </Link>
          </div>
          <ul className="mt-5 space-y-3">
            {DB_STATUS.map((item) => (
              <li key={item.name} className="border-t border-[var(--color-line)] pt-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-xs font-semibold text-[var(--color-ink)]">{item.name}</p>
                  <Badge
                    tone={
                      item.status === "ready"
                        ? "success"
                        : item.status === "pending"
                          ? "warning"
                          : "neutral"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-[var(--color-muted)]">{item.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Components */}
        <section className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Boxes className="h-5 w-5 text-[var(--color-navy)]" />
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  Components
                </h2>
                <p className="text-xs text-[var(--color-muted)]">UI 元件盤點</p>
              </div>
            </div>
            <Link href="/development/components" className="text-xs font-semibold text-[var(--color-navy)]">
              清單 →
            </Link>
          </div>
          <ul className="mt-5 space-y-2">
            {COMPONENT_INVENTORY.slice(0, 6).map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between gap-2 border-t border-[var(--color-line)] pt-2 text-sm"
              >
                <span>
                  <span className="font-semibold text-[var(--color-ink)]">{item.name}</span>
                  <span className="mt-0.5 block font-mono text-[11px] text-[var(--color-muted)]">
                    {item.path}
                  </span>
                </span>
                <Badge tone={item.status === "stable" ? "success" : "neutral"}>{item.status}</Badge>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Deployment */}
      <section className="mt-4 rounded-xl border border-[var(--color-line)] bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-[var(--color-navy)]" />
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                Deployment
              </h2>
              <p className="text-xs text-[var(--color-muted)]">CI · Docker · Cloudflare · Staging</p>
            </div>
          </div>
          <Link href="/development/deploy" className="text-xs font-semibold text-[var(--color-navy)]">
            部署手冊 →
          </Link>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {DEPLOY_STATUS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "border border-[var(--color-line)] px-4 py-3 hover:border-[var(--color-navy)]",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-[var(--color-ink)]">{item.name}</p>
                <Badge tone={toneForDeploy(item.status)}>{item.status}</Badge>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </DevShell>
  );
}
