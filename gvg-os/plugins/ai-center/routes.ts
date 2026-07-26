/** AI Center plugin routes */

export type PluginRoute = {
  path: string;
  page: string;
  title: string;
  auth?: boolean;
};

export const routes: PluginRoute[] = [
  {
    path: "/ai",
    page: "pages/Home",
    title: "AI 中心",
  },
];

export default routes;
