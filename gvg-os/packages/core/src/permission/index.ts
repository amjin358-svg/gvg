/** @gvg/core/permission — permission codes + checks */

import type { UserRole } from "../roles";

export type Permission =
  | "products.read"
  | "products.write"
  | "supplier.manage"
  | "rfq.create"
  | "rfq:create"
  | "rfq:read"
  | "quote:create"
  | "quote:accept"
  | "order:read"
  | "order:update_status"
  | "warehouse:adjust_stock"
  | "admin:manage_users"
  | "analytics:read"
  | (string & {});

const rolePermissions: Partial<Record<UserRole, Permission[]>> = {
  guest: ["products.read", "rfq:read"],
  customer: [
    "products.read",
    "rfq.create",
    "rfq:create",
    "rfq:read",
    "quote:accept",
    "order:read",
  ],
  business_customer: [
    "products.read",
    "rfq.create",
    "rfq:create",
    "rfq:read",
    "quote:accept",
    "order:read",
    "analytics:read",
  ],
  supplier: [
    "products.read",
    "products.write",
    "supplier.manage",
    "rfq:read",
    "quote:create",
    "order:read",
  ],
  sales: ["products.read", "rfq:read", "quote:create", "order:read", "order:update_status"],
  purchasing: [
    "products.read",
    "rfq.create",
    "supplier.manage",
    "rfq:create",
    "rfq:read",
    "quote:accept",
    "order:read",
  ],
  warehouse: ["order:read", "warehouse:adjust_stock"],
  finance: ["order:read", "analytics:read"],
  admin: [
    "products.read",
    "products.write",
    "supplier.manage",
    "rfq.create",
    "rfq:create",
    "rfq:read",
    "quote:create",
    "quote:accept",
    "order:read",
    "order:update_status",
    "warehouse:adjust_stock",
    "admin:manage_users",
    "analytics:read",
  ],
  super_admin: [
    "products.read",
    "products.write",
    "supplier.manage",
    "rfq.create",
    "rfq:create",
    "rfq:read",
    "quote:create",
    "quote:accept",
    "order:read",
    "order:update_status",
    "warehouse:adjust_stock",
    "admin:manage_users",
    "analytics:read",
  ],
  ai_agent: ["products.read", "rfq:read", "order:read", "analytics:read"],
};

export function permissionsFor(role: UserRole): Permission[] {
  return rolePermissions[role] ?? [];
}

export function can(role: UserRole, permission: Permission): boolean {
  return permissionsFor(role).includes(permission);
}

export function assertCan(role: UserRole, permission: Permission): void {
  if (!can(role, permission)) {
    throw new Error(`Forbidden: ${role} lacks ${permission}`);
  }
}
