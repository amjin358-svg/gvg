import "./globals.css";

export const metadata = {
  title: "GVG",
  description: "Global Vista Group",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
