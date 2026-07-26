/** @gvg/kernel/application/Lifecycle */

export type LifecycleState =
  | "created"
  | "bootstrapping"
  | "ready"
  | "shutting_down"
  | "stopped"
  | "failed";

export class Lifecycle {
  private state: LifecycleState = "created";

  getState(): LifecycleState {
    return this.state;
  }

  transition(next: LifecycleState): void {
    this.state = next;
  }

  isReady(): boolean {
    return this.state === "ready";
  }
}
