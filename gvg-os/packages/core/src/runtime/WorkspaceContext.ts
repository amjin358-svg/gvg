/**
 * @gvg/core/runtime/WorkspaceContext
 *
 * Active workspace scope for the current runtime / request.
 */

import { AsyncLocalStorage } from "node:async_hooks";
import {
  getCurrentWorkspace,
  getWorkspace,
  selectWorkspace,
  type Workspace,
  type WorkspaceMembership,
} from "../workspace";

export type WorkspaceContext = {
  workspace: Workspace;
  membership?: WorkspaceMembership;
};

const als = new AsyncLocalStorage<WorkspaceContext>();

let active: WorkspaceContext | null = null;

export function createWorkspaceContext(
  workspace: Workspace,
  membership?: WorkspaceMembership,
): WorkspaceContext {
  return { workspace, membership };
}

export function getActiveWorkspaceContext(): WorkspaceContext | null {
  const fromAls = als.getStore();
  if (fromAls) return fromAls;
  if (active) return active;
  const workspace = getCurrentWorkspace();
  if (!workspace) return null;
  return { workspace };
}

export function requireActiveWorkspaceContext(): WorkspaceContext {
  const ctx = getActiveWorkspaceContext();
  if (!ctx) throw new Error("No active workspace context");
  return ctx;
}

export function setActiveWorkspaceContext(ctx: WorkspaceContext | null): void {
  active = ctx;
  if (ctx) {
    selectWorkspace(ctx.workspace.id);
  }
}

export function bindWorkspaceContext(workspaceId: string): WorkspaceContext {
  const workspace = getWorkspace(workspaceId);
  if (!workspace) throw new Error(`Unknown workspace: ${workspaceId}`);
  const ctx = createWorkspaceContext(workspace);
  setActiveWorkspaceContext(ctx);
  return ctx;
}

export function runWithWorkspaceContext<T>(
  ctx: WorkspaceContext,
  fn: () => T,
): T {
  active = ctx;
  selectWorkspace(ctx.workspace.id);
  return als.run(ctx, fn);
}

export async function runWithWorkspaceContextAsync<T>(
  ctx: WorkspaceContext,
  fn: () => Promise<T>,
): Promise<T> {
  active = ctx;
  selectWorkspace(ctx.workspace.id);
  return als.run(ctx, fn);
}

export function resetWorkspaceContext(): void {
  active = null;
}
