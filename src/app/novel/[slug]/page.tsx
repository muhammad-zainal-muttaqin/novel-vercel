import Link from 'next/link';
import { getNovelBySlug } from '@/utils/contentHelpers';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function NovelDetailPage({ params }: PageProps) {
  const novel = getNovelBySlug(params.slug);
  
  if (!novel) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                ← Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Novel Info */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {novel.metadata.title}
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            {novel.metadata.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{novel.metadata.totalChapters}</div>
              <div className="text-sm text-gray-600">Total Chapter</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{novel.metadata.rating}</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{novel.metadata.readCount}</div>
              <div className="text-sm text-gray-600">Dibaca</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {novel.metadata.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>👤 {novel.metadata.author}</span>
            <span>📅 {new Date(novel.metadata.publishedAt).toLocaleDateString('id-ID')}</span>
          </div>
        </div>

        {/* Chapters List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">📖 Daftar Chapter</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {novel.metadata.chapters.map((chapter) => (
              <div key={chapter.slug} className="p-6 hover:bg-gray-50 transition-colors">
                <Link 
                  href={`/novel/${novel.slug}/${chapter.slug}`}
                  className="block"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">
                        Chapter {chapter.number}: {chapter.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {chapter.wordCount} kata • {new Date(chapter.publishedAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div className="text-blue-600">
                      →
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 