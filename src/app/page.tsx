import Link from 'next/link';
import { getAllNovels } from '@/utils/contentHelpers';

export default function Home() {
  const novels = getAllNovels();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📚 Novel Vercel</h1>
              <p className="text-gray-600 mt-1">Platform baca novel online yang cepat dan ringan</p>
            </div>
            <div className="flex gap-4">
              <Link 
                href="/editor"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                ✏️ Editor
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Selamat Datang di Novel Vercel
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform baca novel online yang dibangun dengan Next.js, MDX, dan Vercel. 
            Cepat, ringan, dan siap untuk jutaan pembaca.
          </p>
        </div>

        {/* Novel List */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">📖 Novel Tersedia</h3>
          
          {novels.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h4 className="text-xl font-medium text-gray-900 mb-2">Belum ada novel</h4>
              <p className="text-gray-600 mb-4">
                Novel pertama akan muncul di sini setelah Anda menulis menggunakan editor.
              </p>
              <Link 
                href="/editor"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                ✏️ Mulai Menulis Novel
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {novels.map((novel) => (
                <div key={novel.slug} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {novel.metadata.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {novel.metadata.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>👤 {novel.metadata.author}</span>
                      <span>📚 {novel.metadata.totalChapters} chapter</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {novel.metadata.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={`/novel/${novel.slug}`}
                      className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      📖 Baca Novel
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Cepat & Ringan</h4>
            <p className="text-gray-600">
              Dibangun dengan Next.js dan static site generation untuk performa optimal.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Komponen MDX</h4>
            <p className="text-gray-600">
              Komponen custom untuk warning, quote, image, dan spoiler yang interaktif.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📱</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Responsive</h4>
            <p className="text-gray-600">
              Optimized untuk desktop dan mobile dengan pengalaman membaca yang nyaman.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Siap Menulis Novel Pertama Anda?
          </h3>
          <p className="text-gray-600 mb-6">
            Gunakan editor MDX kami untuk menulis novel dengan komponen interaktif.
          </p>
          <Link 
            href="/editor"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            ✏️ Mulai Menulis Sekarang
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 Novel Vercel. Dibuat dengan ❤️ menggunakan Next.js, MDX, dan Vercel.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
