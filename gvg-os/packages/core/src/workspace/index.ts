/** @gvg/core/workspace — workspace / org unit within a tenant */

import type { OrganizationId, UserId } from "../roles";

export type WorkspaceKind = "hq" | "region" | "branch" | "project" | "admin";

export type Workspace = {
  id: string;
  tenantId: OrganizationId;
  name: string;
  slug: string;
  kind: WorkspaceKind;
  parentId?: string;
  locale?: string;
  region?: string;
};

export type WorkspaceMembership = {
  workspaceId: string;
  userId: UserId;
  role: string;
};

/** Select Workspace — seeded GVG workspaces (login order) */
export const WORKSPACE_OPTIONS: Workspace[] = [
  {
    id: "ws-gvg-hq",
    tenantId: "org-gvg",
    name: "Global Vista Group",
    slug: "global-vista-group",
    kind: "hq",
    region: "Global",
    locale: "en",
  },
  {
    id: "ws-usa",
    tenantId: "org-gvg",
    name: "USA Office",
    slug: "usa-office",
    kind: "branch",
    parentId: "ws-gvg-hq",
    region: "US",
    locale: "en",
  },
  {
    id: "ws-taiwan",
    tenantId: "org-gvg",
    name: "Taiwan Office",
    slug: "taiwan-office",
    kind: "branch",
    parentId: "ws-gvg-hq",
    region: "TW",
    locale: "zh-Hant",
  },
  {
    id: "ws-marketplace-admin",
    tenantId: "org-gvg",
    name: "Marketplace Admin",
    slug: "marketplace-admin",
    kind: "admin",
    parentId: "ws-gvg-hq",
    region: "Global",
    locale: "en",
  },
];

let currentWorkspaceId: string | null = WORKSPACE_OPTIONS[0]?.id ?? null;

export function listWorkspaces(): Workspace[] {
  return WORKSPACE_OPTIONS;
}

export function getWorkspace(id: string): Workspace | undefined {
  return WORKSPACE_OPTIONS.find((w) => w.id === id);
}

export function setCurrentWorkspace(id: string | null): void {
  if (id && !getWorkspace(id)) {
    throw new Error(`Unknown workspace: ${id}`);
  }
  currentWorkspaceId = id;
}

export function getCurrentWorkspaceId(): string | null {
  return currentWorkspaceId;
}

export function getCurrentWorkspace(): Workspace | null {
  if (!currentWorkspaceId) return null;
  return getWorkspace(currentWorkspaceId) ?? null;
}

export function selectWorkspace(id: string): Workspace {
  const workspace = getWorkspace(id);
  if (!workspace) throw new Error(`Unknown workspace: ${id}`);
  currentWorkspaceId = id;
  return workspace;
}

export function createWorkspace(
  input: Omit<Workspace, "id"> & { id?: string },
): Workspace {
  return {
    id: input.id ?? crypto.randomUUID(),
    tenantId: input.tenantId,
    name: input.name,
    slug: input.slug,
    kind: input.kind,
    parentId: input.parentId,
    locale: input.locale,
    region: input.region,
  };
}
