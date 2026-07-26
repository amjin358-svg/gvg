import { getOverview } from "../services";

/** Procurement page loaders */

export async function HomePage() {
  return getOverview();
}
