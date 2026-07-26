import { ModulePage } from "@/components/ModulePage";
import { getModule } from "@/lib/modules";

export default function BusinessPage() {
  return <ModulePage module={getModule("/business")} />;
}
