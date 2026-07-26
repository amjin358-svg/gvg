/** Warehouse plugin navigation */

import { WAREHOUSE_MODULES } from "./modules";

export type NavEntry = {
  label: string;
  href: string;
  roles?: string[];
  children?: NavEntry[];
};

export const navigation: NavEntry[] = [
  {
    label: "Warehouse",
    href: "/warehouse",
    children: WAREHOUSE_MODULES.map((m) => ({
      label: m.label,
      href: m.href,
    })),
  },
];

export const navigationFlat: NavEntry[] = [
  { label: "Warehouse", href: "/warehouse" },
  ...WAREHOUSE_MODULES.map((m) => ({
    label: m.label,
    href: m.href,
  })),
];

export default navigation;
