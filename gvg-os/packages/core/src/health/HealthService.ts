/**
 * @gvg/core/health/HealthService
 *
 * Register indicators → check liveness / readiness → expose StatusProvider.
 */

import {
  defineHealthIndicator,
  pingIndicator,
  type HealthIndicator,
} from "./HealthIndicator";
import {
  buildSystemStatus,
  type ComponentStatus,
  type StatusProvider,
  type SystemStatus,
} from "./StatusProvider";

export type HealthServiceOptions = {
  /** Include default ping indicator (default true) */
  includePing?: boolean;
};

export class HealthService implements StatusProvider {
  private readonly indicators = new Map<string, HealthIndicator>();

  constructor(options: HealthServiceOptions = {}) {
    if (options.includePing ?? true) {
      this.register(pingIndicator());
    }
  }

  register(indicator: HealthIndicator): this {
    const defined = defineHealthIndicator(indicator);
    this.indicators.set(defined.id, defined);
    return this;
  }

  registerAll(indicators: HealthIndicator[]): this {
    for (const indicator of indicators) this.register(indicator);
    return this;
  }

  unregister(id: string): boolean {
    return this.indicators.delete(id);
  }

  list(): HealthIndicator[] {
    return Array.from(this.indicators.values());
  }

  async check(): Promise<SystemStatus> {
    const components: ComponentStatus[] = [];

    for (const indicator of this.indicators.values()) {
      try {
        const result = await indicator.check();
        components.push({
          id: indicator.id,
          name: indicator.name,
          critical: indicator.critical ?? true,
          result,
        });
      } catch (error) {
        components.push({
          id: indicator.id,
          name: indicator.name,
          critical: indicator.critical ?? true,
          result: {
            status: "down",
            message: error instanceof Error ? error.message : String(error),
            checkedAt: new Date().toISOString(),
          },
        });
      }
    }

    return buildSystemStatus(components);
  }

  /** StatusProvider */
  getStatus(): Promise<SystemStatus> {
    return this.check();
  }

  async liveness(): Promise<{ status: "up" | "down"; checkedAt: string }> {
    const status = await this.check();
    return {
      status: status.live ? "up" : "down",
      checkedAt: status.checkedAt,
    };
  }

  async readiness(): Promise<{
    ready: boolean;
    status: SystemStatus["status"];
    checkedAt: string;
  }> {
    const status = await this.check();
    return {
      ready: status.ready,
      status: status.status,
      checkedAt: status.checkedAt,
    };
  }

  asStatusProvider(): StatusProvider {
    return this;
  }
}

let root: HealthService | null = null;

export function getHealthService(): HealthService {
  if (!root) root = new HealthService();
  return root;
}

export function setHealthService(service: HealthService | null): void {
  root = service;
}

export function resetHealthService(): void {
  root = null;
}

export function createHealthService(
  options?: HealthServiceOptions,
): HealthService {
  return new HealthService(options);
}
