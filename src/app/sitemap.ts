import { MetadataRoute } from 'next';
import { generateSitemapData } from '@/utils/contentHelpers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://novel-vercel-mu.vercel.app';
  const sitemapData = generateSitemapData();
  
  return sitemapData.map(item => ({
    url: `${baseUrl}${item.url}`,
    lastModified: new Date(item.lastmod),
    changeFrequency: item.url === '/' ? 'daily' : 'weekly',
    priority: item.priority,
  }));
}