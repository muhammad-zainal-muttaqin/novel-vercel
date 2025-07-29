import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Novel Vercel - Platform Baca Novel Online",
  description: "Platform baca dan tulis novel berbasis web yang cepat, ringan, dan skalabel menggunakan Next.js, MDX, dan Vercel.",
  keywords: ["novel", "reading", "mdx", "nextjs", "vercel", "indonesia"],
  authors: [{ name: "Novel Vercel Team" }],
  creator: "Novel Vercel",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
