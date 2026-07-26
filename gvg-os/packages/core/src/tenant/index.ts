/** @gvg/core/tenant — multi-tenant identity */

import type { OrganizationId } from "../roles";

export type TenantPlan = "starter" | "growth" | "enterprise";

export type Tenant = {
  id: OrganizationId;
  slug: string;
  name: string;
  plan: TenantPlan;
  locale: string;
  timezone: string;
  active: boolean;
};

export type TenantContext = {
  tenant: Tenant;
  features: string[];
};

let active: TenantContext | null = null;

export function setTenantContext(ctx: TenantContext | null): void {
  active = ctx;
}

export function getTenantContext(): TenantContext | null {
  return active;
}

export function requireTenant(): TenantContext {
  if (!active) throw new Error("No active tenant context");
  return active;
}

export function createTenant(input: Omit<Tenant, "active"> & { active?: boolean }): Tenant {
  return { active: true, ...input };
}
