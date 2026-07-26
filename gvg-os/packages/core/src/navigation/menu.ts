/**
 * Workspace module menu
 *
 * @example
 * export default [
 *   { id: "marketplace", title: "Marketplace", icon: "shopping-cart" }
 * ]
 */

export type MenuItem = {
  id: string;
  title: string;
  icon: string;
  href?: string;
  plugin?: string;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "marketplace",
    title: "Marketplace",
    icon: "shopping-cart",
    href: "/marketplace",
    plugin: "marketplace",
  },
  {
    id: "trade",
    title: "Trade",
    icon: "globe",
    href: "/trade",
    plugin: "trade",
  },
  {
    id: "warehouse",
    title: "Warehouse",
    icon: "package",
    href: "/warehouse",
    plugin: "warehouse",
  },
  {
    id: "crm",
    title: "CRM",
    icon: "users",
    href: "/crm",
    plugin: "crm",
  },
  {
    id: "ai-center",
    title: "AI Center",
    icon: "sparkles",
    href: "/ai-center",
    plugin: "ai-center",
  },
  {
    id: "investment",
    title: "Investment",
    icon: "trending-up",
    href: "/investment",
    plugin: "investment",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    icon: "building",
    href: "/real-estate",
    plugin: "real-estate",
  },
];

export default [
  {
    id: "marketplace",
    title: "Marketplace",
    icon: "shopping-cart",
  },
] satisfies MenuItem[];
