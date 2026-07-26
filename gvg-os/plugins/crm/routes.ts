/** CRM plugin routes */

export type PluginRoute = {
  path: string;
  page: string;
  title: string;
  auth?: boolean;
};

export const routes: PluginRoute[] = [
  {
    path: "/crm",
    page: "pages/Home",
    title: "客戶關係",
  },
];

export default routes;
