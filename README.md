# 📚 Novel Vercel - Platform Baca Novel Online

Platform baca dan tulis novel berbasis web yang cepat, ringan, dan skalabel menggunakan Next.js, MDX, dan Vercel.

## 🎯 Fitur Utama

- **📖 Reader Website**: Interface membaca novel yang responsif dan user-friendly
- **✏️ Editor Website**: Editor MDX dengan komponen custom untuk menulis novel
- **🔐 Authentication**: Basic auth untuk proteksi editor
- **📱 Responsive**: Optimized untuk desktop dan mobile
- **⚡ Performance**: Static site generation untuk kecepatan maksimal
- **🔍 SEO Optimized**: Meta tags, sitemap, dan structured data
- **🎨 Custom Components**: Warning, Quote, Image, Spoiler, Character, Scene, Dialogue, TimeIndicator, Location, Emotion
- **📊 Analytics**: Reading progress tracking dan analytics
- **📝 Markdown Support**: Bold, italic, links, dan formatting lengkap

## 🆕 Latest Updates

### ✅ Recently Completed (January 2025)
- **Enhanced Editor UI/UX**: Comprehensive toolbar dengan 15+ komponen MDX
- **Advanced MDX Components**: Character, Scene, Dialogue, TimeIndicator, Location, Emotion
- **Markdown Formatting**: Support untuk bold, italic, dan clickable links
- **Text Contrast Fixes**: Improved readability untuk semua komponen
- **Sample Content**: Chapter-2.mdx dengan semua fitur MDX
- **Progress Tracking**: 61% completion (52/85 tasks)

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX (Markdown + JSX)
- **Hosting**: Vercel
- **Authentication**: Basic Auth
- **Content Management**: GitHub + MDX files

## 📁 Struktur Proyek

```
novel-vercel/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # React components
│   │   └── MDXComponents.tsx   # Custom MDX components
│   └── utils/                  # Utility functions
│       └── contentHelpers.ts   # Content management
├── novel/                      # Novel content (MDX files)
│   └── the-legend-of-aria/     # Sample novel
│       ├── metadata.json       # Novel metadata
│       ├── chapter-1.mdx       # Chapter content
│       └── images/             # Novel images
├── public/                     # Static assets
├── next.config.ts              # Next.js configuration
└── package.json                # Dependencies
```

## 🛠️ Setup Development

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Git

### Installation

1. **Clone repository**
```bash
git clone https://github.com/muhammad-zainal-muttaqin/novel-vercel.git
cd novel-vercel
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` dengan konfigurasi yang diperlukan:
```env
# GitHub Integration (untuk editor)
GITHUB_PERSONAL_TOKEN=your_github_token
GITHUB_REPO_OWNER=your_username
GITHUB_REPO_NAME=novel-content

# Security
EDITOR_PASSWORD=your_strong_password

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

4. **Run development server**
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

## 📝 Cara Menulis Novel

### Format MDX

Novel ditulis menggunakan format MDX yang mendukung komponen custom:

```mdx
# Chapter 1: The Beginning

<Warning>
Bagian ini mengandung spoiler penting!
</Warning>

<Image 
  src="/images/chapter-1-scene.jpg" 
  alt="Scene pembuka" 
  caption="Aria menatap cakrawala"
/>

<Quote author="Aria">
Dunia ini akan berubah, dan aku akan menjadi bagian dari perubahan itu.
</Quote>

Konten novel Anda di sini...
```

### Komponen MDX yang Tersedia

- `<Warning>` - Peringatan dengan background kuning
- `<Image>` - Gambar dengan caption dan optimization
- `<Quote>` - Quote dengan author
- `<Spoiler>` - Konten spoiler yang bisa dibuka/tutup
- `<ChapterNav>` - Navigasi antar chapter
- `<TableOfContents>` - Daftar isi chapter

### Struktur Novel

Setiap novel memiliki folder sendiri dengan struktur:

```
novel/novel-slug/
├── metadata.json     # Metadata novel
├── chapter-1.mdx     # Chapter 1
├── chapter-2.mdx     # Chapter 2
└── images/           # Gambar novel
    ├── cover.jpg
    └── chapter-1-scene.jpg
```

### Metadata Format

```json
{
  "title": "Judul Novel",
  "author": "Nama Penulis",
  "genre": "Fantasy",
  "description": "Deskripsi novel",
  "coverImage": "/images/cover.jpg",
  "status": "ongoing",
  "totalChapters": 5,
  "publishedAt": "2024-07-29T00:00:00.000Z",
  "updatedAt": "2024-07-29T00:00:00.000Z",
  "tags": ["fantasy", "adventure"],
  "rating": 4.5,
  "readCount": 0,
  "chapters": [
    {
      "number": 1,
      "title": "Chapter Title",
      "slug": "chapter-1",
      "publishedAt": "2024-07-29T00:00:00.000Z",
      "wordCount": 2500
    }
  ]
}
```

## 🔐 Editor Access

Editor tersedia di `/editor` dan dilindungi dengan Basic Authentication.

1. Setup password di `.env.local`:
```env
EDITOR_PASSWORD=your_strong_password
```

2. Akses editor di: `http://localhost:3000/editor`

3. Masukkan credentials:
   - Username: `admin`
   - Password: `your_strong_password`

## 🚀 Deployment

### Vercel (Recommended)

1. **Push ke GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy ke Vercel**
   - Connect repository di [Vercel Dashboard](https://vercel.com)
   - Set environment variables
   - Deploy otomatis

### Environment Variables untuk Production

```env
# GitHub Integration
GITHUB_PERSONAL_TOKEN=ghp_xxxxxxxxxxxx
GITHUB_REPO_OWNER=yourusername
GITHUB_REPO_NAME=novel-content

# Security
EDITOR_PASSWORD=your-strong-password-here

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📊 Performance

- **Page Load Time**: < 2 seconds
- **Lighthouse Score**: > 90
- **Mobile Performance**: > 85
- **SEO Score**: > 95

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Content Management
npm run validate     # Validate all MDX files
npm run backup       # Backup content to S3 (if configured)
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 📈 Analytics & Monitoring

- **Google Analytics**: Reading behavior tracking
- **Vercel Analytics**: Performance monitoring
- **Error Tracking**: Automatic error reporting
- **Reading Progress**: Local storage tracking

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](https://github.com/muhammad-zainal-muttaqin/novel-vercel/wiki)
- **Issues**: [GitHub Issues](https://github.com/muhammad-zainal-muttaqin/novel-vercel/issues)
- **Discussions**: [GitHub Discussions](https://github.com/muhammad-zainal-muttaqin/novel-vercel/discussions)

## 🗺️ Roadmap

### Phase 1 ✅ (Completed)
- [x] Basic MDX rendering
- [x] Custom components (Warning, Quote, Image, Spoiler)
- [x] Content management
- [x] Basic authentication

### Phase 2 ✅ (Completed)
- [x] Advanced editor features
- [x] GitHub integration
- [x] Reading progress tracking
- [x] Enhanced MDX components (Character, Scene, Dialogue, TimeIndicator, Location, Emotion)
- [x] Markdown formatting support (bold, italic, links)
- [x] Comprehensive toolbar dengan 15+ components

### Phase 3 🔄 (In Progress)
- [ ] User comments
- [ ] Search functionality
- [ ] Mobile PWA
- [ ] Offline reading
- [ ] Dark mode support
- [ ] Performance optimization

### Phase 4 📋 (Planned)
- [ ] User subscriptions
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] API for mobile apps
- [ ] Advanced search dengan filters
- [ ] Social sharing features

---

**Made with ❤️ using Next.js, MDX, and Vercel**
