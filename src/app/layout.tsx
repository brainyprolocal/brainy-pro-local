import type { Metadata } from 'next';
import { Outfit, Montserrat, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://brainyprolocal.com'),
  title: {
    template: '%s | brainy pro',
    default: 'brainy pro | The Operational Platform for Maryland Home Service Pros',
  },
  description: 'Build trust. Buy back time. Keep your clients for life. The all-in-one operational platform and networking hub for Maryland\'s top home service professionals.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brainyprolocal.com',
    siteName: 'brainy pro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'brainy pro — The Operational Platform for Maryland Home Service Pros',
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://brainyprolocal.com/#website",
      "url": "https://brainyprolocal.com/",
      "name": "brainy pro",
      "description": "The all-in-one operational platform for Maryland home service professionals.",
      "publisher": {
        "@id": "https://brainyprolocal.com/#organization"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://brainyprolocal.com/#organization",
      "name": "brainy pro",
      "url": "https://brainyprolocal.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://brainyprolocal.com/logo.png"
      },
      "slogan": "Build trust. Buy back time. Keep your clients for life."
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${montserrat.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
