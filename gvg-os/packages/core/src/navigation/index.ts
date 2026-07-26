/** @gvg/core/navigation — nav trees by app / role */

import type { UserRole } from "../roles";
import type { NavItem } from "../domain";
import { WORKSPACE_NAV } from "./workspace";

export type AppShell = "website" | "admin" | "buyer" | "supplier" | "workspace";

export type NavTree = {
  app: AppShell;
  items: NavItem[];
};

export {
  WORKSPACE_NAV,
  getWorkspaceNav,
  getEnabledWorkspaceNav,
  getEnabledMenuItems,
  getWorkspaceModule,
  MENU_ITEMS,
  menu,
} from "./workspace";
export type { WorkspaceModuleId, WorkspaceNavItem, MenuItem } from "./workspace";
export { default as defaultMenu } from "./menu";

const trees: Record<AppShell, NavItem[]> = {
  website: [
    { label: "首頁", href: "/" },
    { label: "產品中心", href: "/products" },
    { label: "全球採購", href: "/procurement" },
    { label: "國際貿易", href: "/trade" },
    { label: "AI 智慧服務", href: "/ai" },
  ],
  workspace: WORKSPACE_NAV.map((item) => ({
    label: item.label,
    href: item.href,
    description: item.labelZh,
  })),
  admin: WORKSPACE_NAV.map((item) => ({
    label: item.label,
    href: item.href,
    description: item.labelZh,
  })),
  buyer: [
    { label: "Overview", href: "/portal/customer" },
    { label: "RFQs", href: "/rfq" },
    { label: "Orders", href: "/orders" },
    { label: "Quotes", href: "/quotes" },
  ],
  supplier: [
    { label: "Overview", href: "/portal/supplier" },
    { label: "RFQs", href: "/rfq" },
    { label: "Quotes", href: "/quotes" },
    { label: "Shipments", href: "/logistics" },
  ],
};

export function getNav(app: AppShell): NavItem[] {
  return trees[app];
}

export function getNavForRole(app: AppShell, role: UserRole): NavItem[] {
  const items = getNav(app);
  if (role === "guest" && app !== "website") return [];
  return items;
}

export function defineNav(app: AppShell, items: NavItem[]): void {
  trees[app] = items;
}
