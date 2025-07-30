'use client';

import Link from 'next/link';

interface Chapter {
  slug: string;
  number: number;
  title: string;
}

interface CompactNavigationProps {
  prevChapter?: Chapter;
  nextChapter?: Chapter;
  novelSlug: string;
}

export default function CompactNavigation({ prevChapter, nextChapter, novelSlug }: CompactNavigationProps) {
  return (
    <div className="flex justify-between items-center gap-4">
      {prevChapter ? (
        <Link
          href={`/novel/${novelSlug}/${prevChapter.slug}`}
          className="flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-md transition-colors"
        >
          <span className="mr-1">←</span>
          <span>Prev</span>
        </Link>
      ) : (
        <button 
          disabled
          className="flex items-center px-3 py-2 text-sm bg-gray-50 text-gray-400 border border-gray-200 rounded-md cursor-not-allowed"
        >
          <span className="mr-1">←</span>
          <span>Prev</span>
        </button>
      )}
      
      {nextChapter ? (
        <Link
          href={`/novel/${novelSlug}/${nextChapter.slug}`}
          className="flex items-center px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          <span>Next</span>
          <span className="ml-1">→</span>
        </Link>
      ) : (
        <button 
          disabled
          className="flex items-center px-3 py-2 text-sm bg-gray-50 text-gray-400 border border-gray-200 rounded-md cursor-not-allowed"
        >
          <span>Next</span>
          <span className="ml-1">→</span>
        </button>
      )}
    </div>
  );
} 