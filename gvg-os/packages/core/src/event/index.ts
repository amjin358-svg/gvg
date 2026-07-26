/**
 * @gvg/core/event — domain event pipeline · dispatcher · subscriber
 */

export {
  createEventEnvelope,
  SubscriberRegistry,
  createSubscriberRegistry,
} from "./Subscriber";
export type {
  EventName,
  EventEnvelope,
  EventHandler,
  Subscription,
  SubscribeOptions,
} from "./Subscriber";

export {
  Dispatcher,
  getDispatcher,
  setDispatcher,
  resetDispatcher,
  createDispatcher,
} from "./Dispatcher";
export type { DispatchResult, DispatcherOptions } from "./Dispatcher";

export {
  EventPipeline,
  createEventPipeline,
  timingMiddleware,
  auditMiddleware,
} from "./Pipeline";
export type {
  PipelineContext,
  PipelineMiddleware,
  EventPipelineOptions,
} from "./Pipeline";
