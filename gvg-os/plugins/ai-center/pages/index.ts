import { getOverview } from "../services";

/** AI Center page loaders */

export async function HomePage() {
  return getOverview();
}
