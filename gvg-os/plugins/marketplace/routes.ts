/** Marketplace plugin routes — composed from domain modules */

import { productRoutes } from "./product";
import { supplierRoutes } from "./supplier";
import { rfqRoutes } from "./rfq";
import { procurementRoutes } from "./procurement";

export type PluginRoute = {
  path: string;
  page: string;
  title: string;
  auth?: boolean;
};

export const routes: PluginRoute[] = [
  {
    path: "/marketplace",
    page: "pages/MarketplaceHome",
    title: "Marketplace",
  },
  ...productRoutes,
  ...supplierRoutes,
  ...rfqRoutes,
  ...procurementRoutes,
];

export default routes;
