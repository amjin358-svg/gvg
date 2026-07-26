/** Real Estate plugin permissions */

export const permissions = [
  "real_estate:read",
  "real_estate:write",
  "real_estate:manage",
] as const;

export type PluginPermission = (typeof permissions)[number];

export default permissions;
