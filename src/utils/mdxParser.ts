import React from 'react';
import { mdxComponents } from '@/components/MDXComponents';

// Simple MDX parser untuk render custom components
export function parseMDX(content: string): React.ReactNode {
  // Parse headings
  let parsedContent = content
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
    .replace(/^###### (.*$)/gim, '<h6>$1</h6>');

  // Parse paragraphs
  parsedContent = parsedContent.replace(/^(?!<[h|W|Q|I|S])(.+)$/gim, '<p>$1</p>');

  // Parse Warning component
  parsedContent = parsedContent.replace(
    /<Warning>\n([\s\S]*?)\n<\/Warning>/g,
    (match, content) => {
      return `<div class="warning-component">${content}</div>`;
    }
  );

  // Parse Quote component
  parsedContent = parsedContent.replace(
    /<Quote author="([^"]*)">\n([\s\S]*?)\n<\/Quote>/g,
    (match, author, content) => {
      return `<div class="quote-component" data-author="${author}">${content}</div>`;
    }
  );

  // Parse Image component
  parsedContent = parsedContent.replace(
    /<Image\s+src="([^"]*)"\s+alt="([^"]*)"\s+caption="([^"]*)"\s*\/>/g,
    (match, src, alt, caption) => {
      return `<div class="image-component" data-src="${src}" data-alt="${alt}" data-caption="${caption}"></div>`;
    }
  );

  // Parse Spoiler component
  parsedContent = parsedContent.replace(
    /<Spoiler>\n([\s\S]*?)\n<\/Spoiler>/g,
    (match, content) => {
      return `<div class="spoiler-component">${content}</div>`;
    }
  );

  return parsedContent;
}

// Render parsed content dengan custom components
export function renderMDX(content: string): React.ReactNode {
  const parsed = parseMDX(content);
  
  if (typeof parsed === 'string') {
    return (
      <div 
        className="mdx-content"
        dangerouslySetInnerHTML={{ __html: parsed }}
      />
    );
  }
  
  return parsed;
} 