import Link from 'next/link';
import { getNovelBySlug, getChapterContent, getAdjacentChapters } from '@/utils/contentHelpers';
import { notFound } from 'next/navigation';
import { mdxComponents } from '@/components/MDXComponents';

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <Link href={`/novel/${slug}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                ← {novel.metadata.title}
              </Link>
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

          {/* MDX Content akan di-render di sini */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed">
              {/* Untuk sementara tampilkan sebagai plain text */}
              <pre className="whitespace-pre-wrap font-sans text-base">
                {chapterContent}
              </pre>
            </div>
          </div>
        </article>

        {/* Chapter Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            {prevChapter ? (
              <Link 
                href={`/novel/${slug}/${prevChapter.slug}`}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span className="mr-2">←</span>
                <div>
                  <div className="text-sm text-gray-500">Chapter Sebelumnya</div>
                  <div className="font-medium">Chapter {prevChapter.number}: {prevChapter.title}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}
            
            {nextChapter ? (
              <Link 
                href={`/novel/${slug}/${nextChapter.slug}`}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <div className="text-right">
                  <div className="text-sm text-gray-500">Chapter Selanjutnya</div>
                  <div className="font-medium">Chapter {nextChapter.number}: {nextChapter.title}</div>
                </div>
                <span className="ml-2">→</span>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Back to Novel */}
        <div className="text-center mt-8">
          <Link 
            href={`/novel/${slug}`}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            📖 Kembali ke Daftar Chapter
          </Link>
        </div>
      </main>
    </div>
  );
} 