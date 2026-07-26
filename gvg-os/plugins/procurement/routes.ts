/** Procurement plugin routes */

export type PluginRoute = {
  path: string;
  page: string;
  title: string;
  auth?: boolean;
};

export const routes: PluginRoute[] = [
  {
    path: "/procurement",
    page: "pages/Home",
    title: "全球採購",
  },
];

export default routes;
