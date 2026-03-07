import type { Metadata } from "next";
import "./globals.css";
import { ReloadButton } from "@/components/ReloadButton";

export const metadata: Metadata = {
  title: "Backstage",
  description: "Epic management UI",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Backstage",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ReloadButton />
      </body>
    </html>
  );
}
