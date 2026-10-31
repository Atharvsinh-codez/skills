import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Terms — Draft, discuss, and sign contracts",
  description:
    "Terms is a minimal document signing tool. Draft with AI, chat about any contract, and comment with counterparties.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#3a0303",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
