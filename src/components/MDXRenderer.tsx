'use client';

import React from 'react';
import { Warning, Quote, NovelImage, Spoiler } from './MDXComponents';

interface MDXRendererProps {
  content: string;
}

export default function MDXRenderer({ content }: MDXRendererProps) {
  // Parse content dan render custom components
  const renderContent = (text: string) => {
    // Split content berdasarkan custom components
    const parts = text.split(/(<Warning>[\s\S]*?<\/Warning>|<Quote[\s\S]*?<\/Quote>|<Image[\s\S]*?\/>|<Spoiler>[\s\S]*?<\/Spoiler>)/g);
    
    return parts.map((part, index) => {
      // Warning component
      if (part.startsWith('<Warning>') && part.endsWith('</Warning>')) {
        const content = part.replace(/<Warning>\n?([\s\S]*?)\n?<\/Warning>/, '$1').trim();
        return <Warning key={index}>{content}</Warning>;
      }
      
      // Quote component
      if (part.startsWith('<Quote') && part.endsWith('</Quote>')) {
        const authorMatch = part.match(/author="([^"]*)"/);
        const author = authorMatch ? authorMatch[1] : '';
        const content = part.replace(/<Quote[^>]*>\n?([\s\S]*?)\n?<\/Quote>/, '$1').trim();
        return <Quote key={index} author={author}>{content}</Quote>;
      }
      
      // Image component
      if (part.startsWith('<Image') && part.endsWith('/>')) {
        const srcMatch = part.match(/src="([^"]*)"/);
        const altMatch = part.match(/alt="([^"]*)"/);
        const captionMatch = part.match(/caption="([^"]*)"/);
        
        const src = srcMatch ? srcMatch[1] : '';
        const alt = altMatch ? altMatch[1] : '';
        const caption = captionMatch ? captionMatch[1] : '';
        
        return <NovelImage key={index} src={src} alt={alt} caption={caption} />;
      }
      
      // Spoiler component
      if (part.startsWith('<Spoiler>') && part.endsWith('</Spoiler>')) {
        const content = part.replace(/<Spoiler>\n?([\s\S]*?)\n?<\/Spoiler>/, '$1').trim();
        return <Spoiler key={index}>{content}</Spoiler>;
      }
      
      // Regular text content
      if (part.trim()) {
        // Parse markdown headings
        const lines = part.split('\n');
        return lines.map((line, lineIndex) => {
          const trimmedLine = line.trim();
          
          if (trimmedLine.startsWith('# ')) {
            return <h1 key={`${index}-${lineIndex}`} className="text-3xl font-bold mb-6 text-gray-900">{trimmedLine.substring(2)}</h1>;
          }
          if (trimmedLine.startsWith('## ')) {
            return <h2 key={`${index}-${lineIndex}`} className="text-2xl font-semibold mb-4 text-gray-800">{trimmedLine.substring(3)}</h2>;
          }
          if (trimmedLine.startsWith('### ')) {
            return <h3 key={`${index}-${lineIndex}`} className="text-xl font-medium mb-3 text-gray-700">{trimmedLine.substring(4)}</h3>;
          }
          if (trimmedLine.startsWith('#### ')) {
            return <h4 key={`${index}-${lineIndex}`} className="text-lg font-medium mb-2 text-gray-700">{trimmedLine.substring(5)}</h4>;
          }
          if (trimmedLine.startsWith('##### ')) {
            return <h5 key={`${index}-${lineIndex}`} className="text-base font-medium mb-2 text-gray-700">{trimmedLine.substring(6)}</h5>;
          }
          if (trimmedLine.startsWith('###### ')) {
            return <h6 key={`${index}-${lineIndex}`} className="text-sm font-medium mb-2 text-gray-700">{trimmedLine.substring(7)}</h6>;
          }
          
          // Regular paragraph
          if (trimmedLine) {
            return <p key={`${index}-${lineIndex}`} className="mb-4 leading-relaxed text-gray-700">{trimmedLine}</p>;
          }
          
          return null;
        });
      }
      
      return null;
    });
  };

  return (
    <div className="mdx-content">
      {renderContent(content)}
    </div>
  );
} 