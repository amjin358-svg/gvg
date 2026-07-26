/** Real Estate services */

export async function getOverview() {
  return {
    plugin: "real-estate",
    title: "不動產",
    status: "ready" as const,
  };
}
