/**
 * @gvg/kernel/plugin/PluginState
 *
 * Public plugin status + internal lifecycle state machine.
 *
 * Public:   Installed → Loaded → Enabled → Disabled → Failed → Unloaded
 * Internal: Install → Enable → Disable → Update → Reload → Shutdown
 */

/** Public plugin status (API / UI facing). */
export enum PluginState {
  Installed = "installed",
  Loaded = "loaded",
  Enabled = "enabled",
  Disabled = "disabled",
  Failed = "failed",
  Unloaded = "unloaded",
}

export const PLUGIN_STATES = Object.values(PluginState);

export const PLUGIN_LIFECYCLE_OPS = [
  "Install",
  "Enable",
  "Disable",
  "Update",
  "Reload",
  "Shutdown",
] as const;

export type PluginLifecycleOp = (typeof PLUGIN_LIFECYCLE_OPS)[number];

/** Fine-grained internal lifecycle states used by PluginLifecycleManager. */
export type PluginLifecycleState =
  | "idle"
  | "installing"
  | "installed"
  | "enabling"
  | "registering"
  | "booting"
  | "ready"
  | "disabling"
  | "disabled"
  | "updating"
  | "reloading"
  | "shutting_down"
  | "stopped"
  | "failed";

export type PluginStateRecord = {
  pluginId: string;
  /** Internal lifecycle state */
  state: PluginLifecycleState;
  /** Public status */
  status: PluginState;
  enabled: boolean;
  error?: string;
  updatedAt?: string;
};

export const PLUGIN_STATE_TRANSITIONS: Record<
  PluginLifecycleState,
  PluginLifecycleState[]
> = {
  idle: ["installing", "failed"],
  installing: ["installed", "failed"],
  installed: ["enabling", "registering", "updating", "shutting_down", "failed"],
  enabling: ["registering", "ready", "failed"],
  registering: ["booting", "ready", "failed"],
  booting: ["ready", "failed"],
  ready: [
    "disabling",
    "updating",
    "reloading",
    "shutting_down",
    "failed",
  ],
  disabling: ["disabled", "failed"],
  disabled: ["enabling", "registering", "updating", "shutting_down", "failed"],
  updating: ["installed", "ready", "disabled", "enabling", "failed"],
  reloading: ["ready", "enabling", "failed"],
  shutting_down: ["stopped", "failed"],
  stopped: ["idle", "installing"],
  failed: ["idle", "installing", "installed"],
};

/** Map internal lifecycle → public PluginState. */
export function toPluginState(state: PluginLifecycleState): PluginState {
  switch (state) {
    case "idle":
    case "stopped":
    case "shutting_down":
      return PluginState.Unloaded;
    case "installing":
    case "installed":
      return PluginState.Installed;
    case "enabling":
    case "registering":
    case "booting":
    case "updating":
    case "reloading":
      return PluginState.Loaded;
    case "ready":
      return PluginState.Enabled;
    case "disabling":
    case "disabled":
      return PluginState.Disabled;
    case "failed":
      return PluginState.Failed;
    default:
      return PluginState.Unloaded;
  }
}

export function canTransition(
  from: PluginLifecycleState,
  to: PluginLifecycleState,
): boolean {
  return PLUGIN_STATE_TRANSITIONS[from]?.includes(to) ?? false;
}

export function assertTransition(
  pluginId: string,
  from: PluginLifecycleState,
  to: PluginLifecycleState,
): void {
  if (!canTransition(from, to)) {
    throw new Error(
      `Invalid plugin state transition for ${pluginId}: ${from} → ${to}`,
    );
  }
}

export function isActiveState(state: PluginLifecycleState): boolean {
  return state === "ready" || state === "enabling" || state === "booting";
}

export function isTerminalState(state: PluginLifecycleState): boolean {
  return state === "stopped" || state === "failed";
}

export function isPluginEnabled(status: PluginState): boolean {
  return status === PluginState.Enabled;
}

export function createPluginStateRecord(
  pluginId: string,
  state: PluginLifecycleState = "idle",
  enabled = false,
): PluginStateRecord {
  return {
    pluginId,
    state,
    status: toPluginState(state),
    enabled: enabled || state === "ready",
    updatedAt: new Date().toISOString(),
  };
}

/** @deprecated alias — prefer PluginStateRecord */
export type PluginLifecycleRecord = PluginStateRecord;
