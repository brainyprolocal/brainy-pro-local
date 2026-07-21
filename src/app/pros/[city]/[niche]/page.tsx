import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ city: string; niche: string }>;
};

export const dynamicParams = true;

const capitalize = (s: string) => {
  return s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export async function generateStaticParams() {
  return [
    { city: 'laurel', niche: 'plumber' },
    { city: 'columbia', niche: 'electrician' },
    { city: 'ellicott-city', niche: 'hvac' },
    { city: 'laurel', niche: 'landscaper' },
    { city: 'columbia', niche: 'roofer' },
    { city: 'ellicott-city', niche: 'painter' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, niche } = await params;
  const cityName = capitalize(city);
  const nicheName = capitalize(niche);

  return {
    title: `Top ${nicheName} in ${cityName}, MD | brAIny pro`,
    description: `Find the best ${niche} services in ${cityName}, Maryland. Verified reviews, background checks, and free quotes from brAIny pro.`,
  };
}

export default async function ProDirectoryPage({ params }: Props) {
  const { city, niche } = await params;
  const cityName = capitalize(city);
  const nicheName = capitalize(niche);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Top ${nicheName} in ${cityName}`,
    description: `Directory of top ${niche} professionals serving ${cityName}, MD.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressRegion: 'MD',
      addressCountry: 'US',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gray-50 py-16 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-trust-navy mb-6">
              Top {nicheName} Professionals in {cityName}, MD
            </h1>
            <p className="text-xl text-gray-600 font-inter max-w-2xl mx-auto">
              We are building the most comprehensive directory of trusted {niche} professionals in {cityName}. Check back soon!
            </p>
          </header>

          {/* SearchBar Component Placeholder */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-2xl font-bold font-montserrat text-trust-navy mb-4">
              Can't wait? Find pros in other areas
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link
                href="/"
                className="bg-action-accent hover:bg-connection-blue text-white font-semibold py-3 px-8 rounded-lg transition-colors font-montserrat"
              >
                Back to Homepage
              </Link>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
               FUTURE DATABASE INTEGRATION
               This template will be connected to a database of vetted pros.
               Query: SELECT * FROM pros WHERE city = '${city}' AND niche = '${niche}'
               Each pro will be rendered as a ProCard component.
               ═══════════════════════════════════════════════════════════════ */}
          <div className="space-y-6">
            {/* Pro cards will go here */}
          </div>
        </div>
      </main>
    </>
  );
}
