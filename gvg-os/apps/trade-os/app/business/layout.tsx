import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "企業資訊中心",
  description: "GVG Business Center：經營儀表板、公司簡介、商業模式、投資人簡報與夥伴計畫。",
};

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
