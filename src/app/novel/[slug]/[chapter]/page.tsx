import { getNovelBySlug, getChapterContent, getAdjacentChapters } from '@/utils/contentHelpers';
import { notFound } from 'next/navigation';
import MDXRenderer from '@/components/MDXRenderer';
import { analytics } from '@/utils/analytics';
import Button from '@/components/Button';
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
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <Button href={`/novel/${slug}`} variant="primary" className="inline-block text-blue-600 hover:text-blue-800 transition-colors bg-transparent shadow-none">
                ← {novel.metadata.title}
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              Chapter {currentChapter.number} dari {novel.metadata.totalChapters}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chapter Content */}
        <article className="bg-white rounded-lg shadow-sm p-8 mb-8">
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

                {/* Chapter Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {prevChapter ? (
              <Button 
                href={`/novel/${slug}/${prevChapter.slug}`}
                variant="primary"
                className="inline-block flex items-center text-blue-600 hover:text-blue-800 transition-colors bg-transparent shadow-none w-full sm:w-auto"
              >
                <span className="mr-2">←</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-gray-500">Chapter Sebelumnya</div>
                  <div className="font-medium truncate">Chapter {prevChapter.number}: {prevChapter.title}</div>
                </div>
              </Button>
            ) : (
              <div></div>
            )}
            
            {nextChapter ? (
              <Button 
                href={`/novel/${slug}/${nextChapter.slug}`}
                variant="primary"
                className="inline-block flex items-center text-blue-600 hover:text-blue-800 transition-colors bg-transparent shadow-none w-full sm:w-auto"
              >
                <div className="text-right min-w-0 flex-1">
                  <div className="text-sm text-gray-500">Chapter Selanjutnya</div>
                  <div className="font-medium truncate">Chapter {nextChapter.number}: {nextChapter.title}</div>
                </div>
                <span className="ml-2">→</span>
              </Button>
            ) : (
              <div></div>
            )}
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