/** Procurement services */

export async function getOverview() {
  return {
    plugin: "procurement",
    title: "全球採購",
    status: "ready" as const,
  };
}
