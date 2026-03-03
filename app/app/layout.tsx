import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Backstage",
  description: "Epic management UI",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
