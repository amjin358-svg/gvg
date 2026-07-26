/**
 * @gvg/core/config/License
 *
 * Product license / entitlement gating for GVG OS modules.
 */

export type LicensePlan = "trial" | "starter" | "growth" | "enterprise";

export type LicenseStatus = "active" | "expired" | "suspended" | "invalid";

export type LicenseEntitlement =
  | "marketplace"
  | "trade"
  | "procurement"
  | "warehouse"
  | "crm"
  | "ai-center"
  | "investment"
  | "real-estate"
  | "api"
  | "sso"
  | "white-label";

export type License = {
  id: string;
  tenantId: string;
  plan: LicensePlan;
  status: LicenseStatus;
  entitlements: LicenseEntitlement[];
  seats?: number;
  issuedAt: string;
  expiresAt?: string;
  meta?: Record<string, unknown>;
};

const PLAN_ENTITLEMENTS: Record<LicensePlan, LicenseEntitlement[]> = {
  trial: ["marketplace", "trade", "procurement", "api"],
  starter: ["marketplace", "trade", "procurement", "api"],
  growth: [
    "marketplace",
    "trade",
    "procurement",
    "warehouse",
    "crm",
    "ai-center",
    "api",
  ],
  enterprise: [
    "marketplace",
    "trade",
    "procurement",
    "warehouse",
    "crm",
    "ai-center",
    "investment",
    "real-estate",
    "api",
    "sso",
    "white-label",
  ],
};

let active: License | null = null;

export function createLicense(
  input: Omit<License, "id" | "issuedAt" | "entitlements" | "status"> & {
    id?: string;
    issuedAt?: string;
    status?: LicenseStatus;
    entitlements?: LicenseEntitlement[];
  },
): License {
  const plan = input.plan;
  return {
    id: input.id ?? crypto.randomUUID(),
    tenantId: input.tenantId,
    plan,
    status: input.status ?? "active",
    entitlements: input.entitlements ?? [...PLAN_ENTITLEMENTS[plan]],
    seats: input.seats,
    issuedAt: input.issuedAt ?? new Date().toISOString(),
    expiresAt: input.expiresAt,
    meta: input.meta ? { ...input.meta } : undefined,
  };
}

export function setLicense(license: License | null): void {
  active = license ? { ...license, entitlements: [...license.entitlements] } : null;
}

export function getLicense(): License | null {
  return active
    ? { ...active, entitlements: [...active.entitlements] }
    : null;
}

export function requireLicense(): License {
  const license = getLicense();
  if (!license) throw new Error("No active license");
  return license;
}

export function clearLicense(): void {
  active = null;
}

export function isLicenseValid(
  license: License | null = getLicense(),
  now = new Date(),
): boolean {
  if (!license) return false;
  if (license.status !== "active") return false;
  if (license.expiresAt && new Date(license.expiresAt).getTime() < now.getTime()) {
    return false;
  }
  return true;
}

export function hasEntitlement(
  entitlement: LicenseEntitlement,
  license: License | null = getLicense(),
): boolean {
  if (!isLicenseValid(license)) return false;
  return Boolean(license?.entitlements.includes(entitlement));
}

export function assertEntitlement(entitlement: LicenseEntitlement): void {
  if (!hasEntitlement(entitlement)) {
    throw new Error(`License entitlement required: ${entitlement}`);
  }
}

export function planEntitlements(plan: LicensePlan): LicenseEntitlement[] {
  return [...PLAN_ENTITLEMENTS[plan]];
}

export class LicenseService {
  static create = createLicense;
  static set = setLicense;
  static get = getLicense;
  static require = requireLicense;
  static clear = clearLicense;
  static isValid = isLicenseValid;
  static has = hasEntitlement;
  static assert = assertEntitlement;
  static planEntitlements = planEntitlements;
}
