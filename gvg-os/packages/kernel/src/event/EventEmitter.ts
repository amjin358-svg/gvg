/** @gvg/kernel/event/EventEmitter */

export type EventHandler = (event: unknown) => void | Promise<void>;

export class EventEmitter {
  private readonly handlers = new Map<string, Set<EventHandler>>();

  on(type: string, handler: EventHandler): () => void {
    if (!this.handlers.has(type)) this.handlers.set(type, new Set());
    this.handlers.get(type)!.add(handler);
    return () => this.off(type, handler);
  }

  off(type: string, handler: EventHandler): void {
    this.handlers.get(type)?.delete(handler);
  }

  async emit(type: string, event: unknown): Promise<void> {
    const set = this.handlers.get(type);
    if (!set?.size) return;
    await Promise.all([...set].map((h) => h(event)));
  }

  clear(): void {
    this.handlers.clear();
  }
}
