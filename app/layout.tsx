import type { Metadata } from "next";
import { Noto_Sans_TC, Outfit } from "next/font/google";
import { FloatingDock } from "@/components/organisms/FloatingDock";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { BRAND } from "@/lib/constants";
import "@/styles/globals.css";

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Noto_Sans_TC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://globalvistagroup.com"),
  title: {
    default: `${BRAND.shortName} ${BRAND.name} | ${BRAND.productZh}`,
    template: `%s | ${BRAND.shortName}`,
  },
  description: BRAND.descriptionZh,
  keywords: [
    "Global Vista Group",
    "GVG",
    "全球貿易",
    "國際貿易",
    "全球採購",
    "OEM ODM",
    "物流報關",
  ],
  openGraph: {
    title: `${BRAND.shortName} ${BRAND.name}`,
    description: BRAND.descriptionZh,
    siteName: BRAND.name,
    type: "website",
    locale: "zh_TW",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <FloatingDock />
      </body>
    </html>
  );
}
