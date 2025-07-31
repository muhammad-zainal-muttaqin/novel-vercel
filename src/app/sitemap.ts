import { MetadataRoute } from 'next';
import { generateSitemapData } from '@/utils/contentHelpers';

export const revalidate = 600;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://novel-vercel-mu.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapData = generateSitemapData();
  
  return sitemapData.map(item => ({
    url: `${BASE_URL}${item.url}`,
    lastModified: new Date(item.lastmod),
    changeFrequency: item.url === '/' ? 'daily' : 'weekly',
    priority: item.priority,
  }));
}