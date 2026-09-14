import Link from 'next/link';
import { agendaItems, type AgendaItem } from '@/data/agendaData';
import EventBackground from '@/components/businessandbrews/EventBackground';

interface AgendaSlideProps {
  item: AgendaItem;
  variant: 'blue' | 'emerald';
  countySlug: string;
  countyLabel: string;
}

export default function AgendaSlide({
  item,
  variant,
  countySlug,
  countyLabel,
}: AgendaSlideProps) {
  const currentIndex = agendaItems.findIndex((a) => a.slug === item.slug);
  const prevItem = currentIndex > 0 ? agendaItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < agendaItems.length - 1 ? agendaItems[currentIndex + 1] : null;

  const basePath = `/businessandbrews/${countySlug}/agenda`;

  /* Accent colours per variant for the decorative elements */
  const accent =
    variant === 'emerald'
      ? { line: '#10B981', glow: 'rgba(16, 185, 129, 0.25)', number: 'rgba(5, 150, 105, 0.07)' }
      : { line: '#3B82F6', glow: 'rgba(59, 130, 246, 0.25)', number: 'rgba(37, 99, 235, 0.07)' };

  return (
    <div className="relative min-h-screen flex flex-col">
      <EventBackground variant={variant} />

      {/* ── Top bar ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-10 pt-8">
        <Link
          href={basePath}
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Agenda
        </Link>

        <span className="text-sm text-white/30 font-mono">
          {item.number} / {agendaItems.length}
        </span>
      </nav>

      {/* ── Centered slide content ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-10 py-12">
        {/* Giant watermark number */}
        <span
          className="absolute select-none pointer-events-none font-montserrat font-black leading-none"
          style={{
            fontSize: 'clamp(12rem, 30vw, 28rem)',
            color: accent.number,
          }}
          aria-hidden="true"
        >
          {item.number}
        </span>

        <div className="relative max-w-4xl w-full text-center space-y-8">
          {/* County label */}
          <p className="text-sm uppercase tracking-[0.25em] text-white/40 font-medium">
            {countyLabel}
          </p>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-montserrat font-bold leading-[1.05] tracking-tight">
            {item.title}
          </h1>

          {/* Accent divider */}
          <div className="flex justify-center">
            <div
              className="h-1 w-24 md:w-32 rounded-full"
              style={{
                background: `linear-gradient(to right, transparent, ${accent.line}, transparent)`,
                boxShadow: `0 0 20px ${accent.glow}`,
              }}
            />
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/65 leading-relaxed max-w-2xl mx-auto font-inter">
            {item.description}
          </p>
        </div>
      </main>

      {/* ── Bottom navigation ── */}
      <footer className="relative z-10 flex items-center justify-between px-6 md:px-10 pb-10">
        {prevItem ? (
          <Link
            href={`${basePath}/${prevItem.slug}`}
            className="group inline-flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">
              <span className="block text-[10px] uppercase tracking-widest text-white/30 mb-0.5">
                Previous
              </span>
              {prevItem.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextItem ? (
          <Link
            href={`${basePath}/${nextItem.slug}`}
            className="group inline-flex items-center gap-3 text-white/40 hover:text-white transition-colors duration-200 text-right"
          >
            <span className="text-sm">
              <span className="block text-[10px] uppercase tracking-widest text-white/30 mb-0.5">
                Next
              </span>
              {nextItem.title}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </footer>
    </div>
  );
}
