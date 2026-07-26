/** CRM plugin permissions */

export const permissions = [
  "crm:read",
  "crm:write",
  "crm:manage",
] as const;

export type PluginPermission = (typeof permissions)[number];

export default permissions;
