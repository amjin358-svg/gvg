import type { Metadata } from "next";
import { Noto_Sans_TC, Outfit } from "next/font/google";
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
  title: `${BRAND.shortName} ${BRAND.name} | HOME-V6.0`,
  description: BRAND.descriptionZh,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
