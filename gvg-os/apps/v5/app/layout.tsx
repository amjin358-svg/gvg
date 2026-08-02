import type { ReactNode } from "react";
import type { Viewport } from "next";
import "@/styles/globals.css";

export const metadata = {
  title: "Global Vista Group — Interactive Movie IM-V5.0",
  description:
    "Global Vista Group Interactive Movie V5 — watch on mobile or desktop. Connecting Markets. Creating Value.",
  appleWebApp: {
    capable: true,
    title: "GVG Movie",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#01040c",
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
