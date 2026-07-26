import { createGVGPlugin } from "@gvg/sdk";
import { manifest } from "./manifest";
import { routes } from "./routes";
import { permissions } from "./permissions";
import { navigation } from "./navigation";

export { manifest } from "./manifest";
export { routes } from "./routes";
export { permissions } from "./permissions";
export { navigation } from "./navigation";
export * from "./services";
export * from "./repositories";
export * from "./components";
export * from "./pages";

/** @gvg/plugin-investment */
export const plugin = createGVGPlugin({
  manifest,
  routes: routes.map((r) => ({
    path: r.path,
    component: r.page,
    title: r.title,
    auth: r.auth,
  })),
  navigation,
  permissions: [...permissions],
});

export default plugin;
