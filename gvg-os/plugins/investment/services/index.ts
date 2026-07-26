/** Investment services */

export async function getOverview() {
  return {
    plugin: "investment",
    title: "投資",
    status: "ready" as const,
  };
}
