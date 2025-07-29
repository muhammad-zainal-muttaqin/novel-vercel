import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // MDX Configuration
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  
  // Environment variables
  env: {
    ENVIRONMENT: process.env.NODE_ENV,
    GITHUB_REPO: process.env.GITHUB_REPO,
    EDITOR_PASSWORD: process.env.EDITOR_PASSWORD,
    ANALYTICS_ID: process.env.ANALYTICS_ID
  },
  
  // Optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  
  // Headers untuk caching
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/novel/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ]
      }
    ];
  },
  
  // Redirects dan rewrites
  async rewrites() {
    return [
      {
        source: '/chapter/:slug*',
        destination: '/novel/:slug*' // Redirect old URLs
      }
    ];
  },
  
  async redirects() {
    return [
      {
        source: '/read/:slug*',
        destination: '/novel/:slug*',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
