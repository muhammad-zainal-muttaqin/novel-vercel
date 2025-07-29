import type { Metadata } from "next";
import { Inter, Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

// Primary serif font for novel content (Baskerville alternative)
const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// Fallback serif font (Garamond alternative)
const lora = Lora({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

// Sans-serif font for UI elements
const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Novel Vercel - Platform Baca Novel Online",
  description: "Platform baca dan tulis novel berbasis web yang cepat, ringan, dan skalabel menggunakan Next.js, MDX, dan Vercel.",
  keywords: ["novel", "reading", "mdx", "nextjs", "vercel", "indonesia"],
  authors: [{ name: "Syqrel" }],
  creator: "Syqrel",
  publisher: "Novel Vercel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://novel-vercel-mu.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Novel Vercel - Platform Baca Novel Online",
    description: "Platform baca dan tulis novel berbasis web yang cepat, ringan, dan skalabel.",
    url: 'https://novel-vercel-mu.vercel.app',
    siteName: 'Novel Vercel',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Novel Vercel - Platform Baca Novel Online",
    description: "Platform baca dan tulis novel berbasis web yang cepat, ringan, dan skalabel.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${lora.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
