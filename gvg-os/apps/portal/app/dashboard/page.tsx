import { ModulePage } from "@/components/ModulePage";
import { getModule } from "@/lib/modules";

export default function DashboardPage() {
  return <ModulePage module={getModule("/dashboard")} />;
}
