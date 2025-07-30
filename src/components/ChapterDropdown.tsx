'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Chapter {
  slug: string;
  number: number;
  title: string;
}

interface ChapterDropdownProps {
  chapters: Chapter[];
  currentChapter: string;
  novelSlug: string;
}

export default function ChapterDropdown({ chapters, currentChapter, novelSlug }: ChapterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(currentChapter);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const currentChapterData = chapters.find(ch => ch.slug === currentChapter);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChapterSelect = (chapterSlug: string) => {
    if (chapterSlug !== currentChapter) {
      router.push(`/novel/${novelSlug}/${chapterSlug}`);
    }
    setIsOpen(false);
    setSearchTerm(''); // Reset search saat chapter dipilih
  };

  const handleToggleDropdown = () => {
    if (!isOpen && dropdownRef.current) {
      // Check if dropdown would overflow viewport
      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 256; // max-h-64 = 256px
      
      // If dropdown would go below viewport, show it above
      if (rect.bottom + dropdownHeight > viewportHeight - 20) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
    setIsOpen(!isOpen);
  };

  // Filter chapters berdasarkan search term
  const filteredChapters = searchTerm 
    ? chapters.filter(ch => 
        ch.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        ch.number.toString().includes(searchTerm)
      )
    : chapters;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-50 transition-colors"
      >
        <span className="truncate">
          {currentChapterData ? `Chapter ${currentChapterData.number}: ${currentChapterData.title}` : 'Pilih Chapter'}
        </span>
        <svg 
          className={`h-4 w-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 w-full sm:max-w-sm ${
          dropdownPosition === 'top' 
            ? 'bottom-full mb-1' 
            : 'top-full mt-1'
        }`}
        style={{
          maxHeight: typeof window !== 'undefined' ? `${Math.min(256, window.innerHeight * 0.4)}px` : '256px'
        }}>
          {/* Search box untuk banyak chapter */}
          {chapters.length > 20 && (
            <div className="sticky top-0 bg-white border-b border-gray-200 p-2">
              <input
                type="text"
                placeholder="Cari chapter..."
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
          
          {filteredChapters.map((chapter) => (
            <button
              key={chapter.slug}
              onClick={() => handleChapterSelect(chapter.slug)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors border-b border-gray-50 last:border-b-0 ${
                chapter.slug === currentChapter 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700'
              }`}
            >
              <div className="font-medium">Chapter {chapter.number}</div>
              <div className="text-xs text-gray-500 truncate">{chapter.title}</div>
            </button>
          ))}
          
          {/* No results message */}
          {filteredChapters.length === 0 && searchTerm && (
            <div className="px-3 py-4 text-sm text-gray-500 text-center">
              Tidak ada chapter yang ditemukan untuk "{searchTerm}"
            </div>
          )}
          
          {/* Scroll indicator untuk banyak chapter */}
          {chapters.length > 10 && !searchTerm && (
            <div className="sticky bottom-0 bg-gray-50 px-3 py-1 text-xs text-gray-500 text-center border-t border-gray-200">
              {chapters.length} chapters total • Scroll untuk lebih banyak
            </div>
          )}
        </div>
      )}
    </div>
  );
} 