/**
 * @gvg/core/event/Subscriber
 *
 * Event subscription contracts and registry helpers.
 */

export type EventName = string;

export type EventEnvelope<T = unknown> = {
  name: EventName;
  payload: T;
  id: string;
  occurredAt: string;
  meta?: Record<string, unknown>;
};

export type EventHandler<T = unknown> = (
  event: EventEnvelope<T>,
) => void | Promise<void>;

export type Subscription = {
  id: string;
  name: EventName | "*";
  handler: EventHandler;
  priority: number;
  once: boolean;
};

export type SubscribeOptions = {
  priority?: number;
  once?: boolean;
};

export function createEventEnvelope<T>(
  name: EventName,
  payload: T,
  meta?: Record<string, unknown>,
): EventEnvelope<T> {
  return {
    name,
    payload,
    id: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
    meta: meta ? { ...meta } : undefined,
  };
}

export class SubscriberRegistry {
  private readonly subscriptions = new Map<string, Subscription[]>();

  subscribe(
    name: EventName | "*",
    handler: EventHandler,
    options: SubscribeOptions = {},
  ): () => void {
    const sub: Subscription = {
      id: crypto.randomUUID(),
      name,
      handler,
      priority: options.priority ?? 0,
      once: options.once ?? false,
    };
    const list = this.subscriptions.get(name) ?? [];
    list.push(sub);
    list.sort((a, b) => b.priority - a.priority);
    this.subscriptions.set(name, list);

    return () => this.unsubscribe(sub.id);
  }

  once(
    name: EventName | "*",
    handler: EventHandler,
    options: Omit<SubscribeOptions, "once"> = {},
  ): () => void {
    return this.subscribe(name, handler, { ...options, once: true });
  }

  unsubscribe(subscriptionId: string): boolean {
    for (const [name, list] of this.subscriptions) {
      const next = list.filter((s) => s.id !== subscriptionId);
      if (next.length !== list.length) {
        if (next.length === 0) this.subscriptions.delete(name);
        else this.subscriptions.set(name, next);
        return true;
      }
    }
    return false;
  }

  /** Named subscribers first (by priority), then wildcards. */
  getHandlers(name: EventName): Subscription[] {
    const named = [...(this.subscriptions.get(name) ?? [])].sort(
      (a, b) => b.priority - a.priority,
    );
    const wild = [...(this.subscriptions.get("*") ?? [])].sort(
      (a, b) => b.priority - a.priority,
    );
    return [...named, ...wild];
  }

  clear(name?: EventName | "*"): void {
    if (name) this.subscriptions.delete(name);
    else this.subscriptions.clear();
  }

  size(name?: EventName | "*"): number {
    if (name) return this.subscriptions.get(name)?.length ?? 0;
    let total = 0;
    for (const list of this.subscriptions.values()) total += list.length;
    return total;
  }
}

export function createSubscriberRegistry(): SubscriberRegistry {
  return new SubscriberRegistry();
}
