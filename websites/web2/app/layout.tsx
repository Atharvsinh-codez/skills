import type { Metadata, Viewport } from "next";
import { Datatype, Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const datatype = Datatype({
  variable: "--font-datatype",
  subsets: ["latin"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "AutoSend: Email for Developers and Marketers",
  description:
    "Transactional, marketing & automations in one platform. Priced by volume, not contacts.",
};

export const viewport: Viewport = {
  themeColor: "#fafaf9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${datatype.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
