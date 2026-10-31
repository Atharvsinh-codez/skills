import type { Metadata, Viewport } from 'next';
import { Sprite } from '@/components/Sprite';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { site } from '@/lib/content';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'enterprise search',
    'internal knowledge base',
    'AI assistant',
    'Slack search',
    'Notion search',
    'company knowledge',
  ],
  authors: [{ name: site.legalEntity }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        {/* Self-hosted so the page makes no third-party requests and the first
            paint never falls back to a mismatched face. */}
        <link
          rel="preload"
          href="/fonts/inter-latin-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Sprite />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
