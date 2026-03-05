import { Geist, Geist_Mono } from 'next/font/google';
import { SITE } from '@/config/site';
import './globals.css';

// ─── FONTS ──────────────────────────────────────────────────────────────────
// Loaded with next/font — zero CLS, self-hosted, no external requests
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: false, // only used in code blocks
});

// ─── DEFAULT METADATA ────────────────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ['AI', 'Artificial Intelligence', 'AI Tools', 'AI for Business', 'ChatGPT', 'Machine Learning'],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE.twitterHandle,
    creator: SITE.twitterHandle,
  },
  // Verification tags — add your values when ready
  // verification: {
  //   google: 'your-google-site-verification-code',
  //   yandex: 'your-yandex-code',
  // },
};

// ─── VIEWPORT ────────────────────────────────────────────────────────────────
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

// ─── ROOT LAYOUT ─────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        {/*
          Google AdSense — uncomment and replace with your publisher ID after approval.
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
            crossOrigin="anonymous"
          />
        */}
      </head>
      <body className="font-sans antialiased bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
