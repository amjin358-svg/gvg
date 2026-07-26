/**
 * @gvg/kernel/plugin/PluginEvents
 *
 * Canonical plugin lifecycle hook events + bus.
 */

import { createDomainEvent, type DomainEvent } from "../event/Events";
import type { PluginLifecycleOp, PluginLifecycleState } from "./PluginState";

/** Public plugin lifecycle events (API / host facing). */
export enum PluginEvents {
  BEFORE_LOAD = "plugin.before.load",
  AFTER_LOAD = "plugin.after.load",
  BEFORE_ENABLE = "plugin.before.enable",
  AFTER_ENABLE = "plugin.after.enable",
  BEFORE_DISABLE = "plugin.before.disable",
  AFTER_DISABLE = "plugin.after.disable",
  BEFORE_UNLOAD = "plugin.before.unload",
  AFTER_UNLOAD = "plugin.after.unload",
  ERROR = "plugin.error",
}

export const PLUGIN_EVENTS = Object.values(PluginEvents);

/** Additional internal / informational event names. */
export const PLUGIN_INFO_EVENT_TYPES = [
  "plugin.discovered",
  "plugin.validated",
  "plugin.registered",
  "plugin.installed",
  "plugin.enabled",
  "plugin.disabled",
  "plugin.updated",
  "plugin.reloaded",
  "plugin.booted",
  "plugin.failed",
  "plugin.shutdown",
  "plugin.state",
] as const;

export type PluginInfoEventType = (typeof PLUGIN_INFO_EVENT_TYPES)[number];

export type PluginEventType =
  | PluginEvents
  | `${PluginEvents}`
  | PluginInfoEventType;

/** @deprecated prefer PLUGIN_EVENTS / PluginEvents enum */
export const PLUGIN_EVENT_TYPES = [
  ...PLUGIN_EVENTS,
  ...PLUGIN_INFO_EVENT_TYPES,
] as const;

export type PluginEventPayload = {
  pluginId: string;
  version?: string;
  state?: PluginLifecycleState;
  op?: PluginLifecycleOp;
  error?: string;
  [key: string]: unknown;
};

export type PluginEvent = DomainEvent<PluginEventPayload>;

export type PluginEventHandler = (
  event: PluginEvent,
) => void | Promise<void>;

export function createPluginEvent(
  type: PluginEventType,
  payload: PluginEventPayload,
  organizationId?: string,
): PluginEvent {
  return createDomainEvent(type, payload, organizationId);
}

export class PluginEventBus {
  private readonly handlers = new Map<
    PluginEventType | "*",
    PluginEventHandler[]
  >();

  on(
    type: PluginEventType | "*",
    handler: PluginEventHandler,
  ): () => void {
    const list = this.handlers.get(type) ?? [];
    list.push(handler);
    this.handlers.set(type, list);
    return () => {
      const next = (this.handlers.get(type) ?? []).filter((h) => h !== handler);
      if (next.length) this.handlers.set(type, next);
      else this.handlers.delete(type);
    };
  }

  async emit(event: PluginEvent): Promise<void> {
    const type = event.type as PluginEventType;
    const handlers = [
      ...(this.handlers.get(type) ?? []),
      ...(this.handlers.get("*") ?? []),
    ];
    for (const handler of handlers) {
      await handler(event);
    }
  }

  async publish(
    type: PluginEventType,
    payload: PluginEventPayload,
  ): Promise<PluginEvent> {
    const event = createPluginEvent(type, payload);
    await this.emit(event);
    return event;
  }

  /** Emit BEFORE_* then run work, then AFTER_* (or ERROR). */
  async around(
    before: PluginEvents,
    after: PluginEvents,
    payload: PluginEventPayload,
    work: () => void | Promise<void>,
  ): Promise<void> {
    await this.publish(before, payload);
    try {
      await work();
      await this.publish(after, payload);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await this.publish(PluginEvents.ERROR, {
        ...payload,
        error: message,
      });
      throw error;
    }
  }

  clear(): void {
    this.handlers.clear();
  }
}

export function createPluginEventBus(): PluginEventBus {
  return new PluginEventBus();
}
