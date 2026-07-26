/** CRM services */

export async function getOverview() {
  return {
    plugin: "crm",
    title: "客戶關係",
    status: "ready" as const,
  };
}
