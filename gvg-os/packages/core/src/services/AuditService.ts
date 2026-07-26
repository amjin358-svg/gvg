/**
 * @gvg/core/services/AuditService
 */

import {
  clearAudit,
  listAudit,
  recordAudit,
  type AuditAction,
  type AuditActor,
  type AuditEntry,
} from "../audit";

export class AuditService {
  record(
    input: Omit<AuditEntry, "id" | "occurredAt"> & {
      id?: string;
      occurredAt?: string;
    },
  ): AuditEntry {
    return recordAudit(input);
  }

  list(filter?: {
    action?: AuditAction;
    tenantId?: string;
    workspaceId?: string;
    limit?: number;
  }): AuditEntry[] {
    return listAudit(filter);
  }

  clear(): void {
    clearAudit();
  }

  track(
    action: AuditAction,
    actor: AuditActor,
    extras: Partial<
      Pick<
        AuditEntry,
        "tenantId" | "workspaceId" | "resourceType" | "resourceId" | "metadata"
      >
    > = {},
  ): AuditEntry {
    return recordAudit({ action, actor, ...extras });
  }
}

export function createAuditService(): AuditService {
  return new AuditService();
}
