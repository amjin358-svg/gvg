/** @gvg/core/audit — audit trail for security / compliance */

export type AuditAction =
  | "auth.login"
  | "auth.logout"
  | "workspace.select"
  | "permission.denied"
  | "resource.create"
  | "resource.update"
  | "resource.delete"
  | "plugin.boot"
  | "config.change"
  | (string & {});

export type AuditActor = {
  userId?: string;
  email?: string;
  role?: string;
  ip?: string;
};

export type AuditEntry = {
  id: string;
  action: AuditAction;
  actor: AuditActor;
  tenantId?: string;
  workspaceId?: string;
  resourceType?: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  occurredAt: string;
};

const entries: AuditEntry[] = [];

export function createAuditEntry(
  input: Omit<AuditEntry, "id" | "occurredAt"> & {
    id?: string;
    occurredAt?: string;
  },
): AuditEntry {
  return {
    id: input.id ?? crypto.randomUUID(),
    action: input.action,
    actor: input.actor,
    tenantId: input.tenantId,
    workspaceId: input.workspaceId,
    resourceType: input.resourceType,
    resourceId: input.resourceId,
    metadata: input.metadata,
    occurredAt: input.occurredAt ?? new Date().toISOString(),
  };
}

export function recordAudit(
  input: Omit<AuditEntry, "id" | "occurredAt"> & {
    id?: string;
    occurredAt?: string;
  },
): AuditEntry {
  const entry = createAuditEntry(input);
  entries.push(entry);
  return entry;
}

export function listAudit(filter?: {
  action?: AuditAction;
  tenantId?: string;
  workspaceId?: string;
  limit?: number;
}): AuditEntry[] {
  let out = [...entries];
  if (filter?.action) out = out.filter((e) => e.action === filter.action);
  if (filter?.tenantId) out = out.filter((e) => e.tenantId === filter.tenantId);
  if (filter?.workspaceId) {
    out = out.filter((e) => e.workspaceId === filter.workspaceId);
  }
  out.sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
  if (filter?.limit) out = out.slice(0, filter.limit);
  return out;
}

export function clearAudit(): void {
  entries.length = 0;
}

export class AuditLog {
  static record = recordAudit;
  static list = listAudit;
  static clear = clearAudit;
}
