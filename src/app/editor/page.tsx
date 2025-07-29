'use client';

import React, { useState, useEffect } from 'react';

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
      warning: '<Warning>\nPeringatan penting di sini...\n</Warning>',
      quote: '<Quote author="Nama Karakter">\nKutipan penting di sini...\n</Quote>',
      image: '<Image \n  src="/images/scene.jpg" \n  alt="Deskripsi gambar" \n  caption="Caption gambar"\n/>',
      spoiler: '<Spoiler>\nKonten spoiler di sini...\n</Spoiler>'
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Novel Slug
              </label>
              <input
                type="text"
                value={novelSlug}
                onChange={(e) => setNovelSlug(e.target.value)}
                placeholder="the-legend-of-aria"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chapter Slug
              </label>
              <input
                type="text"
                value={chapterSlug}
                onChange={(e) => setChapterSlug(e.target.value)}
                placeholder="chapter-1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => insertComponent('warning')}
              className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
            >
              ⚠️ Warning
            </button>
            <button
              onClick={() => insertComponent('quote')}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
            >
              💬 Quote
            </button>
            <button
              onClick={() => insertComponent('image')}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
            >
              🖼️ Image
            </button>
            <button
              onClick={() => insertComponent('spoiler')}
              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200 transition-colors"
            >
              🔒 Spoiler
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isSaving ? 'Menyimpan...' : '💾 Simpan Chapter'}
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              🗑️ Hapus Draft
            </button>
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
            className="w-full h-96 p-6 border-0 focus:outline-none resize-none font-mono text-sm"
            style={{ minHeight: '500px' }}
          />
        </div>

        {/* Preview Section */}
        {content && (
          <div className="mt-6 bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
              <p className="text-sm text-gray-600 mt-1">
                Preview konten chapter (akan diimplementasikan dengan MDX rendering)
              </p>
            </div>
            <div className="p-6">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-md overflow-auto max-h-96">
                {content}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 