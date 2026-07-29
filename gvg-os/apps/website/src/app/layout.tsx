import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC, Outfit } from "next/font/google";
import "@/styles/globals.css";

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const body = Noto_Sans_TC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "GVG — Global Vista Group",
    template: "%s | GVG",
  },
  description:
    "Build Beyond Borders. An interactive cinematic experience by Global Vista Group — Earth, Network, AI, Marketplace, Business, and Investment.",
  applicationName: "GVG",
  appleWebApp: {
    capable: true,
    title: "GVG",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#03060c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${display.variable} ${body.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full overflow-x-hidden bg-[#03060c] text-white"
        style={{ fontFamily: "var(--font-body), 'Noto Sans TC', system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
