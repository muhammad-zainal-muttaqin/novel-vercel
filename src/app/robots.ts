import type { MetadataRoute } from 'next';

export const revalidate = 600;

const RAW_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://novel-vercel-mu.vercel.app';
const BASE_URL = RAW_BASE_URL.replace(/\/+$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/editor/'] }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`
  };
}