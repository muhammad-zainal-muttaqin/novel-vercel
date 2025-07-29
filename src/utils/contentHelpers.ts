import fs from 'fs';
import path from 'path';

// Types
export interface Chapter {
  number: number;
  title: string;
  slug: string;
  publishedAt: string;
  wordCount: number;
}

export interface NovelMetadata {
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImage: string;
  status: 'ongoing' | 'completed';
  totalChapters: number;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  rating: number;
  readCount: number;
  chapters: Chapter[];
}

export interface Novel {
  slug: string;
  metadata: NovelMetadata;
}

// Get all novels
export const getAllNovels = (): Novel[] => {
  const novelDir = path.join(process.cwd(), 'novel');
  
  if (!fs.existsSync(novelDir)) {
    return [];
  }
  
  const novelSlugs = fs.readdirSync(novelDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  return novelSlugs.map(slug => {
    const metadataPath = path.join(novelDir, slug, 'metadata.json');
    if (!fs.existsSync(metadataPath)) {
      return null;
    }
    
    const metadataContent = fs.readFileSync(metadataPath, 'utf8');
    const metadata: NovelMetadata = JSON.parse(metadataContent);
    
    return {
      slug,
      metadata
    };
  }).filter(Boolean) as Novel[];
};

// Get single novel by slug
export const getNovelBySlug = (slug: string): Novel | null => {
  const novelDir = path.join(process.cwd(), 'novel', slug);
  const metadataPath = path.join(novelDir, 'metadata.json');
  
  if (!fs.existsSync(metadataPath)) {
    return null;
  }
  
  const metadataContent = fs.readFileSync(metadataPath, 'utf8');
  const metadata: NovelMetadata = JSON.parse(metadataContent);
  
  return {
    slug,
    metadata
  };
};

// Get chapter content
export const getChapterContent = (novelSlug: string, chapterSlug: string): string | null => {
  const chapterPath = path.join(process.cwd(), 'novel', novelSlug, `${chapterSlug}.mdx`);
  
  if (!fs.existsSync(chapterPath)) {
    return null;
  }
  
  return fs.readFileSync(chapterPath, 'utf8');
};

// Get chapter metadata
export const getChapterMetadata = (novelSlug: string, chapterSlug: string): Chapter | null => {
  const novel = getNovelBySlug(novelSlug);
  if (!novel) {
    return null;
  }
  
  return novel.metadata.chapters.find(chapter => chapter.slug === chapterSlug) || null;
};

// Get adjacent chapters
export const getAdjacentChapters = (novelSlug: string, currentChapterNumber: number) => {
  const novel = getNovelBySlug(novelSlug);
  if (!novel) {
    return { prevChapter: null, nextChapter: null };
  }
  
  const chapters = novel.metadata.chapters;
  const currentIndex = chapters.findIndex(ch => ch.number === currentChapterNumber);
  
  if (currentIndex === -1) {
    return { prevChapter: null, nextChapter: null };
  }
  
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;
  
  return { prevChapter, nextChapter };
};

// Validate MDX content
export const validateMDXContent = (content: string): { valid: boolean; error?: string } => {
  try {
    // Basic validation - check for required elements
    if (!content.includes('# Chapter') && !content.includes('# Bab')) {
      return {
        valid: false,
        error: 'Chapter harus memiliki judul dengan # Chapter atau # Bab'
      };
    }
    
    // Check for allowed components
    const allowedComponents = ['Warning', 'Image', 'Quote', 'Spoiler', 'ChapterNav', 'TableOfContents'];
    const componentRegex = /<(\w+)/g;
    const matches = content.match(componentRegex);
    
    if (matches) {
      const usedComponents = [...new Set(matches.map(match => match.slice(1)))];
      const invalidComponents = usedComponents.filter(comp => !allowedComponents.includes(comp));
      
      if (invalidComponents.length > 0) {
        return {
          valid: false,
          error: `Komponen tidak diizinkan: ${invalidComponents.join(', ')}`
        };
      }
    }
    
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

// Calculate reading time
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Generate sitemap data
export const generateSitemapData = () => {
  const novels = getAllNovels();
  const urls = [
    {
      url: '/',
      lastmod: new Date().toISOString(),
      priority: 1.0
    }
  ];
  
  novels.forEach(novel => {
    // Add novel listing page
    urls.push({
      url: `/novel/${novel.slug}`,
      lastmod: novel.metadata.updatedAt,
      priority: 0.8
    });
    
    // Add chapter pages
    novel.metadata.chapters.forEach(chapter => {
      urls.push({
        url: `/novel/${novel.slug}/${chapter.slug}`,
        lastmod: chapter.publishedAt,
        priority: 0.6
      });
    });
  });
  
  return urls;
}; 