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
import { TRADE_STAT_WIDGETS } from "./stats";

export { manifest } from "./manifest";
export { routes } from "./routes";
export { permissions, canTrade } from "./permissions";
export { navigation, navigationFlat } from "./navigation";
export { TRADE_MODULES, getTradeModule } from "./modules";
export type { TradeModule, TradeModuleId } from "./modules";
export { getTradeStats, TRADE_STAT_WIDGETS } from "./stats";
export type { TradeStat, TradeStatId } from "./stats";
export * from "./services";
export * from "./repositories";
export * from "./components";
export * from "./pages";

/** @gvg/plugin-trade */
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
  widgets: TRADE_STAT_WIDGETS.map((w) => defineDashboardWidget(w)),
  register(app) {
    app.logger?.info("trade registered");
  },
});

export default plugin;
