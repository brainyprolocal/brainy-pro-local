import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { agendaItems } from '@/data/agendaData';
import AgendaSlide from '@/components/businessandbrews/AgendaSlide';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return agendaItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = agendaItems.find((a) => a.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} — Howard County Agenda | Business & Brews`,
  };
}

export default async function HowardCountyAgendaItemPage({ params }: PageProps) {
  const { slug } = await params;
  const item = agendaItems.find((a) => a.slug === slug);
  if (!item) notFound();

  return (
    <AgendaSlide
      item={item}
      variant="emerald"
      countySlug="howard-county"
      countyLabel="Howard County"
    />
  );
}
