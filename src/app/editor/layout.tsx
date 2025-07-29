import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Novel Editor - Novel Vercel",
  description: "Editor MDX untuk menulis novel dengan komponen custom. Fitur lengkap untuk penulis novel.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 