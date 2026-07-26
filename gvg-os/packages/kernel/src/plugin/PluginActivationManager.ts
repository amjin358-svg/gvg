/**
 * @gvg/kernel/plugin/PluginActivationManager
 *
 * Boot-time activation engine:
 *   Install → Enable → Disable → Update → Reload → Shutdown
 *
 * Public status flips live on PluginLifecycleManager + PluginRuntimeContext.
 */

import { PluginError } from "../errors/PluginError";
import type { AppContext, GVGPlugin } from "./PluginContext";
import type { PluginRuntimeState } from "./PluginRegistry";
import {
  registerPluginContributions,
  sortPluginsByDependencies,
  unregisterPluginContributions,
} from "./PluginLifecycleManager";
import {
  PLUGIN_LIFECYCLE_OPS,
  PLUGIN_STATE_TRANSITIONS,
  toPluginState,
  type PluginLifecycleOp,
  type PluginLifecycleState,
  type PluginLifecycleRecord,
} from "./PluginState";

export type PluginActivationHooks = {
  onTransition?: (
    pluginId: string,
    state: PluginLifecycleState,
    detail?: Record<string, unknown>,
  ) => void;
  onOp?: (
    pluginId: string,
    op: PluginLifecycleOp,
    detail?: Record<string, unknown>,
  ) => void;
};

/** @deprecated alias — prefer PluginActivationHooks */
export type PluginLifecycleHooks = PluginActivationHooks;

/** @deprecated use PLUGIN_STATE_TRANSITIONS */
const ALLOWED = PLUGIN_STATE_TRANSITIONS;

/**
 * Manages Install · Enable · Disable · Update · Reload · Shutdown.
 */
export class PluginActivationManager {
  private readonly states = new Map<string, PluginLifecycleState>();
  private readonly plugins = new Map<string, GVGPlugin>();
  private readonly errors = new Map<string, string>();
  private readonly hooks: PluginActivationHooks;
  private app: AppContext | null = null;
  private runtime: PluginRuntimeState | null = null;

  constructor(hooks: PluginActivationHooks = {}) {
    this.hooks = hooks;
  }

  /** Bind app + runtime used by Enable / Update / Reload. */
  bind(app: AppContext, runtime: PluginRuntimeState): this {
    this.app = app;
    this.runtime = runtime;
    return this;
  }

  track(plugin: GVGPlugin): this {
    this.plugins.set(plugin.id, plugin);
    if (!this.states.has(plugin.id)) {
      this.states.set(plugin.id, "idle");
    }
    return this;
  }

  trackAll(plugins: GVGPlugin[]): this {
    for (const plugin of plugins) this.track(plugin);
    return this;
  }

  getState(pluginId: string): PluginLifecycleState {
    return this.states.get(pluginId) ?? "idle";
  }

  isEnabled(pluginId: string): boolean {
    return this.getState(pluginId) === "ready";
  }

  getError(pluginId: string): string | undefined {
    return this.errors.get(pluginId);
  }

  getPlugin(pluginId: string): GVGPlugin | undefined {
    return this.plugins.get(pluginId);
  }

  private toRecord(
    pluginId: string,
    state: PluginLifecycleState,
    enabled: boolean,
    error?: string,
  ): PluginLifecycleRecord {
    return {
      pluginId,
      state,
      status: toPluginState(state),
      enabled,
      error: error ?? this.errors.get(pluginId),
    };
  }

  list(): PluginLifecycleRecord[] {
    return Array.from(this.states.entries()).map(([pluginId, state]) => ({
      pluginId,
      state,
      status: toPluginState(state),
      enabled: state === "ready",
      error: this.errors.get(pluginId),
    }));
  }

  ready(): string[] {
    return this.list()
      .filter((r) => r.state === "ready")
      .map((r) => r.pluginId);
  }

  enabled(): string[] {
    return this.ready();
  }

  disabled(): string[] {
    return this.list()
      .filter((r) => r.state === "disabled" || r.state === "installed")
      .map((r) => r.pluginId);
  }

  failed(): PluginLifecycleRecord[] {
    return this.list().filter((r) => r.state === "failed");
  }

  transition(pluginId: string, next: PluginLifecycleState): void {
    const current = this.getState(pluginId);
    const allowed = ALLOWED[current] ?? [];
    if (!allowed.includes(next) && current !== next) {
      throw new PluginError(
        `Invalid lifecycle transition for ${pluginId}: ${current} → ${next}`,
        { pluginId, stage: "boot", details: { current, next } },
      );
    }
    this.states.set(pluginId, next);
    if (next !== "failed") this.errors.delete(pluginId);
    this.hooks.onTransition?.(pluginId, next);
  }

  fail(pluginId: string, error: string): void {
    this.errors.set(pluginId, error);
    this.states.set(pluginId, "failed");
    this.hooks.onTransition?.(pluginId, "failed", { error });
  }

  /** Mark a plugin ready after an external boot (skips hooks). */
  markReady(plugin: GVGPlugin): void {
    this.track(plugin);
    this.states.set(plugin.id, "ready");
    this.errors.delete(plugin.id);
  }

  private requirePlugin(pluginId: string): GVGPlugin {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new PluginError(`Unknown plugin: ${pluginId}`, {
        pluginId,
        stage: "boot",
      });
    }
    return plugin;
  }

  private requireContext(): { app: AppContext; runtime: PluginRuntimeState } {
    if (!this.app || !this.runtime) {
      throw new PluginError(
        "Activation manager is not bound to app/runtime — call bind(app, runtime)",
        { stage: "boot" },
      );
    }
    return { app: this.app, runtime: this.runtime };
  }

  // ─── Install ───────────────────────────────────────────────

  async install(plugin: GVGPlugin): Promise<PluginLifecycleRecord> {
    this.track(plugin);
    this.hooks.onOp?.(plugin.id, "Install");

    try {
      const state = this.getState(plugin.id);
      if (state === "installed" || state === "ready" || state === "disabled") {
        return this.toRecord(plugin.id, state, state === "ready");
      }
      if (state === "stopped") {
        this.states.set(plugin.id, "idle");
      }

      this.transition(plugin.id, "installing");
      await plugin.onInstall?.();
      this.transition(plugin.id, "installed");
      return this.toRecord(plugin.id, "installed", false);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.fail(plugin.id, message);
      return this.toRecord(plugin.id, "failed", false, message);
    }
  }

  // ─── Enable ────────────────────────────────────────────────

  async enable(
    pluginId: string,
    app?: AppContext,
    runtime?: PluginRuntimeState,
  ): Promise<PluginLifecycleRecord> {
    const plugin = this.requirePlugin(pluginId);
    const ctx = app && runtime ? { app, runtime } : this.requireContext();
    this.hooks.onOp?.(pluginId, "Enable");

    try {
      const state = this.getState(pluginId);
      if (state === "ready") {
        return this.toRecord(pluginId, "ready", true);
      }
      if (state === "idle") {
        await this.install(plugin);
      }
      if (
        this.getState(pluginId) !== "installed" &&
        this.getState(pluginId) !== "disabled"
      ) {
        throw new PluginError(
          `Cannot enable ${pluginId} from state ${this.getState(pluginId)}`,
          { pluginId, stage: "register" },
        );
      }

      this.transition(pluginId, "enabling");
      this.transition(pluginId, "registering");
      registerPluginContributions(plugin, ctx.runtime);
      plugin.register(ctx.app);

      this.transition(pluginId, "booting");
      await plugin.onEnable?.();
      await plugin.onBoot?.();

      this.transition(pluginId, "ready");
      return this.toRecord(pluginId, "ready", true);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.fail(pluginId, message);
      return this.toRecord(pluginId, "failed", false, message);
    }
  }

  // ─── Disable ───────────────────────────────────────────────

  async disable(
    pluginId: string,
    runtime?: PluginRuntimeState,
  ): Promise<PluginLifecycleRecord> {
    const plugin = this.requirePlugin(pluginId);
    const rt = runtime ?? this.requireContext().runtime;
    this.hooks.onOp?.(pluginId, "Disable");

    try {
      if (this.getState(pluginId) === "disabled") {
        return this.toRecord(pluginId, "disabled", false);
      }
      if (this.getState(pluginId) !== "ready") {
        throw new PluginError(
          `Cannot disable ${pluginId} from state ${this.getState(pluginId)}`,
          { pluginId, stage: "boot" },
        );
      }

      this.transition(pluginId, "disabling");
      await plugin.onDisable?.();
      unregisterPluginContributions(pluginId, rt);
      this.transition(pluginId, "disabled");
      return this.toRecord(pluginId, "disabled", false);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.fail(pluginId, message);
      return this.toRecord(pluginId, "failed", false, message);
    }
  }

  // ─── Update ────────────────────────────────────────────────

  async update(
    next: GVGPlugin,
    app?: AppContext,
    runtime?: PluginRuntimeState,
  ): Promise<PluginLifecycleRecord> {
    const prev = this.plugins.get(next.id);
    const prior = this.getState(next.id);
    const wasEnabled = prior === "ready";
    const ctx = app && runtime ? { app, runtime } : this.requireContext();
    this.hooks.onOp?.(next.id, "Update", {
      from: prev?.version,
      to: next.version,
    });

    try {
      if (
        prior !== "ready" &&
        prior !== "disabled" &&
        prior !== "installed" &&
        prior !== "idle"
      ) {
        throw new PluginError(
          `Cannot update ${next.id} from state ${prior}`,
          { pluginId: next.id, stage: "boot" },
        );
      }

      if (wasEnabled) {
        unregisterPluginContributions(next.id, ctx.runtime);
      }

      this.states.set(next.id, "updating");
      this.hooks.onTransition?.(next.id, "updating", {
        from: prev?.version,
        to: next.version,
      });

      this.plugins.set(next.id, next);
      await next.onUpdate?.(prev?.version);

      if (wasEnabled) {
        this.states.set(next.id, "installed");
        return this.enable(next.id, ctx.app, ctx.runtime);
      }

      const restored: PluginLifecycleState =
        prior === "disabled" ? "disabled" : "installed";
      this.states.set(next.id, restored);
      this.hooks.onTransition?.(next.id, restored);
      return this.toRecord(next.id, restored, restored === "ready");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.fail(next.id, message);
      return this.toRecord(next.id, "failed", false, message);
    }
  }

  // ─── Reload ────────────────────────────────────────────────

  async reload(
    pluginId: string,
    app?: AppContext,
    runtime?: PluginRuntimeState,
  ): Promise<PluginLifecycleRecord> {
    const plugin = this.requirePlugin(pluginId);
    const ctx = app && runtime ? { app, runtime } : this.requireContext();
    this.hooks.onOp?.(pluginId, "Reload");

    try {
      if (this.getState(pluginId) !== "ready") {
        throw new PluginError(
          `Cannot reload ${pluginId} from state ${this.getState(pluginId)}`,
          { pluginId, stage: "boot" },
        );
      }

      this.transition(pluginId, "reloading");
      await plugin.onReload?.();
      unregisterPluginContributions(pluginId, ctx.runtime);

      this.states.set(pluginId, "installed");
      return this.enable(pluginId, ctx.app, ctx.runtime);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.fail(pluginId, message);
      return this.toRecord(pluginId, "failed", false, message);
    }
  }

  // ─── Shutdown ──────────────────────────────────────────────

  async shutdown(pluginId: string): Promise<boolean> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) return false;

    const state = this.getState(pluginId);
    if (state === "stopped" || state === "idle") return true;

    this.hooks.onOp?.(pluginId, "Shutdown");

    try {
      if (state === "ready" && this.runtime) {
        unregisterPluginContributions(pluginId, this.runtime);
      }

      this.states.set(pluginId, "shutting_down");
      this.hooks.onTransition?.(pluginId, "shutting_down");

      await plugin.onShutdown?.();

      this.states.set(pluginId, "stopped");
      this.hooks.onTransition?.(pluginId, "stopped");
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.fail(pluginId, message);
      return false;
    }
  }

  async shutdownAll(plugins?: GVGPlugin[]): Promise<void> {
    const list =
      plugins ??
      Array.from(this.plugins.values()).filter((p) => {
        const s = this.getState(p.id);
        return s === "ready" || s === "disabled" || s === "installed";
      });
    const ordered = sortPluginsByDependencies(list).reverse();
    for (const plugin of ordered) {
      await this.shutdown(plugin.id);
    }
  }

  /**
   * Boot convenience: Install + Enable.
   * Used by PluginLoader Register → Boot stages.
   */
  async activate(
    plugin: GVGPlugin,
    app: AppContext,
    runtime: PluginRuntimeState,
  ): Promise<PluginLifecycleRecord> {
    this.bind(app, runtime);
    this.track(plugin);

    const installed = await this.install(plugin);
    if (installed.state === "failed") return installed;
    return this.enable(plugin.id, app, runtime);
  }

  async activateAll(
    plugins: GVGPlugin[],
    app: AppContext,
    runtime: PluginRuntimeState,
  ): Promise<PluginLifecycleRecord[]> {
    this.bind(app, runtime);
    const ordered = sortPluginsByDependencies(plugins);
    const records: PluginLifecycleRecord[] = [];
    for (const plugin of ordered) {
      records.push(await this.activate(plugin, app, runtime));
    }
    return records;
  }

  clear(): void {
    this.states.clear();
    this.plugins.clear();
    this.errors.clear();
    this.app = null;
    this.runtime = null;
  }
}

export function createPluginActivationManager(
  hooks?: PluginActivationHooks,
): PluginActivationManager {
  return new PluginActivationManager(hooks);
}
