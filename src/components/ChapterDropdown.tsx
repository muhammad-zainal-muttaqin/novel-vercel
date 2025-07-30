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
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
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
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
          {chapters.map((chapter) => (
            <button
              key={chapter.slug}
              onClick={() => handleChapterSelect(chapter.slug)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
                chapter.slug === currentChapter 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700'
              }`}
            >
              <div className="font-medium">Chapter {chapter.number}</div>
              <div className="text-xs text-gray-500 truncate">{chapter.title}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 