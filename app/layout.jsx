import { Inter } from 'next/font/google';
import { SITE } from '@/config/site';
import './globals.css';

// ─── FONTS ──────────────────────────────────────────────────────────────────
// Inter — clean, modern, excellent readability for tech media
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist', // keep same CSS variable name so nothing else breaks
  display: 'swap',
  preload: true,
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
    <html lang="en" className={inter.variable}>
      <head>
        {/*
          Google AdSense — uncomment after approval:
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
