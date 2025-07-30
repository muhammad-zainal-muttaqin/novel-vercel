import { getNovelBySlug } from '@/utils/contentHelpers';
import { notFound } from 'next/navigation';
import Button from '@/components/Button';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const novel = getNovelBySlug(slug);
  
  if (!novel) {
    return {
      title: "Novel Tidak Ditemukan - Novel Vercel",
      description: "Novel yang Anda cari tidak ditemukan di Novel Vercel.",
    };
  }
  
  return {
    title: `${novel.metadata.title} - Novel Vercel`,
    description: `${novel.metadata.description} Baca novel ${novel.metadata.title} dengan ${novel.metadata.totalChapters} chapter. Genre: ${novel.metadata.tags.join(', ')}.`,
    keywords: [...novel.metadata.tags, 'novel', 'reading', 'indonesia'],
    openGraph: {
      title: novel.metadata.title,
      description: novel.metadata.description,
      type: 'book',
      url: `https://novel-vercel-mu.vercel.app/novel/${slug}`,
      siteName: 'Novel Vercel',
      locale: 'id_ID',
    },
    twitter: {
      card: 'summary',
      title: novel.metadata.title,
      description: novel.metadata.description,
    },
    alternates: {
      canonical: `/novel/${slug}`,
    },
  };
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NovelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const novel = getNovelBySlug(slug);
  
  if (!novel) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
             {/* Header */}
       <header className="bg-white dark:bg-gray-800 shadow-sm">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center py-6 min-h-[80px]">
             <div>
                               <Button href="/" variant="primary" className="inline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors bg-transparent shadow-none">
                  ← Kembali ke Beranda
                </Button>
             </div>
           </div>
         </div>
       </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Novel Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {novel.metadata.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
            {novel.metadata.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{novel.metadata.totalChapters}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Chapter</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{novel.metadata.rating}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Rating</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{novel.metadata.readCount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Dibaca</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {novel.metadata.tags.map((tag) => (
                             <span 
                 key={tag}
                 className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm rounded-full"
               >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>👤 {novel.metadata.author}</span>
            <span>📅 {new Date(novel.metadata.publishedAt).toLocaleDateString('id-ID')}</span>
          </div>
        </div>

        {/* Chapters List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">📖 Daftar Chapter</h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {novel.metadata.chapters.map((chapter) => (
              <div key={chapter.slug} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                 <Button 
                   href={`/novel/${novel.slug}/${chapter.slug}`}
                   variant="primary"
                   className="block w-full bg-transparent shadow-none text-left hover:bg-transparent"
                 >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Chapter {chapter.number}: {chapter.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {chapter.wordCount} kata • {new Date(chapter.publishedAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                                         <div className="text-blue-600 dark:text-blue-400">
                       →
                     </div>
                  </div>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 