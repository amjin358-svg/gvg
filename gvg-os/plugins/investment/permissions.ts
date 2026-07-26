/** Investment plugin permissions */

export const permissions = [
  "investment:read",
  "investment:write",
  "investment:manage",
] as const;

export type PluginPermission = (typeof permissions)[number];

export default permissions;
