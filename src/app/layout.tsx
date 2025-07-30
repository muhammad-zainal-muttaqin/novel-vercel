import type { Metadata } from "next";
import { Inter, Playfair_Display, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import '../utils/errorHandler';
import { ThemeProvider } from '../utils/themeProvider';
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.app" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var resolvedTheme = theme === 'system' ? systemTheme : (theme || 'light');
                  document.documentElement.classList.add(resolvedTheme);
                } catch (e) {
                  // Fallback to light theme if localStorage is not available
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${playfairDisplay.variable} ${lora.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
