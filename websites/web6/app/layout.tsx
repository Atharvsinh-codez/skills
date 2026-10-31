import type { Metadata, Viewport } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';

const mono = Geist_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'arix · Animated brand guidelines your clients actually use',
  description:
    'arix turns your brand into a live page you send as a link. Colors copy when you click them, the motion plays right in the page, and Claude or Cursor can build the whole thing with you.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#eff0f4',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,801&display=swap" />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
