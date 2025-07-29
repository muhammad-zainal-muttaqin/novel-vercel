import React from 'react';
import Image from 'next/image';

// Warning Component
export const Warning = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4 rounded">
    <div className="flex">
      <div className="flex-shrink-0">
        ⚠️
      </div>
      <div className="ml-3">
        <p className="text-sm text-yellow-700">{children}</p>
      </div>
    </div>
  </div>
);

// Quote Component
export const Quote = ({ author, children }: { author?: string; children: React.ReactNode }) => (
  <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-4 italic my-4">
    <p>"{children}"</p>
    {author && <cite className="block text-right mt-2 text-sm text-gray-600">— {author}</cite>}
  </blockquote>
);

// Image Component dengan Next.js Image optimization
export const NovelImage = ({ 
  src, 
  alt, 
  caption, 
  loading = "lazy" 
}: { 
  src: string; 
  alt: string; 
  caption?: string; 
  loading?: "lazy" | "eager" 
}) => (
  <figure className="my-6">
    <div className="relative w-full h-64 md:h-96">
      <Image 
        src={src} 
        alt={alt} 
        fill
        loading={loading}
        className="object-cover rounded-lg shadow-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    {caption && (
      <figcaption className="text-center text-sm text-gray-600 mt-2">
        {caption}
      </figcaption>
    )}
  </figure>
);

// Spoiler Component
export const Spoiler = ({ children }: { children: React.ReactNode }) => (
  <details className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4">
    <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
      🔒 Spoiler - Klik untuk membuka
    </summary>
    <div className="mt-2 text-gray-800">
      {children}
    </div>
  </details>
);

// Chapter Navigation Component
export const ChapterNav = ({ 
  prevChapter, 
  nextChapter, 
  novelSlug 
}: { 
  prevChapter?: { number: number; title: string; slug: string }; 
  nextChapter?: { number: number; title: string; slug: string }; 
  novelSlug: string; 
}) => (
  <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
    {prevChapter ? (
      <a 
        href={`/novel/${novelSlug}/${prevChapter.slug}`}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <span className="mr-2">←</span>
        <div>
          <div className="text-sm text-gray-500">Chapter Sebelumnya</div>
          <div className="font-medium">Chapter {prevChapter.number}: {prevChapter.title}</div>
        </div>
      </a>
    ) : (
      <div></div>
    )}
    
    {nextChapter ? (
      <a 
        href={`/novel/${novelSlug}/${nextChapter.slug}`}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <div className="text-right">
          <div className="text-sm text-gray-500">Chapter Selanjutnya</div>
          <div className="font-medium">Chapter {nextChapter.number}: {nextChapter.title}</div>
        </div>
        <span className="ml-2">→</span>
      </a>
    ) : (
      <div></div>
    )}
  </div>
);

// Table of Contents Component
export const TableOfContents = ({ 
  chapters, 
  novelSlug, 
  currentChapter 
}: { 
  chapters: Array<{ number: number; title: string; slug: string }>; 
  novelSlug: string; 
  currentChapter: number; 
}) => (
  <div className="bg-gray-50 p-4 rounded-lg mb-6">
    <h3 className="font-semibold text-lg mb-3">Daftar Chapter</h3>
    <div className="space-y-2">
      {chapters.map((chapter) => (
        <a
          key={chapter.slug}
          href={`/novel/${novelSlug}/${chapter.slug}`}
          className={`block p-2 rounded transition-colors ${
            chapter.number === currentChapter
              ? 'bg-blue-100 text-blue-800 font-medium'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          Chapter {chapter.number}: {chapter.title}
        </a>
      ))}
    </div>
  </div>
);

// Reading Progress Component
export const ReadingProgress = ({ progress }: { progress: number }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
    <div 
      className="h-full bg-blue-600 transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
);

// Default MDX components
export const mdxComponents = {
  Warning,
  Quote,
  Image: NovelImage,
  Spoiler,
  ChapterNav,
  TableOfContents,
  ReadingProgress,
  // Override default elements
  h1: (props: any) => <h1 className="text-3xl font-bold mb-6 text-gray-900" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mb-4 text-gray-800" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-medium mb-3 text-gray-700" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
  ul: (props: any) => <ul className="mb-4 ml-6 list-disc text-gray-700" {...props} />,
  ol: (props: any) => <ol className="mb-4 ml-6 list-decimal text-gray-700" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
  blockquote: (props: any) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4" {...props} />,
  code: (props: any) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props} />,
  pre: (props: any) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
}; 