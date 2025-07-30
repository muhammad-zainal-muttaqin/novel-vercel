'use client';

import Link from 'next/link';

interface Chapter {
  slug: string;
  number: number;
  title: string;
}

interface QuickChapterListProps {
  chapters: Chapter[];
  currentChapter: string;
  novelSlug: string;
  maxDisplay?: number;
}

export default function QuickChapterList({ 
  chapters, 
  currentChapter, 
  novelSlug, 
  maxDisplay = 10 
}: QuickChapterListProps) {
  // Ambil chapter terbaru untuk ditampilkan
  const recentChapters = chapters.slice(-maxDisplay).reverse();
  
  return (
    <div className="mt-6">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Chapter Terbaru</h4>
      <div className="max-h-64 overflow-y-auto space-y-1">
        {recentChapters.map((chapter) => (
          <Link
            key={chapter.slug}
            href={`/novel/${novelSlug}/${chapter.slug}`}
            className={`block text-sm px-2 py-1 rounded transition-colors ${
              chapter.slug === currentChapter 
                ? 'bg-blue-100 text-blue-700 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>Chapter {chapter.number}</span>
              {chapter.slug === currentChapter && (
                <span className="text-xs bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded-full">
                  Aktif
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
      
      {chapters.length > maxDisplay && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <Link
            href={`/novel/${novelSlug}`}
            className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
          >
            Lihat Semua Chapter →
          </Link>
        </div>
      )}
    </div>
  );
} 