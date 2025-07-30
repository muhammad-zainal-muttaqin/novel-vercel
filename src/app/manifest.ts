import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Novel Vercel - Platform Baca Novel Online',
    short_name: 'Novel Vercel',
    description: 'Platform baca dan tulis novel berbasis web yang cepat, ringan, dan skalabel menggunakan Next.js, MDX, dan Vercel.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}