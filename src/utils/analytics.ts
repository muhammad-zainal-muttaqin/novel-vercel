import { track } from '@vercel/analytics';

// Custom analytics events for Novel Vercel
export const analytics = {
  // Track novel reading events
  trackNovelRead: (novelTitle: string, chapterNumber: number) => {
    track('novel_read', {
      novel: novelTitle,
      chapter: chapterNumber,
      timestamp: new Date().toISOString()
    });
  },

  // Track novel search events
  trackNovelSearch: (searchTerm: string) => {
    track('novel_search', {
      query: searchTerm,
      timestamp: new Date().toISOString()
    });
  },

  // Track editor usage
  trackEditorUsage: (action: string) => {
    track('editor_usage', {
      action,
      timestamp: new Date().toISOString()
    });
  },

  // Track user engagement
  trackUserEngagement: (action: string, details?: any) => {
    track('user_engagement', {
      action,
      details,
      timestamp: new Date().toISOString()
    });
  },

  // Track reading progress
  trackReadingProgress: (novelTitle: string, progress: number) => {
    track('reading_progress', {
      novel: novelTitle,
      progress: `${progress}%`,
      timestamp: new Date().toISOString()
    });
  },

  // Track chapter navigation
  trackChapterNavigation: (fromChapter: number, toChapter: number, novelTitle: string) => {
    track('chapter_navigation', {
      from: fromChapter,
      to: toChapter,
      novel: novelTitle,
      timestamp: new Date().toISOString()
    });
  }
}; 