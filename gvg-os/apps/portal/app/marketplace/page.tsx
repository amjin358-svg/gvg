import { ModulePage } from "@/components/ModulePage";
import { getModule } from "@/lib/modules";

export default function MarketplacePage() {
  return <ModulePage module={getModule("/marketplace")} />;
}
