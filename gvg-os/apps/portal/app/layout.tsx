import type { ReactNode } from "react";
import { PageShell } from "@/components/PageShell";
import { BRAND } from "@/lib/content";
import "@/styles/globals.css";

export const metadata = {
  title: `${BRAND.short} ${BRAND.nameEn}｜${BRAND.nameZh}`,
  description: `${BRAND.taglineZh} — ${BRAND.trustZh}`,
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
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Noto+Sans+TC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
