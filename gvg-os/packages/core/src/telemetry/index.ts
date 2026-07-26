/**
 * @gvg/core/telemetry — 使用與效能追蹤
 */

export type TelemetryKind = "event" | "timing" | "error" | "counter";

export type TelemetryEvent = {
  id: string;
  kind: TelemetryKind;
  name: string;
  value?: number;
  unit?: string;
  tags?: Record<string, string>;
  metadata?: Record<string, unknown>;
  occurredAt: string;
};

const events: TelemetryEvent[] = [];

export function trackEvent(
  name: string,
  metadata?: Record<string, unknown>,
  tags?: Record<string, string>,
): TelemetryEvent {
  const event: TelemetryEvent = {
    id: crypto.randomUUID(),
    kind: "event",
    name,
    metadata,
    tags,
    occurredAt: new Date().toISOString(),
  };
  events.push(event);
  return event;
}

export function trackTiming(
  name: string,
  durationMs: number,
  tags?: Record<string, string>,
): TelemetryEvent {
  const event: TelemetryEvent = {
    id: crypto.randomUUID(),
    kind: "timing",
    name,
    value: durationMs,
    unit: "ms",
    tags,
    occurredAt: new Date().toISOString(),
  };
  events.push(event);
  return event;
}

export function trackError(
  name: string,
  error: unknown,
  tags?: Record<string, string>,
): TelemetryEvent {
  const message = error instanceof Error ? error.message : String(error);
  const event: TelemetryEvent = {
    id: crypto.randomUUID(),
    kind: "error",
    name,
    metadata: { message },
    tags,
    occurredAt: new Date().toISOString(),
  };
  events.push(event);
  return event;
}

export function incrementCounter(
  name: string,
  by = 1,
  tags?: Record<string, string>,
): TelemetryEvent {
  const event: TelemetryEvent = {
    id: crypto.randomUUID(),
    kind: "counter",
    name,
    value: by,
    tags,
    occurredAt: new Date().toISOString(),
  };
  events.push(event);
  return event;
}

export async function measureAsync<T>(
  name: string,
  fn: () => Promise<T>,
  tags?: Record<string, string>,
): Promise<T> {
  const start = Date.now();
  try {
    return await fn();
  } finally {
    trackTiming(name, Date.now() - start, tags);
  }
}

export function listTelemetry(filter?: {
  kind?: TelemetryKind;
  name?: string;
  limit?: number;
}): TelemetryEvent[] {
  let out = [...events];
  if (filter?.kind) out = out.filter((e) => e.kind === filter.kind);
  if (filter?.name) out = out.filter((e) => e.name === filter.name);
  out.sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
  if (filter?.limit) out = out.slice(0, filter.limit);
  return out;
}

export function clearTelemetry(): void {
  events.length = 0;
}

export class Telemetry {
  static event = trackEvent;
  static timing = trackTiming;
  static error = trackError;
  static count = incrementCounter;
  static measure = measureAsync;
  static list = listTelemetry;
  static clear = clearTelemetry;
}
