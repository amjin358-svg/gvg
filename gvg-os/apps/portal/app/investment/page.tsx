import { ModulePage } from "@/components/ModulePage";
import { getModule } from "@/lib/modules";

export default function InvestmentPage() {
  return <ModulePage module={getModule("/investment")} />;
}
