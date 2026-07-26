/** AI Center plugin permissions */

export const permissions = [
  "ai:read",
  "ai:write",
  "ai:manage",
] as const;

export type PluginPermission = (typeof permissions)[number];

export default permissions;
