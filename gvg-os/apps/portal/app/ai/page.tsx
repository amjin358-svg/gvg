import { ModulePage } from "@/components/ModulePage";
import { getModule } from "@/lib/modules";

export default function AiPage() {
  return <ModulePage module={getModule("/ai")} />;
}
