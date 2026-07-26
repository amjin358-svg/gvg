/**
 * @gvg/core/health/HealthIndicator
 *
 * Individual health probe for a subsystem / dependency.
 */

export type HealthStatus = "up" | "down" | "degraded" | "unknown";

export type HealthCheckResult = {
  status: HealthStatus;
  /** Optional human-readable detail */
  message?: string;
  /** Structured details (latency, version, counts, …) */
  details?: Record<string, unknown>;
  checkedAt: string;
};

export type HealthIndicator = {
  /** Unique probe id, e.g. "cache", "storage", "database" */
  id: string;
  /** Optional display name */
  name?: string;
  /** When true, a `down` result fails the overall health (default true) */
  critical?: boolean;
  check(): HealthCheckResult | Promise<HealthCheckResult>;
};

export function createHealthResult(
  status: HealthStatus,
  extras: Omit<Partial<HealthCheckResult>, "status" | "checkedAt"> = {},
): HealthCheckResult {
  return {
    status,
    message: extras.message,
    details: extras.details ? { ...extras.details } : undefined,
    checkedAt: new Date().toISOString(),
  };
}

export function defineHealthIndicator(
  input: HealthIndicator,
): HealthIndicator {
  if (!input.id?.trim()) throw new Error("HealthIndicator.id is required");
  return {
    ...input,
    id: input.id.trim(),
    critical: input.critical ?? true,
  };
}

/** Always-up probe — useful as a liveness baseline. */
export function pingIndicator(id = "ping"): HealthIndicator {
  return defineHealthIndicator({
    id,
    name: "Ping",
    critical: true,
    check: () => createHealthResult("up", { message: "ok" }),
  });
}

/** Wrap a boolean/async predicate as an indicator. */
export function predicateIndicator(
  id: string,
  predicate: () => boolean | Promise<boolean>,
  options: { name?: string; critical?: boolean; message?: string } = {},
): HealthIndicator {
  return defineHealthIndicator({
    id,
    name: options.name,
    critical: options.critical,
    async check() {
      try {
        const ok = await predicate();
        return createHealthResult(ok ? "up" : "down", {
          message: options.message ?? (ok ? "ok" : "failed"),
        });
      } catch (error) {
        return createHealthResult("down", {
          message: error instanceof Error ? error.message : String(error),
        });
      }
    },
  });
}
