'use client';

import React from 'react';
import { 
  Warning, 
  Quote, 
  NovelImage, 
  Spoiler, 
  Character, 
  Scene, 
  Dialogue, 
  TimeIndicator, 
  Location, 
  Emotion 
} from './MDXComponents';

interface MDXRendererProps {
  content: string;
}

export default function MDXRenderer({ content }: MDXRendererProps) {
  // Parse content dan render custom components
  const renderContent = (text: string) => {
    // Split content berdasarkan custom components
    const parts = text.split(/(<Warning>[\s\S]*?<\/Warning>|<Quote[\s\S]*?<\/Quote>|<Image[\s\S]*?\/>|<Spoiler>[\s\S]*?<\/Spoiler>|<Character[\s\S]*?<\/Character>|<Scene[\s\S]*?<\/Scene>|<Dialogue[\s\S]*?<\/Dialogue>|<TimeIndicator[\s\S]*?<\/TimeIndicator>|<Location[\s\S]*?<\/Location>|<Emotion[\s\S]*?<\/Emotion>)/g);
    
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
      
      // Character component
      if (part.startsWith('<Character') && part.endsWith('</Character>')) {
        const nameMatch = part.match(/name="([^"]*)"/);
        const roleMatch = part.match(/role="([^"]*)"/);
        const name = nameMatch ? nameMatch[1] : '';
        const role = roleMatch ? roleMatch[1] : '';
        const content = part.replace(/<Character[^>]*>\n?([\s\S]*?)\n?<\/Character>/, '$1').trim();
        return <Character key={index} name={name} role={role}>{content}</Character>;
      }
      
      // Scene component
      if (part.startsWith('<Scene') && part.endsWith('</Scene>')) {
        const settingMatch = part.match(/setting="([^"]*)"/);
        const timeMatch = part.match(/time="([^"]*)"/);
        const setting = settingMatch ? settingMatch[1] : '';
        const time = timeMatch ? timeMatch[1] : '';
        const content = part.replace(/<Scene[^>]*>\n?([\s\S]*?)\n?<\/Scene>/, '$1').trim();
        return <Scene key={index} setting={setting} time={time}>{content}</Scene>;
      }
      
      // Dialogue component
      if (part.startsWith('<Dialogue') && part.endsWith('</Dialogue>')) {
        const speakerMatch = part.match(/speaker="([^"]*)"/);
        const speaker = speakerMatch ? speakerMatch[1] : '';
        const content = part.replace(/<Dialogue[^>]*>\n?([\s\S]*?)\n?<\/Dialogue>/, '$1').trim();
        return <Dialogue key={index} speaker={speaker}>{content}</Dialogue>;
      }
      
      // TimeIndicator component
      if (part.startsWith('<TimeIndicator') && part.endsWith('</TimeIndicator>')) {
        const timeMatch = part.match(/time="([^"]*)"/);
        const dateMatch = part.match(/date="([^"]*)"/);
        const time = timeMatch ? timeMatch[1] : '';
        const date = dateMatch ? dateMatch[1] : '';
        const content = part.replace(/<TimeIndicator[^>]*>\n?([\s\S]*?)\n?<\/TimeIndicator>/, '$1').trim();
        return <TimeIndicator key={index} time={time} date={date}>{content}</TimeIndicator>;
      }
      
      // Location component
      if (part.startsWith('<Location') && part.endsWith('</Location>')) {
        const nameMatch = part.match(/name="([^"]*)"/);
        const descriptionMatch = part.match(/description="([^"]*)"/);
        const name = nameMatch ? nameMatch[1] : '';
        const description = descriptionMatch ? descriptionMatch[1] : '';
        const content = part.replace(/<Location[^>]*>\n?([\s\S]*?)\n?<\/Location>/, '$1').trim();
        return <Location key={index} name={name} description={description}>{content}</Location>;
      }
      
      // Emotion component
      if (part.startsWith('<Emotion') && part.endsWith('</Emotion>')) {
        const typeMatch = part.match(/type="([^"]*)"/);
        const intensityMatch = part.match(/intensity="([^"]*)"/);
        const type = typeMatch ? typeMatch[1] : '';
        const intensity = intensityMatch ? intensityMatch[1] : '';
        const content = part.replace(/<Emotion[^>]*>\n?([\s\S]*?)\n?<\/Emotion>/, '$1').trim();
        return <Emotion key={index} type={type} intensity={intensity}>{content}</Emotion>;
      }
      
      // Regular text content
      if (part.trim()) {
        // Parse markdown headings
        const lines = part.split('\n');
        return lines.map((line, lineIndex) => {
          const trimmedLine = line.trim();
          
                           if (trimmedLine.startsWith('# ')) {
                   const headingContent = trimmedLine.substring(2);
                   const renderFormattedText = (text: string) => {
                     text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                     text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
                     return text;
                   };
                   
                   return (
                     <h1 
                       key={`${index}-${lineIndex}`} 
                       className="text-3xl font-bold mb-6 text-gray-900"
                       dangerouslySetInnerHTML={{ __html: renderFormattedText(headingContent) }}
                     />
                   );
                 }
                 if (trimmedLine.startsWith('## ')) {
                   const headingContent = trimmedLine.substring(3);
                   const renderFormattedText = (text: string) => {
                     text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                     text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
                     return text;
                   };
                   
                   return (
                     <h2 
                       key={`${index}-${lineIndex}`} 
                       className="text-2xl font-semibold mb-4 text-gray-800"
                       dangerouslySetInnerHTML={{ __html: renderFormattedText(headingContent) }}
                     />
                   );
                 }
                 if (trimmedLine.startsWith('### ')) {
                   const headingContent = trimmedLine.substring(4);
                   const renderFormattedText = (text: string) => {
                     text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                     text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
                     return text;
                   };
                   
                   return (
                     <h3 
                       key={`${index}-${lineIndex}`} 
                       className="text-xl font-medium mb-3 text-gray-700"
                       dangerouslySetInnerHTML={{ __html: renderFormattedText(headingContent) }}
                     />
                   );
                 }
                 if (trimmedLine.startsWith('#### ')) {
                   const headingContent = trimmedLine.substring(5);
                   const renderFormattedText = (text: string) => {
                     text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                     text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
                     return text;
                   };
                   
                   return (
                     <h4 
                       key={`${index}-${lineIndex}`} 
                       className="text-lg font-medium mb-2 text-gray-700"
                       dangerouslySetInnerHTML={{ __html: renderFormattedText(headingContent) }}
                     />
                   );
                 }
                 if (trimmedLine.startsWith('##### ')) {
                   const headingContent = trimmedLine.substring(6);
                   const renderFormattedText = (text: string) => {
                     text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                     text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
                     return text;
                   };
                   
                   return (
                     <h5 
                       key={`${index}-${lineIndex}`} 
                       className="text-base font-medium mb-2 text-gray-700"
                       dangerouslySetInnerHTML={{ __html: renderFormattedText(headingContent) }}
                     />
                   );
                 }
                 if (trimmedLine.startsWith('###### ')) {
                   const headingContent = trimmedLine.substring(7);
                   const renderFormattedText = (text: string) => {
                     text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                     text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
                     return text;
                   };
                   
                   return (
                     <h6 
                       key={`${index}-${lineIndex}`} 
                       className="text-sm font-medium mb-2 text-gray-700"
                       dangerouslySetInnerHTML={{ __html: renderFormattedText(headingContent) }}
                     />
                   );
                 }
                 
                 // List items
                 if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
                   const listContent = trimmedLine.substring(2);
                   const renderFormattedText = (text: string) => {
                     text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                     text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
                     text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>');
                     return text;
                   };
                   
                   return (
                     <li 
                       key={`${index}-${lineIndex}`} 
                       className="mb-1 text-gray-700"
                       dangerouslySetInnerHTML={{ __html: renderFormattedText(listContent) }}
                     />
                   );
                 }
                 
                 // Numbered list items
                 if (/^\d+\.\s/.test(trimmedLine)) {
                   const listContent = trimmedLine.replace(/^\d+\.\s/, '');
                   const renderFormattedText = (text: string) => {
                     text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                     text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
                     text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>');
                     return text;
                   };
                   
                   return (
                     <li 
                       key={`${index}-${lineIndex}`} 
                       className="mb-1 text-gray-700"
                       dangerouslySetInnerHTML={{ __html: renderFormattedText(listContent) }}
                     />
                   );
                 }
          
                           // Regular paragraph
                 if (trimmedLine) {
                   // Parse markdown formatting and links
                   const renderFormattedText = (text: string) => {
                     // Parse bold text
                     text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                     
                     // Parse italic text
                     text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
                     
                     // Parse links
                     text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>');
                     
                     return text;
                   };
                   
                   const formattedText = renderFormattedText(trimmedLine);
                   
                   return (
                     <p 
                       key={`${index}-${lineIndex}`} 
                       className="mb-4 leading-relaxed text-gray-700"
                       dangerouslySetInnerHTML={{ __html: formattedText }}
                     />
                   );
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