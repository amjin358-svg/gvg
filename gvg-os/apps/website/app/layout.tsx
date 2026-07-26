import type { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata = {
  title: "GVG — Connecting Markets. Creating Value.",
  description:
    "Global Vista Group Interactive Movie — cinematic storytelling across markets, trade, marketplace, AI, and investment.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: browser extensions often mutate <html>/<body>
    // (e.g. className="ipa-annotator-disabled") before React hydrates.
    <html lang="zh-Hant" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
