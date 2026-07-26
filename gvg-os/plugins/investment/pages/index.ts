import { getOverview } from "../services";

/** Investment page loaders */

export async function HomePage() {
  return getOverview();
}
