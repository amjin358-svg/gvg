import { createGVGPlugin } from "@gvg/sdk";
import { manifest } from "./manifest";
import { routes } from "./routes";
import { permissions } from "./permissions";
import { navigationFlat } from "./navigation";

export { manifest } from "./manifest";
export { routes } from "./routes";
export { permissions, canWarehouse } from "./permissions";
export { navigation, navigationFlat } from "./navigation";
export { WAREHOUSE_MODULES, getWarehouseModule } from "./modules";
export type { WarehouseModule, WarehouseModuleId } from "./modules";
export * from "./services";
export * from "./repositories";
export * from "./components";
export * from "./pages";

/** @gvg/plugin-warehouse */
export const plugin = createGVGPlugin({
  manifest,
  routes: routes.map((r) => ({
    path: r.path,
    component: r.page,
    title: r.title,
    auth: r.auth,
  })),
  navigation: navigationFlat,
  permissions: [...permissions],
});

export default plugin;
