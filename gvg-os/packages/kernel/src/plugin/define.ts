/**
 * @gvg/kernel/plugin/define — declarative plugin authoring helpers
 *
 * definePlugin()
 * defineRoute()
 * definePermission()
 * defineNavigation()
 * defineDashboardWidget()
 */

import type { PluginManifest } from "./PluginManifest";
import { defineNavigation } from "./navigation";
import { definePermission } from "./permissions";
import { defineRoute } from "./routes";
import {
  createGVGPlugin,
  definePlugin as assertPlugin,
  type AppContext,
  type CreateGVGPluginInput,
  type GVGPlugin,
} from "./PluginContext";

export type DashboardWidgetSize = "sm" | "md" | "lg" | "xl";

export type DashboardWidget = {
  id: string;
  title: string;
  description?: string;
  component: string;
  size?: DashboardWidgetSize;
  order?: number;
  roles?: string[];
  pluginId?: string;
};

export type DefinePluginInput = CreateGVGPluginInput & {
  widgets?: DashboardWidget[];
};

export type GVGPluginWithWidgets = GVGPlugin & {
  widgets(): DashboardWidget[];
};

/** Normalize and validate a route definition — see ./routes */
export { defineRoute } from "./routes";

/** Normalize a permission key or definition — see ./permissions */
export { definePermission } from "./permissions";

export { defineNavigation } from "./navigation";

/** Normalize a dashboard widget definition */
export function defineDashboardWidget(
  widget: DashboardWidget,
): DashboardWidget {
  if (!widget.id?.trim()) {
    throw new Error("defineDashboardWidget: id is required");
  }
  if (!widget.title?.trim()) {
    throw new Error(`defineDashboardWidget: title is required for ${widget.id}`);
  }
  if (!widget.component) {
    throw new Error(
      `defineDashboardWidget: component is required for ${widget.id}`,
    );
  }
  return {
    id: widget.id.trim(),
    title: widget.title.trim(),
    description: widget.description,
    component: widget.component,
    size: widget.size ?? "md",
    order: widget.order ?? 0,
    roles: widget.roles,
    pluginId: widget.pluginId,
  };
}

/**
 * Define a GVG plugin from declarative parts.
 * Accepts either a full GVGPlugin or a CreateGVGPluginInput-style object.
 */
export function definePlugin(
  input: GVGPlugin | DefinePluginInput,
): GVGPluginWithWidgets {
  if (isFullPlugin(input)) {
    const widgets =
      "widgets" in input && typeof input.widgets === "function"
        ? input.widgets()
        : [];
    return assertPlugin({
      ...input,
      widgets: () => widgets.map(defineDashboardWidget),
    }) as GVGPluginWithWidgets;
  }

  const routes = (input.routes ?? []).map(defineRoute);
  const navigation = (input.navigation ?? []).map(defineNavigation);
  const permissions = (input.permissions ?? []).map(definePermission);
  const widgets = (input.widgets ?? []).map(defineDashboardWidget);

  const plugin = createGVGPlugin({
    ...input,
    routes,
    navigation,
    permissions,
  });

  return {
    ...plugin,
    widgets: () =>
      widgets.map((w) => ({
        ...w,
        pluginId: w.pluginId ?? plugin.id,
      })),
    register(app: AppContext) {
      plugin.register(app);
    },
  };
}

function isFullPlugin(
  input: GVGPlugin | DefinePluginInput,
): input is GVGPlugin {
  return (
    typeof (input as GVGPlugin).routes === "function" &&
    typeof (input as GVGPlugin).register === "function" &&
    typeof (input as GVGPlugin).manifest === "object"
  );
}

export function defineManifest(manifest: PluginManifest): PluginManifest {
  if (!manifest.id || !manifest.name || !manifest.version) {
    throw new Error("defineManifest: id, name, and version are required");
  }
  return manifest;
}
