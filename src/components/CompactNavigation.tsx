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
          className="flex items-center px-3 py-2 text-sm bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-md transition-colors font-medium"
          style={{
            backgroundColor: '#ffffff !important',
            color: '#111827 !important',
            fontWeight: '500 !important',
            textDecoration: 'none !important'
          }}
        >
          <span className="mr-1">←</span>
          <span>Prev</span>
        </Link>
      ) : (
        <button 
          disabled
          className="flex items-center px-3 py-2 text-sm bg-gray-200 text-gray-800 border border-gray-400 rounded-md cursor-not-allowed font-medium"
          style={{
            backgroundColor: '#e5e7eb !important',
            color: '#1f2937 !important',
            fontWeight: '500 !important',
            cursor: 'not-allowed !important'
          }}
        >
          <span className="mr-1">←</span>
          <span>Prev</span>
        </button>
      )}
      
      {nextChapter ? (
        <Link
          href={`/novel/${novelSlug}/${nextChapter.slug}`}
          className="flex items-center px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
          style={{
            backgroundColor: '#2563eb !important',
            color: '#ffffff !important',
            fontWeight: '500 !important',
            textDecoration: 'none !important'
          }}
        >
          <span>Next</span>
          <span className="ml-1">→</span>
        </Link>
      ) : (
        <button 
          disabled
          className="flex items-center px-3 py-2 text-sm bg-gray-200 text-gray-800 border border-gray-400 rounded-md cursor-not-allowed font-medium"
          style={{
            backgroundColor: '#e5e7eb !important',
            color: '#1f2937 !important',
            fontWeight: '500 !important',
            cursor: 'not-allowed !important'
          }}
        >
          <span>Next</span>
          <span className="ml-1">→</span>
        </button>
      )}
    </div>
  );
} 