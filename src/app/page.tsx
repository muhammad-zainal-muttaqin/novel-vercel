import { getAllNovels } from '@/utils/contentHelpers';
import { performance } from '@/utils/performance';
import Button from '@/components/Button';
import BackToTop from '@/components/BackToTop';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Novel Vercel - Baca Novel Online Gratis",
  description: "Baca novel online gratis dengan pengalaman membaca yang nyaman. Temukan cerita menarik dan petualangan seru di Novel Vercel.",
  openGraph: {
    title: "Novel Vercel - Baca Novel Online Gratis",
    description: "Baca novel online gratis dengan pengalaman membaca yang nyaman. Temukan cerita menarik dan petualangan seru.",
  },
};

export default function Home() {
  const novels = getAllNovels();
  const firstNovel = novels.length > 0 ? novels[0] : null;

  // Track page load performance
  if (typeof window !== 'undefined') {
    performance.trackPageLoad('Homepage');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 min-h-[80px]">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                📚 Novel Vercel
              </h1>
              <p className="text-gray-600 mt-1">Baca novel gratis dengan pengalaman terbaik</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="inline-block text-6xl mb-4">📖</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Temukan Cerita Terbaik
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Nikmati pengalaman membaca novel yang nyaman dan menarik. 
            Gratis, tanpa iklan, dan mudah diakses kapan saja.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href={firstNovel ? `/novel/${firstNovel.slug}` : "#novels"} 
              variant="primary"
              size="lg"
              className="px-8 py-3 text-lg font-semibold"
            >
              🚀 Mulai Baca Gratis
            </Button>
            <Button 
              href="#novels" 
              variant="secondary"
              size="lg"
              className="px-8 py-3 text-lg font-semibold"
            >
              📚 Lihat Semua Novel
            </Button>
          </div>
        </div>

        {/* Novel List */}
        <div id="novels" className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">📚 Koleksi Novel</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Jelajahi koleksi novel pilihan dengan berbagai genre menarik. 
              Semua gratis dan mudah dibaca di perangkat apapun.
            </p>
          </div>
          
          {novels.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <div className="text-6xl mb-6">📚</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Novel Segera Hadir</h4>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Kami sedang mempersiapkan koleksi novel terbaik untuk Anda. 
                Silakan kembali lagi nanti!
              </p>
              <Button variant="secondary" href="#" className="font-semibold">
                🔔 Beritahu Saya
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {novels.map((novel) => (
                <div key={novel.slug} className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* Novel Cover Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-4xl">📖</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {novel.metadata.title}
                      </h4>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        {novel.metadata.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {novel.metadata.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        ✍️ {novel.metadata.author}
                      </span>
                      <span className="flex items-center gap-1">
                        📚 {novel.metadata.totalChapters} chapter
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {novel.metadata.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {novel.metadata.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-lg">
                          +{novel.metadata.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      href={`/novel/${novel.slug}`}
                      variant="primary"
                      className="w-full group-hover:scale-105 transition-transform font-semibold"
                    >
                      📖 Baca Novel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Mengapa Pilih Novel Vercel?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Platform baca novel modern dengan fitur-fitur yang dirancang untuk pengalaman membaca terbaik.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📖</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Gratis Selamanya</h4>
              <p className="text-gray-600">
                Baca semua novel tanpa biaya apapun. Tidak ada langganan atau pembayaran tersembunyi.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Super Cepat</h4>
              <p className="text-gray-600">
                Loading instan dan navigasi yang smooth. Tidak ada iklan yang mengganggu pengalaman membaca.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Multi Device</h4>
              <p className="text-gray-600">
                Baca dengan nyaman di HP, tablet, atau komputer. Responsif dan mudah digunakan.
              </p>
            </div>
          </div>
        </div>


      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4">📚 Novel Vercel</h4>
              <p className="text-gray-300 mb-4">
                Platform baca novel online gratis dengan pengalaman membaca terbaik. 
                Temukan cerita menarik dan petualangan seru.
              </p>
              <div className="flex gap-4">
                <span className="text-2xl">📖</span>
                <span className="text-2xl">⚡</span>
                <span className="text-2xl">📱</span>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Novel</h5>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/novel/the-legend-of-aria" className="hover:text-white transition-colors">The Legend of Aria</a></li>
                <li><a href="#novels" className="hover:text-white transition-colors">Semua Novel</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Novel Populer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Novel Terbaru</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Platform</h5>
              <ul className="space-y-2 text-gray-300">
                <li><span className="hover:text-white transition-colors cursor-pointer">Tentang Kami</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Kontak</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">FAQ</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Syarat & Ketentuan</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© 2025 Novel Vercel. Dibuat dengan ❤️ oleh Syqrel untuk para pecinta novel.</p>
            <p className="mt-2 text-sm">Gratis • Tanpa Iklan • Pengalaman Membaca Terbaik</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
