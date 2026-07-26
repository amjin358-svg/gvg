import {
  definePlugin,
  defineRoute,
  definePermission,
  defineNavigation,
  defineDashboardWidget,
} from "@gvg/sdk";
import { manifest } from "./manifest";
import { routes } from "./routes";
import { permissions } from "./permissions";
import { navigationFlat } from "./navigation";
import { MARKETPLACE_STAT_WIDGETS } from "./stats";

export { manifest } from "./manifest";
export { routes } from "./routes";
export { permissions } from "./permissions";
export { navigation, navigationFlat } from "./navigation";
export { default as menu } from "./menu";
export {
  getMarketplaceStats,
  MARKETPLACE_STAT_WIDGETS,
} from "./stats";
export type { MarketplaceStat, MarketplaceStatId } from "./stats";
export {
  MARKETPLACE_MODULES,
  MARKETPLACE_FLOW_MODULES,
  MARKETPLACE_SUPPORT_MODULES,
  getMarketplaceModule,
  getMarketplaceFlowModules,
  describeMarketplacePipeline,
} from "./modules";
export type { MarketplaceModule, MarketplaceModuleId } from "./modules";

export {
  MARKETPLACE_PIPELINE,
  getPipelineStage,
  getNextPipelineStage,
  getPipelineIndex,
  getPipelinePath,
  isPipelineComplete,
} from "./pipeline";
export type {
  MarketplacePipelineStage,
  MarketplacePipelineStageId,
} from "./pipeline";

export * as product from "./product";
export * as supplier from "./supplier";
export * as rfq from "./rfq";
export * as procurement from "./procurement";

export * from "./services";
export * from "./repositories";
export * from "./components";
export * from "./pages";

/** @gvg/plugin-marketplace */
export const plugin = definePlugin({
  manifest,
  routes: routes.map((r) =>
    defineRoute({
      path: r.path,
      component: r.page,
      title: r.title,
      auth: r.auth,
    }),
  ),
  navigation: navigationFlat.map((item) =>
    defineNavigation({
      label: item.label,
      href: item.href,
      roles: item.roles,
    }),
  ),
  permissions: permissions.map((key) => definePermission(key)),
  widgets: MARKETPLACE_STAT_WIDGETS.map((w) => defineDashboardWidget(w)),
  register(app) {
    app.logger?.info("marketplace registered");
  },
});

export default plugin;
