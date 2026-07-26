/** Procurement plugin permissions */

export const permissions = [
  "procurement:read",
  "procurement:write",
  "procurement:manage",
] as const;

export type PluginPermission = (typeof permissions)[number];

export default permissions;
