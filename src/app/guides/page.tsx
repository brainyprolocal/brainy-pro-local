import Link from 'next/link';
import { guides } from '@/data/guidesData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Local Guides | Home Maintenance Tips for Central Maryland',
  description: 'Expert advice on maintaining your home in Howard County, Laurel, Columbia, and beyond.',
};

export default function GuidesIndex() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'brAIny pro Guides',
    url: 'https://brainyprolocal.com/guides',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-clean-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-trust-navy to-connection-blue text-white py-20 px-6 sm:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">
            Central Maryland Home Guides
          </h1>
          <p className="text-xl max-w-2xl mx-auto font-inter text-gray-200">
            Expert advice on maintaining your home in Howard County, Laurel, Columbia, and beyond.
          </p>
        </section>

        {/* Guides Grid */}
        <section className="max-w-7xl mx-auto py-16 px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group block h-full">
                <article className="h-full border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col border-t-4 border-t-action-accent">
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="mb-4">
                      <span className="inline-block bg-blue-50 text-action-accent text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                        {guide.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold font-montserrat text-trust-navy mb-3 group-hover:text-action-accent transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-gray-600 font-inter mb-6 flex-grow line-clamp-3">
                      {guide.excerpt}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 font-inter">
                      <div>
                        <span className="block font-medium text-trust-navy">{guide.author}</span>
                        <span className="mx-2">&bull;</span>
                        <span>{guide.publishDate}</span>
                      </div>
                      <div className="flex items-center text-action-accent font-medium">
                        <span>{guide.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
