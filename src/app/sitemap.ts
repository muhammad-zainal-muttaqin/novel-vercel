import { MetadataRoute } from 'next';
import { generateSitemapData } from '@/utils/contentHelpers';

export const revalidate = 600;

const RAW_BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://novel-vercel-mu.vercel.app";
const BASE_URL = RAW_BASE.replace(/\/+$/, ""); // trim semua trailing slash

const joinUrl = (path: string) => {
  if (!path || path === "/") return BASE_URL; // homepage persis BASE_URL
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
};

// Saat membuat entries:
// gunakan joinUrl("") untuk homepage, dan joinUrl("/novels") dst.

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapData = generateSitemapData();
  
  return sitemapData.map(item => ({
    url: `${BASE_URL}${item.url}`,
    lastModified: new Date(item.lastmod),
    changeFrequency: item.url === '/' ? 'daily' : 'weekly',
    priority: item.priority,
  }));
}