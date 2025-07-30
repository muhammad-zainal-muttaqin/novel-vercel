'use client';

import Button from './Button';

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
        <Button
          href={`/novel/${novelSlug}/${prevChapter.slug}`}
          variant="secondary"
          size="sm"
          className="flex items-center"
        >
          <span className="mr-1">←</span>
          <span>Prev</span>
        </Button>
      ) : (
        <Button
          disabled={true}
          variant="secondary"
          size="sm"
          className="flex items-center opacity-50"
        >
          <span className="mr-1">←</span>
          <span>Prev</span>
        </Button>
      )}
      
      {nextChapter ? (
        <Button
          href={`/novel/${novelSlug}/${nextChapter.slug}`}
          variant="primary"
          size="sm"
          className="flex items-center"
        >
          <span>Next</span>
          <span className="ml-1">→</span>
        </Button>
      ) : (
        <Button
          disabled={true}
          variant="primary"
          size="sm"
          className="flex items-center opacity-50"
        >
          <span>Next</span>
          <span className="ml-1">→</span>
        </Button>
      )}
    </div>
  );
} 