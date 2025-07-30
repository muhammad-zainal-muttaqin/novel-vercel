import { getNovelBySlug, getChapterContent, getAdjacentChapters } from '@/utils/contentHelpers';
import { notFound } from 'next/navigation';
import MDXRenderer from '@/components/MDXRenderer';
import { analytics } from '@/utils/analytics';
import Button from '@/components/Button';
import ChapterDropdown from '@/components/ChapterDropdown';
import CompactNavigation from '@/components/CompactNavigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
    chapter: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, chapter } = await params;
  const novel = getNovelBySlug(slug);
  
  if (!novel) {
    return {
      title: "Chapter Tidak Ditemukan - Novel Vercel",
      description: "Chapter yang Anda cari tidak ditemukan di Novel Vercel.",
    };
  }
  
  const currentChapter = novel.metadata.chapters.find(ch => ch.slug === chapter);
  
  if (!currentChapter) {
    return {
      title: "Chapter Tidak Ditemukan - Novel Vercel",
      description: "Chapter yang Anda cari tidak ditemukan di Novel Vercel.",
    };
  }
  
  return {
    title: `Chapter ${currentChapter.number}: ${currentChapter.title} - ${novel.metadata.title} - Novel Vercel`,
    description: `Baca Chapter ${currentChapter.number}: ${currentChapter.title} dari novel ${novel.metadata.title}. ${novel.metadata.description} Total ${currentChapter.wordCount} kata.`,
    keywords: [...novel.metadata.tags, 'novel', 'reading', 'chapter', 'indonesia'],
    openGraph: {
      title: `Chapter ${currentChapter.number}: ${currentChapter.title}`,
      description: `Baca Chapter ${currentChapter.number} dari novel ${novel.metadata.title}`,
      type: 'article',
      url: `https://novel-vercel-mu.vercel.app/novel/${slug}/${chapter}`,
      siteName: 'Novel Vercel',
      locale: 'id_ID',
    },
    twitter: {
      card: 'summary',
      title: `Chapter ${currentChapter.number}: ${currentChapter.title}`,
      description: `Baca Chapter ${currentChapter.number} dari novel ${novel.metadata.title}`,
    },
    alternates: {
      canonical: `/novel/${slug}/${chapter}`,
    },
  };
}

interface PageProps {
  params: Promise<{
    slug: string;
    chapter: string;
  }>;
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug, chapter } = await params;
  const novel = getNovelBySlug(slug);
  
  if (!novel) {
    notFound();
  }

  const chapterContent = getChapterContent(slug, chapter);
  
  if (!chapterContent) {
    notFound();
  }

  const currentChapter = novel.metadata.chapters.find(ch => ch.slug === chapter);
  
  if (!currentChapter) {
    notFound();
  }

  const { prevChapter, nextChapter } = getAdjacentChapters(slug, currentChapter.number);

  // Track chapter read event
  if (typeof window !== 'undefined') {
    analytics.trackNovelRead(novel.metadata.title, currentChapter.number);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header dengan Navigasi Compact */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-3 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
              <Button href={`/novel/${slug}`} variant="primary" className="inline-block text-blue-600 hover:text-blue-800 transition-colors bg-transparent shadow-none text-sm sm:text-base">
                ← {novel.metadata.title}
              </Button>
              
              {/* Chapter Dropdown - Hidden on mobile, shown on larger screens */}
              <div className="hidden sm:block">
                <ChapterDropdown 
                  chapters={novel.metadata.chapters}
                  currentChapter={chapter}
                  novelSlug={slug}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between w-full sm:w-auto space-x-2 sm:space-x-4">
              {/* Chapter Dropdown - Shown on mobile */}
              <div className="block sm:hidden flex-1">
                <ChapterDropdown 
                  chapters={novel.metadata.chapters}
                  currentChapter={chapter}
                  novelSlug={slug}
                />
              </div>
              
              <div className="text-sm text-gray-500 hidden lg:block">
                Chapter {currentChapter.number} dari {novel.metadata.totalChapters}
              </div>
              
              {/* Navigation Buttons di Header */}
              <CompactNavigation 
                prevChapter={prevChapter || undefined}
                nextChapter={nextChapter || undefined}
                novelSlug={slug}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chapter Content */}
        <article className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Chapter {currentChapter.number}: {currentChapter.title}
            </h1>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>📝 {currentChapter.wordCount} kata</span>
              <span>📅 {new Date(currentChapter.publishedAt).toLocaleDateString('id-ID')}</span>
            </div>
          </header>

          {/* MDX Content */}
          <div className="novel-content text-gray-700">
            <MDXRenderer content={chapterContent} />
          </div>
        </article>

        {/* Bottom Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            {/* Chapter Dropdown di Footer */}
            <div className="w-full sm:w-auto">
              <ChapterDropdown 
                chapters={novel.metadata.chapters}
                currentChapter={chapter}
                novelSlug={slug}
              />
            </div>
            
            {/* Navigation Buttons */}
            <CompactNavigation 
              prevChapter={prevChapter || undefined}
              nextChapter={nextChapter || undefined}
              novelSlug={slug}
            />
          </div>
        </div>

        {/* Back to Novel */}
        <div className="text-center mt-8">
          <Button 
            href={`/novel/${slug}`}
            variant="primary"
            className="inline-flex items-center"
          >
            📖 Kembali ke Daftar Chapter
          </Button>
        </div>
      </main>
    </div>
  );
} 