import type { Metadata } from 'next';
import { Outfit, Montserrat, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    template: '%s | brAIny pro',
    default: 'brAIny pro | Find Trusted Home Service Pros in Central Maryland',
  },
  description: 'brAIny pro connects Central Maryland homeowners with vetted, trusted local home service professionals. Plumbers, electricians, HVAC, and more in Laurel, Columbia, Ellicott City, and Howard County.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brainyprolocal.com',
    siteName: 'brAIny pro',
    images: [
      {
        url: '/og-image.jpg', // Placeholder for OG image
        width: 1200,
        height: 630,
        alt: 'brAIny pro',
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
      "name": "brAIny pro",
      "description": "Find Trusted Home Service Pros in Central Maryland",
      "publisher": {
        "@id": "https://brainyprolocal.com/#organization"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://brainyprolocal.com/#organization",
      "name": "brAIny pro",
      "url": "https://brainyprolocal.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://brainyprolocal.com/logo.png"
      }
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
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
