import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

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
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Modern JavaScript optimization
  experimental: {
    optimizePackageImports: ['@next/font'],
  },
  
  // Bundle analyzer (optional)
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize for modern browsers
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  
  // Headers untuk caching dan performance
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
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
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

export default withMDX(nextConfig);
