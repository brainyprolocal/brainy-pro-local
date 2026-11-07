import Link from 'next/link';
import { agendaItems } from '@/data/agendaData';
import HubShell from './HubShell';
import LinkSection, { HubSection } from './LinkSection';

const county = (slug: string, label: string): HubSection => ({
  title: `Business & Brews: ${label}`,
  links: [
    { href: `/businessandbrews/${slug}`, label: `${label} RSVP`, note: 'event / RSVP page' },
    { href: `/businessandbrews/${slug}/agenda`, label: `${label} Agenda` },
    ...agendaItems.map((a) => ({
      href: `/businessandbrews/${slug}/agenda/${a.slug}`,
      label: a.slug,
      note: 'agenda slide',
    })),
    ...(slug === 'howard-county'
      ? [{ href: `/businessandbrews/${slug}/calendar-success`, label: 'Calendar success' }]
      : []),
  ],
});

const sections: HubSection[] = [
  {
    title: 'Business & Brews',
    links: [{ href: '/businessandbrews', label: 'Business & Brews home' }],
  },
  county('howard-county', 'Howard County'),
  county('montgomery-county', 'Montgomery County'),
  {
    title: 'Business & Brews: Summit',
    links: [
      { href: '/businessandbrews/summit', label: 'Summit' },
      { href: '/businessandbrews/summit/agenda', label: 'Summit Agenda' },
    ],
  },
  {
    title: 'Public site',
    links: [
      { href: '/', label: 'Home' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/blueprint', label: 'Blueprint' },
    ],
  },
];

export default function HubPage() {
  return (
    <HubShell>
      <h1 className="text-3xl font-bold mb-2">BrainyPro Hub</h1>
      <p className="text-clean-white/60 mb-8">Quick links to shareable pages.</p>

      <Link
        href="/hub/private"
        className="block mb-10 rounded-lg border border-white/20 bg-white/10 px-4 py-4 hover:bg-white/15 transition"
      >
        🔒 Private portal <span className="text-sm text-clean-white/50">(login required)</span>
      </Link>

      {sections.map((s) => (
        <LinkSection key={s.title} section={s} />
      ))}
    </HubShell>
  );
}
