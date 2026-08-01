/**
 * Backend service stubs — wire to Supabase / Edge Functions in Phase 2.
 */

export interface HealthStatus {
  status: "ok" | "degraded" | "down";
  version: string;
  checkedAt: string;
}

export function getPlatformHealth(): HealthStatus {
  return {
    status: "ok",
    version: "1.0.0",
    checkedAt: new Date().toISOString(),
  };
}
