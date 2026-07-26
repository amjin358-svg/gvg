/**
 * GET /api/modules
 */

import {
  getModuleRegistry,
  listEnabledModules,
  listDisabledModules,
  MODULE_FLAGS,
} from "@gvg/core";

export function getModules() {
  const registry = getModuleRegistry();
  const registered = registry.listRecords().map((record) => ({
    id: record.module.metadata.id,
    name: record.module.metadata.name,
    version: record.module.metadata.version,
    kind: record.module.metadata.kind,
    status: record.status,
    href: record.module.metadata.href,
    dependencies: record.module.metadata.dependencies ?? [],
    error: record.error,
  }));

  return {
    flags: MODULE_FLAGS,
    enabled: listEnabledModules(),
    disabled: listDisabledModules(),
    registered,
    checkedAt: new Date().toISOString(),
  };
}
