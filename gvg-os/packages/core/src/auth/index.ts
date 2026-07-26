/** @gvg/core/auth — Authentication and session helpers */

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export type AuthSession = {
  user: AuthUser;
  token: string;
  workspaceId: string | null;
  /** True after workspace plugins have been booted for this session */
  pluginsLoaded?: boolean;
  createdAt: string;
};

export const AUTH_STORAGE_KEY = "gvg.auth.session";
export const WORKSPACE_STORAGE_KEY = "gvg.activeWorkspaceId";

export function createSession(
  user: Pick<AuthUser, "email" | "name"> & Partial<AuthUser>,
  workspaceId: string | null = null,
): AuthSession {
  return {
    user: {
      id: user.id ?? crypto.randomUUID(),
      email: user.email,
      name: user.name,
      role: user.role ?? "admin",
    },
    token: `gvg_${crypto.randomUUID().replace(/-/g, "")}`,
    workspaceId,
    pluginsLoaded: false,
    createdAt: new Date().toISOString(),
  };
}

/** Demo login — accepts any non-empty email/password */
export function login(email: string, password: string): AuthSession {
  const trimmed = email.trim();
  if (!trimmed || !password) {
    throw new Error("Email and password are required");
  }
  const namePart = trimmed.split("@")[0] || "GVG User";
  return createSession({
    email: trimmed,
    name: namePart,
    role: "admin",
  });
}

export function readSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function writeSession(session: AuthSession): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  if (session.workspaceId) {
    window.localStorage.setItem(WORKSPACE_STORAGE_KEY, session.workspaceId);
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function setSessionWorkspace(
  session: AuthSession,
  workspaceId: string,
): AuthSession {
  const next: AuthSession = {
    ...session,
    workspaceId,
    pluginsLoaded: false,
  };
  writeSession(next);
  return next;
}

export function setPluginsLoaded(
  session: AuthSession,
  loaded = true,
): AuthSession {
  const next: AuthSession = { ...session, pluginsLoaded: loaded };
  writeSession(next);
  return next;
}

export function logout(): void {
  clearSession();
}

export function isAuthenticated(session: AuthSession | null): boolean {
  return Boolean(session?.token && session.user?.email);
}

export function hasWorkspace(session: AuthSession | null): boolean {
  return Boolean(session?.workspaceId);
}

export function hasPluginsLoaded(session: AuthSession | null): boolean {
  return Boolean(session?.pluginsLoaded);
}

/**
 * Resolve next route after login.
 * Login → Workspace Selector → Load Plugins → Dashboard
 */
export function resolveAuthPath(session: AuthSession | null): string {
  if (!isAuthenticated(session)) return "/login";
  if (!hasWorkspace(session)) return "/select-workspace";
  if (!hasPluginsLoaded(session)) return "/load-plugins";
  return "/dashboard";
}
