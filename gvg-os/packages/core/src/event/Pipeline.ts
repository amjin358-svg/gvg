/**
 * @gvg/core/event/Pipeline
 *
 * Middleware pipeline around event dispatch:
 * before → dispatch → after (or onError)
 */

import {
  createDispatcher,
  type Dispatcher,
  type DispatchResult,
  type DispatcherOptions,
} from "./Dispatcher";
import type {
  EventEnvelope,
  EventHandler,
  EventName,
  SubscribeOptions,
} from "./Subscriber";
import { createEventEnvelope } from "./Subscriber";

export type PipelineContext<T = unknown> = {
  event: EventEnvelope<T>;
  result?: DispatchResult;
  state: Record<string, unknown>;
};

export type PipelineMiddleware = (
  ctx: PipelineContext,
  next: () => Promise<void>,
) => void | Promise<void>;

export type EventPipelineOptions = DispatcherOptions & {
  middlewares?: PipelineMiddleware[];
};

export class EventPipeline {
  readonly dispatcher: Dispatcher;
  private readonly middlewares: PipelineMiddleware[];

  constructor(options: EventPipelineOptions = {}) {
    this.dispatcher = options.subscribers
      ? createDispatcher({
          subscribers: options.subscribers,
          continueOnError: options.continueOnError,
        })
      : createDispatcher({ continueOnError: options.continueOnError });
    this.middlewares = [...(options.middlewares ?? [])];
  }

  use(middleware: PipelineMiddleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  on(
    name: EventName | "*",
    handler: EventHandler,
    options?: SubscribeOptions,
  ): () => void {
    return this.dispatcher.on(name, handler, options);
  }

  once(
    name: EventName | "*",
    handler: EventHandler,
    options?: Omit<SubscribeOptions, "once">,
  ): () => void {
    return this.dispatcher.once(name, handler, options);
  }

  async publish<T>(
    name: EventName,
    payload: T,
    meta?: Record<string, unknown>,
  ): Promise<DispatchResult> {
    const event = createEventEnvelope(name, payload, meta);
    return this.publishEnvelope(event);
  }

  async publishEnvelope<T>(
    event: EventEnvelope<T>,
  ): Promise<DispatchResult> {
    const ctx: PipelineContext<T> = {
      event,
      state: {},
    };

    const runDispatch = async () => {
      ctx.result = await this.dispatcher.dispatchEnvelope(ctx.event);
    };

    await this.runMiddlewares(ctx as PipelineContext, runDispatch);

    return (
      ctx.result ?? {
        name: event.name,
        eventId: event.id,
        delivered: 0,
        failed: [],
      }
    );
  }

  clear(name?: EventName | "*"): void {
    this.dispatcher.clear(name);
  }

  private async runMiddlewares(
    ctx: PipelineContext,
    terminal: () => Promise<void>,
  ): Promise<void> {
    let index = -1;

    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) {
        throw new Error("Event pipeline next() called multiple times");
      }
      index = i;
      const middleware = this.middlewares[i];
      if (!middleware) {
        await terminal();
        return;
      }
      await middleware(ctx, () => dispatch(i + 1));
    };

    await dispatch(0);
  }
}

export function createEventPipeline(
  options?: EventPipelineOptions,
): EventPipeline {
  return new EventPipeline(options);
}

/** Built-in middleware: attach timing metadata. */
export function timingMiddleware(): PipelineMiddleware {
  return async (ctx, next) => {
    const started = Date.now();
    ctx.state.startedAt = started;
    await next();
    ctx.state.durationMs = Date.now() - started;
    ctx.event.meta = {
      ...ctx.event.meta,
      durationMs: ctx.state.durationMs,
    };
  };
}

/** Built-in middleware: swallow and record handler-path errors already in result. */
export function auditMiddleware(
  onComplete: (ctx: PipelineContext) => void | Promise<void>,
): PipelineMiddleware {
  return async (ctx, next) => {
    await next();
    await onComplete(ctx);
  };
}
