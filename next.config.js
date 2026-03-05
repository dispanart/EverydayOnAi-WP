/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent clickjacking
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Prevent MIME type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Enable XSS filter in older browsers
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Referrer policy — send full URL to same origin, only origin to cross-origin
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // DNS prefetch control
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  // Permissions policy — disable unused browser APIs
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // Content Security Policy
  // Allows: self, Google Fonts, Google AdSense, WordPress images
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://everydayonai.com https://*.wp.com https://secure.gravatar.com https://pagead2.googlesyndication.com",
      "connect-src 'self' https://everydayonai.com https://www.google-analytics.com",
      "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
  // HSTS — force HTTPS for 1 year
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
];

const nextConfig = {
  // ─── React ──────────────────────────────────────────────────────
  reactStrictMode: true,

  // ─── Image Optimization ─────────────────────────────────────────
  images: {
    // Serve modern formats: WebP first, then AVIF as fallback
    formats: ['image/webp', 'image/avif'],

    // Responsive breakpoints for srcSet generation
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Aggressive caching — images cached for 1 week in browser
    minimumCacheTTL: 60 * 60 * 24 * 7,

    // Allowed image sources
    remotePatterns: [
      {
        // WordPress uploads
        protocol: 'https',
        hostname: 'everydayonai.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        // WordPress.com CDN
        protocol: 'https',
        hostname: '*.wp.com',
      },
      {
        // Author avatars (Gravatar)
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
      {
        // Jetpack CDN (if enabled)
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'i1.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'i2.wp.com',
      },
    ],
  },

  // ─── Security Headers ───────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Cache static assets aggressively
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache images
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
    ];
  },

  // ─── Redirects ──────────────────────────────────────────────────
  async redirects() {
    return [
      // Redirect old slug patterns if you ever change them
      // { source: '/old-path', destination: '/new-path', permanent: true },
    ];
  },

  // ─── Performance ────────────────────────────────────────────────
  // Compress responses
  compress: true,

  // Remove X-Powered-By header (minor security improvement)
  poweredByHeader: false,

  // Enable SWC minification (faster than Terser)
  swcMinify: true,

  // ─── Logging ────────────────────────────────────────────────────
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
};

module.exports = nextConfig;
