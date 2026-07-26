/** Primary GVG Workspace navigation */

import { isModuleEnabled } from "../featureFlag/modules";
import MENU_ITEMS, { type MenuItem } from "./menu";

export type WorkspaceModuleId =
  | "workspace"
  | "dashboard"
  | "marketplace"
  | "trade"
  | "warehouse"
  | "crm"
  | "investment"
  | "real-estate"
  | "ai-center"
  | "settings";

export type WorkspaceNavItem = {
  id: WorkspaceModuleId;
  label: string;
  labelZh: string;
  href: string;
  plugin?: string;
  icon?: string;
};

const MENU_ICON: Record<string, string> = Object.fromEntries(
  MENU_ITEMS.map((item) => [item.id, item.icon]),
);

export const WORKSPACE_NAV: WorkspaceNavItem[] = [
  {
    id: "workspace",
    label: "Workspace",
    labelZh: "工作區",
    href: "/workspace",
    icon: "layout",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    labelZh: "儀表板",
    href: "/dashboard",
    icon: "gauge",
  },
  {
    id: "marketplace",
    label: "Marketplace",
    labelZh: "市集",
    href: "/marketplace",
    plugin: "marketplace",
    icon: MENU_ICON.marketplace ?? "shopping-cart",
  },
  {
    id: "trade",
    label: "Trade",
    labelZh: "貿易",
    href: "/trade",
    plugin: "trade",
    icon: MENU_ICON.trade ?? "globe",
  },
  {
    id: "warehouse",
    label: "Warehouse",
    labelZh: "倉儲",
    href: "/warehouse",
    plugin: "warehouse",
    icon: MENU_ICON.warehouse ?? "package",
  },
  {
    id: "crm",
    label: "CRM",
    labelZh: "客戶關係",
    href: "/crm",
    plugin: "crm",
    icon: MENU_ICON.crm ?? "users",
  },
  {
    id: "investment",
    label: "Investment",
    labelZh: "投資",
    href: "/investment",
    plugin: "investment",
    icon: MENU_ICON.investment ?? "trending-up",
  },
  {
    id: "real-estate",
    label: "Real Estate",
    labelZh: "不動產",
    href: "/real-estate",
    plugin: "real-estate",
    icon: MENU_ICON["real-estate"] ?? "building",
  },
  {
    id: "ai-center",
    label: "AI Center",
    labelZh: "AI 中心",
    href: "/ai-center",
    plugin: "ai-center",
    icon: MENU_ICON["ai-center"] ?? "sparkles",
  },
  {
    id: "settings",
    label: "Settings",
    labelZh: "設定",
    href: "/settings",
    icon: "settings",
  },
];

/** Full nav (unfiltered) */
export function getWorkspaceNav(): WorkspaceNavItem[] {
  return WORKSPACE_NAV;
}

/** Nav filtered by module feature flags */
export function getEnabledWorkspaceNav(): WorkspaceNavItem[] {
  return WORKSPACE_NAV.filter((item) => {
    if (!item.plugin) return true;
    return isModuleEnabled(item.plugin);
  });
}

/** Menu items filtered by feature flags */
export function getEnabledMenuItems(): MenuItem[] {
  return MENU_ITEMS.filter((item) => {
    if (!item.plugin) return true;
    return isModuleEnabled(item.plugin);
  });
}

export function getWorkspaceModule(
  id: WorkspaceModuleId,
): WorkspaceNavItem | undefined {
  return WORKSPACE_NAV.find((item) => item.id === id);
}

export { MENU_ITEMS };
export type { MenuItem };
export { default as menu } from "./menu";
