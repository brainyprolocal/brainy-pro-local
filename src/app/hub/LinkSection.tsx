import Link from 'next/link';

export interface HubLink {
  href: string;
  label: string;
  note?: string;
}

export interface HubSection {
  title: string;
  links: HubLink[];
}

export default function LinkSection({ section }: { section: HubSection }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold mb-3 text-clean-white/90">{section.title}</h2>
      <ul className="grid gap-2">
        {section.links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
            >
              <span>
                {l.label}
                {l.note && <span className="ml-2 text-sm text-clean-white/50">{l.note}</span>}
              </span>
              <span className="text-sm text-clean-white/40">{l.href}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
