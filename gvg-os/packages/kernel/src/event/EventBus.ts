/** @gvg/kernel/event/EventBus */

import { EventEmitter, type EventHandler } from "./EventEmitter";
import {
  createDomainEvent,
  type DomainEvent,
  type DomainEventType,
} from "./Events";

const globalBus = new EventEmitter();

export class EventBus {
  constructor(private readonly emitter: EventEmitter = globalBus) {}

  on(type: string, handler: EventHandler): () => void {
    return this.emitter.on(type, handler);
  }

  off(type: string, handler: EventHandler): void {
    this.emitter.off(type, handler);
  }

  async emit(type: string, event: unknown): Promise<void> {
    await this.emitter.emit(type, event);
  }

  async publish<T extends Record<string, unknown>>(
    type: DomainEventType,
    payload: T,
    organizationId?: string,
  ): Promise<DomainEvent<T>> {
    const event = createDomainEvent(type, payload, organizationId);
    await this.emitter.emit(type, event);
    return event;
  }

  clear(): void {
    this.emitter.clear();
  }
}

export const eventBus = new EventBus();

export function on(type: string, handler: EventHandler): () => void {
  return eventBus.on(type, handler);
}

export function off(type: string, handler: EventHandler): void {
  eventBus.off(type, handler);
}

export async function emit(type: string, event: unknown): Promise<void> {
  await eventBus.emit(type, event);
}

export function clearEventHandlers(): void {
  eventBus.clear();
}
