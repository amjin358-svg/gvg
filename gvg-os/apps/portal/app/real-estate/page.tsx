import { ModulePage } from "@/components/ModulePage";
import { getModule } from "@/lib/modules";

export default function RealEstatePage() {
  return <ModulePage module={getModule("/real-estate")} />;
}
