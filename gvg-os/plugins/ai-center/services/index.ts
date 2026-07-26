/** AI Center services */

export async function getOverview() {
  return {
    plugin: "ai-center",
    title: "AI 中心",
    status: "ready" as const,
  };
}
