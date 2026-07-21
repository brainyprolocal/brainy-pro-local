import { notFound } from 'next/navigation';
import Link from 'next/link';
import { guides, GuideSection } from '@/data/guidesData';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    return {
      title: 'Guide Not Found | brAIny pro',
    };
  }

  return {
    title: `${guide.title} | brAIny pro Local Guides`,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: 'article',
      authors: [guide.author],
      publishedTime: guide.publishDate,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    author: {
      '@type': 'Person',
      name: guide.author,
    },
    datePublished: guide.publishDate,
    publisher: {
      '@type': 'Organization',
      name: 'brAIny pro',
    },
  };

  const relatedGuides = guides.filter((g) => g.slug !== slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-clean-white py-16 px-6 sm:px-12">
        <article className="max-w-3xl mx-auto">
          {/* Article Header */}
          <header className="mb-12 text-center">
            <span className="inline-block bg-blue-50 text-action-accent text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
              {guide.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-trust-navy mb-6 leading-tight">
              {guide.title}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-4 text-gray-600 font-inter text-sm md:text-base">
              <span className="font-medium text-trust-navy">By {guide.author}</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>{guide.publishDate}</span>
              <span className="hidden sm:inline">&bull;</span>
              <span className="text-action-accent font-medium">{guide.readTime}</span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none font-inter text-gray-800 leading-relaxed mb-16 space-y-10">
            {guide.sections?.map((section: GuideSection, idx: number) => (
              <section key={idx} className="mb-10">
                <h2 className="text-2xl font-bold font-montserrat text-trust-navy mb-4 pl-4 border-l-4 border-action-accent py-1">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {Array.isArray(section.content) ? (
                    section.content.map((p, pIdx) => <p key={pIdx}>{p}</p>)
                  ) : (
                    <p>{section.content}</p>
                  )}
                </div>
                {section.subSections && (
                  <div className="mt-6 space-y-6">
                    {section.subSections.map((sub, sIdx) => (
                      <div key={sIdx}>
                        <h3 className="text-xl font-bold font-montserrat text-trust-navy mb-3">
                          {sub.heading}
                        </h3>
                        <p>{sub.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center mb-16 shadow-sm">
            <h3 className="text-2xl font-bold font-montserrat text-trust-navy mb-4">
              Need help with {guide.category.toLowerCase()}?
            </h3>
            <p className="text-gray-600 mb-6 font-inter">
              Find trusted {guide.category.toLowerCase()} pros in Central Maryland.
            </p>
            <Link
              href="/"
              className="inline-block bg-action-accent hover:bg-connection-blue text-white font-semibold py-3 px-8 rounded-lg transition-colors font-montserrat"
            >
              Find Local Pros
            </Link>
          </div>

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
              <h3 className="text-2xl font-bold font-montserrat text-trust-navy mb-8 text-center">
                More Guides You Might Like
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedGuides.map((g) => (
                  <Link key={g.slug} href={`/guides/${g.slug}`} className="group block h-full">
                    <div className="border border-gray-100 rounded-xl p-6 h-full hover:shadow-md transition-shadow bg-white border-t-4 border-t-action-accent">
                      <span className="text-xs font-semibold text-action-accent uppercase tracking-wider mb-2 block">
                        {g.category}
                      </span>
                      <h4 className="text-lg font-bold font-montserrat text-trust-navy mb-2 group-hover:text-action-accent transition-colors">
                        {g.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">{g.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  );
}
