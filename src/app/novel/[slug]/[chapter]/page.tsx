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
      <header className="lg:sticky lg:top-0 z-10">
        {/* Mobile Header - Aligned with content */}
        <div className="lg:hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white shadow-sm rounded-lg px-3 sm:px-6">
            {/* Mobile Layout */}
            <div className="py-3">
            {/* Back button */}
            <div className="mb-3">
              <Button href={`/novel/${slug}`} variant="primary" className="inline-block text-blue-600 hover:text-blue-800 transition-colors bg-transparent shadow-none text-sm font-medium">
                ← {novel.metadata.title}
              </Button>
              <span className="ml-3 text-xs text-gray-500">
                {currentChapter.number}/{novel.metadata.totalChapters}
              </span>
            </div>
            
            {/* Chapter dropdown - full width */}
            <div className="mb-3">
              <ChapterDropdown 
                chapters={novel.metadata.chapters}
                currentChapter={chapter}
                novelSlug={slug}
              />
            </div>
            
            {/* Navigation buttons - centered */}
            <div className="flex justify-center">
              <div className="flex gap-3">
                {prevChapter ? (
                  <Button
                    href={`/novel/${slug}/${prevChapter.slug}`}
                    variant="secondary"
                    size="sm"
                    className="px-4 py-2 text-sm"
                  >
                    ← Prev
                  </Button>
                ) : (
                  <Button
                    disabled={true}
                    variant="secondary"
                    size="sm"
                    className="px-4 py-2 text-sm opacity-50"
                  >
                    ← Prev
                  </Button>
                )}
                
                {nextChapter ? (
                  <Button
                    href={`/novel/${slug}/${nextChapter.slug}`}
                    variant="primary"
                    size="sm"
                    className="px-4 py-2 text-sm"
                  >
                    Next →
                  </Button>
                ) : (
                  <Button
                    disabled={true}
                    variant="primary"
                    size="sm"
                    className="px-4 py-2 text-sm opacity-50"
                  >
                    Next →
                  </Button>
                )}
              </div>
            </div>
                      </div>
            </div>
          </div>
        </div>

        {/* Desktop Header - Full width */}
        <div className="hidden lg:block bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4 min-h-[80px]">
              <div className="flex items-center space-x-4">
                <Button href={`/novel/${slug}`} variant="primary" className="inline-block text-blue-600 hover:text-blue-800 transition-colors bg-transparent shadow-none">
                  ← {novel.metadata.title}
                </Button>
                
                <ChapterDropdown 
                  chapters={novel.metadata.chapters}
                  currentChapter={chapter}
                  novelSlug={slug}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500 hidden lg:block">
                  Chapter {currentChapter.number} dari {novel.metadata.totalChapters}
                </div>
                
                <CompactNavigation 
                  prevChapter={prevChapter || undefined}
                  nextChapter={nextChapter || undefined}
                  novelSlug={slug}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
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

        {/* Bottom Navigation - Only visible on desktop */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center">
            {/* Chapter Dropdown di Footer */}
            <div className="w-auto">
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

      {/* Floating Mobile Navigation - Only visible on mobile */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-20">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
          <div className="flex items-center gap-3">
            {/* Chapter Dropdown - Flexible width */}
            <div className="flex-1 min-w-0">
              <ChapterDropdown 
                chapters={novel.metadata.chapters}
                currentChapter={chapter}
                novelSlug={slug}
              />
            </div>
            
            {/* Navigation Buttons - Fixed width */}
            <div className="flex gap-2 flex-shrink-0">
              {prevChapter ? (
                <Button
                  href={`/novel/${slug}/${prevChapter.slug}`}
                  variant="secondary"
                  size="sm"
                  className="w-10 h-10 p-0 flex items-center justify-center text-sm"
                >
                  ←
                </Button>
              ) : (
                <Button
                  disabled={true}
                  variant="secondary"
                  size="sm"
                  className="w-10 h-10 p-0 flex items-center justify-center text-sm opacity-50"
                >
                  ←
                </Button>
              )}
              
              {nextChapter ? (
                <Button
                  href={`/novel/${slug}/${nextChapter.slug}`}
                  variant="primary"
                  size="sm"
                  className="w-10 h-10 p-0 flex items-center justify-center text-sm"
                >
                  →
                </Button>
              ) : (
                <Button
                  disabled={true}
                  variant="primary"
                  size="sm"
                  className="w-10 h-10 p-0 flex items-center justify-center text-sm opacity-50"
                >
                  →
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 