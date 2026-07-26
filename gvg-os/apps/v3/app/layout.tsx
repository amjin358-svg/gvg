import type { ReactNode } from "react";
import { BRAND } from "@/lib/content";
import "@/styles/globals.css";

export const metadata = {
  title: `${BRAND.short} V3｜${BRAND.nameZh}`,
  description: `${BRAND.heroZh} — ${BRAND.leadZh}`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
