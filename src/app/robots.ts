import type { MetadataRoute } from 'next';

export const revalidate = 600;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://novel-vercel-mu.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/editor/']
      }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`
  };
}