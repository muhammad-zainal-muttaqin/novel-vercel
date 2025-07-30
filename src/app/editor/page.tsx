'use client';

import React, { useState, useEffect } from 'react';
import MDXRenderer from '@/components/MDXRenderer';
import { analytics } from '@/utils/analytics';
import Button from '@/components/Button';

export default function EditorPage() {
  const [content, setContent] = useState('');
  const [novelSlug, setNovelSlug] = useState('');
  const [chapterSlug, setChapterSlug] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Auto-save to localStorage
  useEffect(() => {
    const savedContent = localStorage.getItem('editor-draft');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('editor-draft', content);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [content]);

  const insertComponent = (component: string) => {
            const templates = {
          // Text Formatting
          h1: '# Judul Utama',
          h2: '## Sub Judul',
          h3: '### Sub Sub Judul',
          bold: '**Teks tebal**',
          italic: '*Teks miring*',
          list: '- Item 1\n- Item 2\n- Item 3',
          link: '[Teks Link](https://example.com)',
          
          // Novel Components
          warning: '<Warning>\nPeringatan penting di sini...\n</Warning>',
          quote: '<Quote author="Nama Karakter">\nKutipan penting di sini...\n</Quote>',
          image: '<Image \n  src="/images/scene.jpg" \n  alt="Deskripsi gambar" \n  caption="Caption gambar"\n/>',
          spoiler: '<Spoiler>\nKonten spoiler di sini...\n</Spoiler>',
          character: '<Character name="Nama Karakter" role="Protagonist">\nDeskripsi karakter di sini...\n</Character>',
          scene: '<Scene setting="Lokasi Scene" time="Waktu">\nDeskripsi scene di sini...\n</Scene>',
          dialogue: '<Dialogue speaker="Nama Karakter">\nDialog karakter di sini...\n</Dialogue>',
          
          // Story Elements
          chapter: '# Chapter 1: Judul Chapter\n\nKonten chapter dimulai di sini...',
          time: '<TimeIndicator time="Pagi hari" date="29 Juli 2024">\nIndikator waktu cerita\n</TimeIndicator>',
          location: '<Location name="Nama Lokasi" description="Deskripsi lokasi">\nDetail lokasi di sini...\n</Location>',
          emotion: '<Emotion type="senang" intensity="tinggi">\nDeskripsi emosi karakter...\n</Emotion>'
        };

    const template = templates[component as keyof typeof templates];
    if (template) {
      setContent(prev => prev + '\n\n' + template);
    }
  };

  const handleSave = async () => {
    if (!novelSlug || !chapterSlug) {
      setMessage('Error: Novel slug dan chapter slug harus diisi');
      return;
    }

    setIsSaving(true);
    setMessage('Menyimpan...');

    try {
      // Track editor save event
      analytics.trackEditorUsage('save_chapter');
      
      // Simulasi save ke GitHub (akan diimplementasikan nanti)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear localStorage after successful save
      localStorage.removeItem('editor-draft');
      setMessage('Berhasil disimpan!');
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error: Gagal menyimpan');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    if (confirm('Yakin ingin menghapus semua konten?')) {
      setContent('');
      localStorage.removeItem('editor-draft');
      setMessage('Konten dihapus');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Novel Editor</h1>
          
          {/* Metadata Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Novel Slug
              </label>
              <input
                type="text"
                value={novelSlug}
                onChange={(e) => setNovelSlug(e.target.value)}
                placeholder="the-legend-of-aria"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Chapter Slug
              </label>
              <input
                type="text"
                value={chapterSlug}
                onChange={(e) => setChapterSlug(e.target.value)}
                placeholder="chapter-1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              />
            </div>
          </div>

                          {/* Toolbar */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">📝 Text Formatting</h3>
                                     <div className="flex flex-wrap gap-2 mb-3">
                     <Button
                       onClick={() => insertComponent('h1')}
                       variant="secondary"
                       size="sm"
                       className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                     >
                       H1
                     </Button>
                     <Button
                       onClick={() => insertComponent('h2')}
                       variant="secondary"
                       size="sm"
                       className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                     >
                       H2
                     </Button>
                     <Button
                       onClick={() => insertComponent('h3')}
                       variant="secondary"
                       size="sm"
                       className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                     >
                       H3
                     </Button>
                     <Button
                       onClick={() => insertComponent('bold')}
                       variant="secondary"
                       size="sm"
                       className="bg-gray-100 text-gray-800 hover:bg-gray-200 font-bold"
                     >
                       B
                     </Button>
                     <Button
                       onClick={() => insertComponent('italic')}
                       variant="secondary"
                       size="sm"
                       className="bg-gray-100 text-gray-800 hover:bg-gray-200 italic"
                     >
                       I
                     </Button>
                     <Button
                       onClick={() => insertComponent('list')}
                       variant="secondary"
                       size="sm"
                       className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                     >
                       📋 List
                     </Button>
                     <Button
                       onClick={() => insertComponent('link')}
                       variant="secondary"
                       size="sm"
                       className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                     >
                       🔗 Link
                     </Button>
                   </div>

                  <h3 className="text-sm font-semibold text-gray-700 mb-2">🎨 Novel Components</h3>
                                     <div className="flex flex-wrap gap-2 mb-3">
                     <Button
                       onClick={() => insertComponent('warning')}
                       variant="secondary"
                       size="sm"
                       className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                     >
                       ⚠️ Warning
                     </Button>
                     <Button
                       onClick={() => insertComponent('quote')}
                       variant="secondary"
                       size="sm"
                       className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                     >
                       💬 Quote
                     </Button>
                     <Button
                       onClick={() => insertComponent('image')}
                       variant="secondary"
                       size="sm"
                       className="bg-green-100 text-green-800 hover:bg-green-200"
                     >
                       🖼️ Image
                     </Button>
                     <Button
                       onClick={() => insertComponent('spoiler')}
                       variant="secondary"
                       size="sm"
                       className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                     >
                       🔒 Spoiler
                     </Button>
                     <Button
                       onClick={() => insertComponent('character')}
                       variant="secondary"
                       size="sm"
                       className="bg-pink-100 text-pink-800 hover:bg-pink-200"
                     >
                       👤 Character
                     </Button>
                     <Button
                       onClick={() => insertComponent('scene')}
                       variant="secondary"
                       size="sm"
                       className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                     >
                       🎭 Scene
                     </Button>
                     <Button
                       onClick={() => insertComponent('dialogue')}
                       variant="secondary"
                       size="sm"
                       className="bg-orange-100 text-orange-800 hover:bg-orange-200"
                     >
                       💭 Dialogue
                     </Button>
                   </div>

                  <h3 className="text-sm font-semibold text-gray-700 mb-2">📚 Story Elements</h3>
                                     <div className="flex flex-wrap gap-2">
                     <Button
                       onClick={() => insertComponent('chapter')}
                       variant="secondary"
                       size="sm"
                       className="bg-red-100 text-red-800 hover:bg-red-200"
                     >
                       📖 Chapter
                     </Button>
                     <Button
                       onClick={() => insertComponent('time')}
                       variant="secondary"
                       size="sm"
                       className="bg-teal-100 text-teal-800 hover:bg-teal-200"
                     >
                       ⏰ Time
                     </Button>
                     <Button
                       onClick={() => insertComponent('location')}
                       variant="secondary"
                       size="sm"
                       className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200"
                     >
                       🗺️ Location
                     </Button>
                     <Button
                       onClick={() => insertComponent('emotion')}
                       variant="secondary"
                       size="sm"
                       className="bg-rose-100 text-rose-800 hover:bg-rose-200"
                     >
                       😊 Emotion
                     </Button>
                   </div>
                </div>

                     {/* Action Buttons */}
           <div className="flex gap-2">
             <Button
               onClick={handleSave}
               disabled={isSaving}
               variant="primary"
             >
               {isSaving ? 'Menyimpan...' : '💾 Simpan Chapter'}
             </Button>
             <Button
               onClick={handleClear}
               variant="danger"
             >
               🗑️ Hapus Draft
             </Button>
           </div>

          {/* Message */}
          {message && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-800">{message}</p>
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Editor MDX</h2>
            <p className="text-sm text-gray-600 mt-1">
              Tulis chapter novel Anda menggunakan format MDX. Gunakan toolbar di atas untuk menambahkan komponen.
            </p>
          </div>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`# Chapter 1: The Beginning

Matahari terbit di cakrawala timur, menandakan dimulainya hari baru...

<Warning>
Bagian ini mengandung spoiler penting!
</Warning>

<Quote author="Karakter Utama">
Kutipan penting dari karakter.
</Quote>

Konten novel Anda di sini...`}
            className="w-full h-96 p-6 border-0 focus:outline-none resize-none font-mono text-sm text-gray-900 bg-white"
            style={{ minHeight: '500px' }}
          />
        </div>

        {/* Preview Section */}
        {content && (
          <div className="mt-6 bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
              <p className="text-sm text-gray-600 mt-1">
                Preview konten chapter dengan MDX rendering
              </p>
            </div>
            <div className="p-6">
                                 <div className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96 border border-gray-200">
                     <div className="novel-content">
                       <MDXRenderer content={content} />
                     </div>
                   </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 