/**
 * @gvg/core/health — HealthService · HealthIndicator · StatusProvider
 */

export {
  createHealthResult,
  defineHealthIndicator,
  pingIndicator,
  predicateIndicator,
} from "./HealthIndicator";
export type {
  HealthStatus,
  HealthCheckResult,
  HealthIndicator,
} from "./HealthIndicator";

export {
  aggregateStatus,
  buildSystemStatus,
  StaticStatusProvider,
} from "./StatusProvider";
export type {
  ComponentStatus,
  SystemStatus,
  StatusProvider,
} from "./StatusProvider";

export {
  HealthService,
  getHealthService,
  setHealthService,
  resetHealthService,
  createHealthService,
} from "./HealthService";
export type { HealthServiceOptions } from "./HealthService";
