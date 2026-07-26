import { getOverview } from "../services";

/** Real Estate page loaders */

export async function HomePage() {
  return getOverview();
}
