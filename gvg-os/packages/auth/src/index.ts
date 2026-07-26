/** @gvg/auth — re-exports @gvg/core/auth */

export {
  login,
  logout,
  createSession,
  readSession,
  writeSession,
  clearSession,
  setSessionWorkspace,
  setPluginsLoaded,
  isAuthenticated,
  hasWorkspace,
  hasPluginsLoaded,
  resolveAuthPath,
  AUTH_STORAGE_KEY,
  WORKSPACE_STORAGE_KEY,
} from "@gvg/core/auth";

export type { AuthUser, AuthSession } from "@gvg/core/auth";

export const name = "@gvg/auth";
export const version = "0.1.0";
