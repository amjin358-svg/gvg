/** Warehouse services */

export async function getOverview() {
  return {
    plugin: "warehouse",
    title: "倉儲",
    status: "ready" as const,
  };
}
