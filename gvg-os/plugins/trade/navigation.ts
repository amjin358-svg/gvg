/** Trade plugin navigation */

import { TRADE_MODULES } from "./modules";

export type NavEntry = {
  label: string;
  href: string;
  roles?: string[];
  children?: NavEntry[];
};

export const navigation: NavEntry[] = [
  {
    label: "Trade",
    href: "/trade",
    children: TRADE_MODULES.map((m) => ({
      label: m.label,
      href: m.href,
    })),
  },
];

export const navigationFlat: NavEntry[] = [
  { label: "Trade", href: "/trade" },
  ...TRADE_MODULES.map((m) => ({
    label: m.label,
    href: m.href,
  })),
];

export default navigation;
