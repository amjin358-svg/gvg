/** Trade services */

import { getTradeStats } from "../stats";

export async function getOverview() {
  const stats = await getTradeStats();
  return {
    plugin: "trade",
    title: "國際貿易",
    status: "ready" as const,
    stats,
  };
}
