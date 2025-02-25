/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'replicate.delivery', // Allow Replicate API image URLs
      'replicate.com',
    ],
    dangerouslyAllowSVG: true, // Enable SVG loading for fallback images
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/webp', 'image/avif'], // SVG format handled by dangerouslyAllowSVG
  },
  experimental: {
    // Configure serverActions as an object with enabled: true
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000', 'localhost:3001', 'localhost:3002', 'localhost:3003'],
    },
  },
  // Configure headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Environment variables that should be available to the client
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    ENABLE_VISUAL_MNEMONICS: process.env.ENABLE_VISUAL_MNEMONICS,
    ENABLE_SEMANTIC_CLUSTERS: process.env.ENABLE_SEMANTIC_CLUSTERS,
  },
  // Add webpack configuration for SVG support
  webpack(config) {
    // Configure SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;