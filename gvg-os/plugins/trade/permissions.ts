/** Trade plugin permissions */

export const permissions = [
  "trade:read",
  "trade:write",
  "trade:manage",
  "po.read",
  "po.write",
  "shipment.read",
  "shipment.write",
  "customs.read",
  "customs.write",
  "invoice.read",
  "invoice.write",
  "packing-list.read",
  "packing-list.write",
  "tracking.read",
  "documents.read",
  "documents.write",
] as const;

export type PluginPermission = (typeof permissions)[number];

export const roleGrants: Record<string, PluginPermission[]> = {
  guest: [],
  customer: [
    "trade:read",
    "po.read",
    "shipment.read",
    "tracking.read",
    "documents.read",
    "invoice.read",
  ],
  business_customer: [
    "trade:read",
    "po.read",
    "shipment.read",
    "customs.read",
    "invoice.read",
    "packing-list.read",
    "tracking.read",
    "documents.read",
  ],
  supplier: [
    "trade:read",
    "po.read",
    "shipment.read",
    "shipment.write",
    "packing-list.read",
    "packing-list.write",
    "tracking.read",
    "documents.read",
    "documents.write",
  ],
  purchasing: [
    "trade:read",
    "trade:write",
    "po.read",
    "po.write",
    "shipment.read",
    "customs.read",
    "invoice.read",
    "packing-list.read",
    "tracking.read",
    "documents.read",
    "documents.write",
  ],
  admin: [...permissions],
  super_admin: [...permissions],
};

export function canTrade(role: string, permission: PluginPermission): boolean {
  return (roleGrants[role] ?? []).includes(permission);
}

export default permissions;
