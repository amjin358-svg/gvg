import { getOverview } from "../services";

/** CRM page loaders */

export async function HomePage() {
  return getOverview();
}
