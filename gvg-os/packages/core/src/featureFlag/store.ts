/** @gvg/core/featureFlag — flag store */

export type FeatureFlag = {
  key: string;
  enabled: boolean;
  description?: string;
  tenants?: string[];
};

const flags = new Map<string, FeatureFlag>();

export function defineFlag(flag: FeatureFlag): void {
  flags.set(flag.key, flag);
}

export function defineFlags(list: FeatureFlag[]): void {
  list.forEach(defineFlag);
}

export function isEnabled(key: string, tenantId?: string): boolean {
  const flag = flags.get(key);
  if (!flag) return false;
  if (!flag.enabled) return false;
  if (flag.tenants?.length && tenantId) {
    return flag.tenants.includes(tenantId);
  }
  if (flag.tenants?.length && !tenantId) return false;
  return true;
}

export function setFlag(key: string, enabled: boolean): void {
  const existing = flags.get(key);
  if (existing) {
    flags.set(key, { ...existing, enabled });
    return;
  }
  flags.set(key, { key, enabled });
}

export function listFlags(): FeatureFlag[] {
  return Array.from(flags.values());
}

export function clearFlags(): void {
  flags.clear();
}
