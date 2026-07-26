/** Marketplace plugin navigation — primary pipeline order */

import { productNavigation } from "./product";
import { supplierNavigation } from "./supplier";
import { rfqNavigation } from "./rfq";
import { procurementNavigation } from "./procurement";

export type NavEntry = {
  label: string;
  href: string;
  roles?: string[];
  children?: NavEntry[];
};

/**
 * Marketplace
 *   ↓ Products
 *   ↓ Supplier
 *   ↓ RFQ
 *   ↓ Procurement
 */
export const navigation: NavEntry[] = [
  {
    label: "Marketplace",
    href: "/marketplace",
    children: [
      ...productNavigation,
      ...supplierNavigation,
      ...rfqNavigation,
      ...procurementNavigation,
    ],
  },
];

export const navigationFlat: NavEntry[] = [
  { label: "Marketplace", href: "/marketplace" },
  ...productNavigation,
  ...supplierNavigation,
  ...rfqNavigation,
  ...procurementNavigation,
];

export default navigation;
