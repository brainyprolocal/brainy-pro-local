import { MetadataRoute } from 'next';
import { guides } from '@/data/guidesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://brainyprolocal.com';

  const guideEntries = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const sampleCities = ['laurel', 'columbia', 'ellicott-city'];
  const sampleNiches = ['plumber', 'electrician', 'hvac', 'landscaper', 'roofer', 'painter'];

  const proEntries = sampleCities.flatMap((city) =>
    sampleNiches.map((niche) => ({
      url: `${baseUrl}/pros/${city}/${niche}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/for-pros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...guideEntries,
    ...proEntries,
  ];
}
