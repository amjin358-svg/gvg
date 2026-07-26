/** Marketplace plugin permissions — composed from domain modules */

import { productPermissions } from "./product";
import { supplierPermissions } from "./supplier";
import { rfqPermissions } from "./rfq";
import { procurementPermissions } from "./procurement";

export const permissions = [
  ...productPermissions,
  ...supplierPermissions,
  ...rfqPermissions,
  ...procurementPermissions,
] as const;

export type MarketplacePermission = (typeof permissions)[number];

export const roleGrants: Record<string, MarketplacePermission[]> = {
  guest: [
    "products.read",
    "categories.read",
    "brands.read",
    "ai.search",
  ],
  customer: [
    "products.read",
    "categories.read",
    "brands.read",
    "rfq.create",
    "rfq.read",
    "favorites.read",
    "favorites.write",
    "ai.search",
  ],
  business_customer: [
    "products.read",
    "categories.read",
    "brands.read",
    "rfq.create",
    "rfq.read",
    "procurement.read",
    "favorites.read",
    "favorites.write",
    "ai.search",
  ],
  supplier: [
    "products.read",
    "products.write",
    "categories.read",
    "brands.read",
    "supplier.manage",
    "supplier.read",
    "rfq.read",
    "ai.search",
  ],
  purchasing: [
    "products.read",
    "categories.read",
    "brands.read",
    "supplier.read",
    "supplier.manage",
    "rfq.create",
    "rfq.read",
    "procurement.read",
    "procurement.write",
    "favorites.read",
    "favorites.write",
    "ai.search",
  ],
  admin: [...permissions],
  super_admin: [...permissions],
};

export function canMarketplace(
  role: string,
  permission: MarketplacePermission,
): boolean {
  return (roleGrants[role] ?? []).includes(permission);
}

export default permissions;
