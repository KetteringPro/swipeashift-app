import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Navigation from '@/components/Navigation'


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Swipe-A-Shift',
  description: 'Staffing the coast, one restaurant at a time.',
  openGraph: {
    title: 'SSwipe-A-Shift',
    description: 'Staffing the coast, one restaurant at a time.',
    url: 'https://SwipeAShift.app',
    type: 'website',
    images: [
      {
        url: 'https://SwipeAShift.app/images/og/SwipeAShift-preview.png',
        width: 1200,
        height: 630,
        alt: 'SwipeAShift Open Graph Preview',
      },
    ],
  },
  icons: {
    icon: '/favicon_32x32.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_32x32.png" />
      </head>
      <body className={`${inter.className} relative font-sans bg-gradient-to-b from-[#0d9488] to-white min-h-screen flex flex-col`}>
        {/* Top Navigation */}
    
        <Navigation />

        {/* Main Page Content */}
        <main className="flex-grow mt-16">
          <div className="min-h-screen bg-gradient-to-b from-[#0d9488] to-white">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 text-gray-600 text-sm py-6 mt-16">
          <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p>© 2025 SwipeAShift LLC | compliance@swipeashift.com</p>
            <div className="flex space-x-4">
              <Link href="/mission" className="hover:text-teal-700">Mission</Link>
              <Link href="/about" className="hover:text-teal-700">About</Link>
              <Link href="/legal" className="hover:text-teal-700">Legal</Link>
              <Link href="/tip-transparency" className="hover:text-teal-700">Tip Policy</Link>
              <Link href="/privacy" className="hover:text-teal-700">Privacy</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}