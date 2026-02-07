import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/AppShell";
import { ui } from "@/lib/config";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#171717",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: ui.site.name,
  description: ui.site.description,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: ui.site.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
