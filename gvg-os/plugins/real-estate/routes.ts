/** Real Estate plugin routes */

export type PluginRoute = {
  path: string;
  page: string;
  title: string;
  auth?: boolean;
};

export const routes: PluginRoute[] = [
  {
    path: "/real-estate",
    page: "pages/Home",
    title: "不動產",
  },
];

export default routes;
