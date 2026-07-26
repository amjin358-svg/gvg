/** Investment plugin routes */

export type PluginRoute = {
  path: string;
  page: string;
  title: string;
  auth?: boolean;
};

export const routes: PluginRoute[] = [
  {
    path: "/investment",
    page: "pages/Home",
    title: "投資",
  },
];

export default routes;
