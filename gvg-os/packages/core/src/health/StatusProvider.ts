/**
 * @gvg/core/health/StatusProvider
 *
 * Aggregates component statuses into a process / readiness snapshot.
 */

import type { HealthCheckResult, HealthStatus } from "./HealthIndicator";

export type ComponentStatus = {
  id: string;
  name?: string;
  critical: boolean;
  result: HealthCheckResult;
};

export type SystemStatus = {
  status: HealthStatus;
  components: ComponentStatus[];
  checkedAt: string;
  /** True when all critical components are up (degraded allowed for non-critical) */
  ready: boolean;
  /** True when process is alive (at least one check ran without crash) */
  live: boolean;
};

export interface StatusProvider {
  getStatus(): SystemStatus | Promise<SystemStatus>;
}

export function aggregateStatus(
  components: ComponentStatus[],
): HealthStatus {
  if (components.length === 0) return "unknown";

  const critical = components.filter((c) => c.critical);
  const pool = critical.length > 0 ? critical : components;

  if (pool.some((c) => c.result.status === "down")) return "down";
  if (
    components.some(
      (c) =>
        c.result.status === "degraded" || c.result.status === "unknown",
    )
  ) {
    return "degraded";
  }
  if (pool.every((c) => c.result.status === "up")) return "up";
  return "degraded";
}

export function buildSystemStatus(
  components: ComponentStatus[],
): SystemStatus {
  const status = aggregateStatus(components);
  const criticalDown = components.some(
    (c) => c.critical && c.result.status === "down",
  );
  return {
    status,
    components,
    checkedAt: new Date().toISOString(),
    ready: !criticalDown && status !== "down",
    live: true,
  };
}

export class StaticStatusProvider implements StatusProvider {
  constructor(private readonly status: SystemStatus) {}

  getStatus(): SystemStatus {
    return {
      ...this.status,
      components: this.status.components.map((c) => ({
        ...c,
        result: { ...c.result, details: c.result.details ? { ...c.result.details } : undefined },
      })),
    };
  }
}
