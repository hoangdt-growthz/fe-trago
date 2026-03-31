import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TraGo",
  description: "Consumer discovery experience for TraGo"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
