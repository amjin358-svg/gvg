/** @gvg/kernel/event/Events */

export type DomainEventType =
  | "rfq.created"
  | "rfq.quoted"
  | "order.confirmed"
  | "order.shipped"
  | "order.delivered"
  | "shipment.updated"
  | "inventory.adjusted"
  | "user.signed_in"
  | "app.booted"
  | "app.shutdown"
  | (string & {});

export type DomainEvent<T extends Record<string, unknown> = Record<string, unknown>> = {
  id: string;
  type: DomainEventType;
  occurredAt: string;
  organizationId?: string;
  payload: T;
};

export function createDomainEvent<T extends Record<string, unknown>>(
  type: DomainEvent["type"],
  payload: T,
  organizationId?: string,
): DomainEvent<T> {
  return {
    id: crypto.randomUUID(),
    type,
    occurredAt: new Date().toISOString(),
    organizationId,
    payload,
  };
}
