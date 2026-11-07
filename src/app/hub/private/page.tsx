import Link from 'next/link';
import HubShell from '../HubShell';
import LinkSection, { HubSection } from '../LinkSection';

export const dynamic = 'force-dynamic';

// Add new private tools here; they should live under /hub/private/* so the proxy protects them.
const sections: HubSection[] = [
  {
    title: 'Tools',
    links: [{ href: '/hub/private/rank-map', label: 'Rank Map', note: 'local rank tracking' }],
  },
];

export default function PrivatePortalPage() {
  return (
    <HubShell>
      <Link href="/hub" className="text-sm text-clean-white/50 hover:text-clean-white">
        ← Hub
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-2">Private Portal</h1>
      <p className="text-clean-white/60 mb-8">Internal tools. Login required.</p>
      {sections.map((s) => (
        <LinkSection key={s.title} section={s} />
      ))}
    </HubShell>
  );
}
