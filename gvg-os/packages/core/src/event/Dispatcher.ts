/**
 * @gvg/core/event/Dispatcher
 *
 * Fan-out events to registered subscribers.
 */

import {
  createEventEnvelope,
  createSubscriberRegistry,
  type EventEnvelope,
  type EventHandler,
  type EventName,
  type SubscribeOptions,
  type SubscriberRegistry,
} from "./Subscriber";

export type DispatchResult = {
  name: EventName;
  eventId: string;
  delivered: number;
  failed: Array<{ subscriptionId: string; error: string }>;
};

export type DispatcherOptions = {
  subscribers?: SubscriberRegistry;
  /** Continue notifying remaining handlers after one fails (default true) */
  continueOnError?: boolean;
};

export class Dispatcher {
  readonly subscribers: SubscriberRegistry;
  private readonly continueOnError: boolean;

  constructor(options: DispatcherOptions = {}) {
    this.subscribers = options.subscribers ?? createSubscriberRegistry();
    this.continueOnError = options.continueOnError ?? true;
  }

  on(
    name: EventName | "*",
    handler: EventHandler,
    options?: SubscribeOptions,
  ): () => void {
    return this.subscribers.subscribe(name, handler, options);
  }

  once(
    name: EventName | "*",
    handler: EventHandler,
    options?: Omit<SubscribeOptions, "once">,
  ): () => void {
    return this.subscribers.once(name, handler, options);
  }

  off(subscriptionId: string): boolean {
    return this.subscribers.unsubscribe(subscriptionId);
  }

  async dispatch<T>(
    name: EventName,
    payload: T,
    meta?: Record<string, unknown>,
  ): Promise<DispatchResult> {
    const event = createEventEnvelope(name, payload, meta);
    return this.dispatchEnvelope(event);
  }

  async dispatchEnvelope<T>(
    event: EventEnvelope<T>,
  ): Promise<DispatchResult> {
    const handlers = this.subscribers.getHandlers(event.name);
    const result: DispatchResult = {
      name: event.name,
      eventId: event.id,
      delivered: 0,
      failed: [],
    };

    for (const sub of handlers) {
      try {
        await sub.handler(event as EventEnvelope);
        result.delivered += 1;
        if (sub.once) this.subscribers.unsubscribe(sub.id);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        result.failed.push({ subscriptionId: sub.id, error: message });
        if (!this.continueOnError) break;
      }
    }

    return result;
  }

  clear(name?: EventName | "*"): void {
    this.subscribers.clear(name);
  }
}

let root: Dispatcher | null = null;

export function getDispatcher(): Dispatcher {
  if (!root) root = new Dispatcher();
  return root;
}

export function setDispatcher(dispatcher: Dispatcher | null): void {
  root = dispatcher;
}

export function resetDispatcher(): void {
  root?.clear();
  root = null;
}

export function createDispatcher(options?: DispatcherOptions): Dispatcher {
  return new Dispatcher(options);
}
