export const USER_ROLES = [
  "guest",
  "customer",
  "business_customer",
  "supplier",
  "sales",
  "purchasing",
  "warehouse",
  "finance",
  "admin",
  "super_admin",
  "ai_agent",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const ROLE_LABELS: Record<UserRole, string> = {
  guest: "Guest",
  customer: "Customer",
  business_customer: "Business Customer",
  supplier: "Supplier",
  sales: "Sales",
  purchasing: "Purchasing",
  warehouse: "Warehouse",
  finance: "Finance",
  admin: "Admin",
  super_admin: "Super Admin",
  ai_agent: "AI Agent",
};

export type OrganizationId = string;
export type UserId = string;

export type SessionUser = {
  id: UserId;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: OrganizationId;
  company?: string;
};
