/** Warehouse plugin permissions */

export const permissions = [
  "warehouse:read",
  "warehouse:write",
  "warehouse:manage",
  "warehouse:adjust_stock",
  "inventory.read",
  "inventory.write",
  "bin.read",
  "bin.write",
  "barcode.read",
  "barcode.write",
  "picking.read",
  "picking.write",
  "packing.read",
  "packing.write",
  "receiving.read",
  "receiving.write",
  "shipping.read",
  "shipping.write",
] as const;

export type PluginPermission = (typeof permissions)[number];

export const roleGrants: Record<string, PluginPermission[]> = {
  guest: [],
  warehouse: [
    "warehouse:read",
    "warehouse:write",
    "warehouse:adjust_stock",
    "inventory.read",
    "inventory.write",
    "bin.read",
    "bin.write",
    "barcode.read",
    "barcode.write",
    "picking.read",
    "picking.write",
    "packing.read",
    "packing.write",
    "receiving.read",
    "receiving.write",
    "shipping.read",
    "shipping.write",
  ],
  purchasing: [
    "warehouse:read",
    "inventory.read",
    "receiving.read",
    "shipping.read",
  ],
  admin: [...permissions],
  super_admin: [...permissions],
};

export function canWarehouse(
  role: string,
  permission: PluginPermission,
): boolean {
  return (roleGrants[role] ?? []).includes(permission);
}

export default permissions;
