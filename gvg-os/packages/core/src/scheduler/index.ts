/**
 * @gvg/core/scheduler — 排程服務
 */

export type ScheduleStatus = "scheduled" | "running" | "completed" | "failed" | "cancelled";

export type ScheduledJob = {
  id: string;
  name: string;
  /** ISO timestamp when the job should run */
  runAt: string;
  /** Optional cron-like expression (stored; not evaluated in-memory) */
  cron?: string;
  status: ScheduleStatus;
  payload?: Record<string, unknown>;
  attempts: number;
  lastError?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
};

export type JobHandler = (job: ScheduledJob) => Promise<void> | void;

const jobs = new Map<string, ScheduledJob>();
const handlers = new Map<string, JobHandler>();

export function registerJobHandler(name: string, handler: JobHandler): void {
  handlers.set(name, handler);
}

export function scheduleJob(input: {
  name: string;
  runAt: string | Date;
  cron?: string;
  payload?: Record<string, unknown>;
}): ScheduledJob {
  const now = new Date().toISOString();
  const job: ScheduledJob = {
    id: crypto.randomUUID(),
    name: input.name,
    runAt:
      typeof input.runAt === "string" ? input.runAt : input.runAt.toISOString(),
    cron: input.cron,
    status: "scheduled",
    payload: input.payload,
    attempts: 0,
    createdAt: now,
    updatedAt: now,
  };
  jobs.set(job.id, job);
  return job;
}

export function getJob(id: string): ScheduledJob | undefined {
  return jobs.get(id);
}

export function listJobs(filter?: {
  name?: string;
  status?: ScheduleStatus;
}): ScheduledJob[] {
  let out = Array.from(jobs.values());
  if (filter?.name) out = out.filter((j) => j.name === filter.name);
  if (filter?.status) out = out.filter((j) => j.status === filter.status);
  return out.sort((a, b) => a.runAt.localeCompare(b.runAt));
}

export function cancelJob(id: string): ScheduledJob | null {
  const job = jobs.get(id);
  if (!job) return null;
  if (job.status === "completed" || job.status === "cancelled") return job;
  job.status = "cancelled";
  job.updatedAt = new Date().toISOString();
  return job;
}

/** Run due jobs whose runAt <= now. */
export async function tickScheduler(now = new Date()): Promise<ScheduledJob[]> {
  const due = listJobs({ status: "scheduled" }).filter(
    (j) => new Date(j.runAt).getTime() <= now.getTime(),
  );
  const ran: ScheduledJob[] = [];

  for (const job of due) {
    job.status = "running";
    job.attempts += 1;
    job.updatedAt = now.toISOString();
    const handler = handlers.get(job.name);
    try {
      if (handler) await handler(job);
      job.status = "completed";
      job.completedAt = now.toISOString();
    } catch (err) {
      job.status = "failed";
      job.lastError = err instanceof Error ? err.message : String(err);
    }
    job.updatedAt = now.toISOString();
    ran.push(job);
  }

  return ran;
}

export function clearScheduler(): void {
  jobs.clear();
  handlers.clear();
}

export class Scheduler {
  static register = registerJobHandler;
  static schedule = scheduleJob;
  static get = getJob;
  static list = listJobs;
  static cancel = cancelJob;
  static tick = tickScheduler;
  static clear = clearScheduler;
}
