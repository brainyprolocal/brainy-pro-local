import Link from 'next/link';
import { agendaItems } from '@/data/agendaData';

interface FallNetworkAgendaProps {
  countySlug: 'howard-county' | 'montgomery-county';
}

export default function FallNetworkAgenda({ countySlug }: FallNetworkAgendaProps) {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-2 pb-16">
      {/* Section heading */}
      <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-6">
        Fall Network Meeting Agenda
      </h2>

      <div className="space-y-4">
        {agendaItems.map((item) => (
          <Link
            key={item.number}
            href={`/businessandbrews/${countySlug}/agenda/${item.slug}`}
            className="group flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
          >
            <div className="text-action-accent font-mono text-sm whitespace-nowrap font-semibold min-w-[80px]">
              {item.number}.
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1 group-hover:text-action-accent transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-white/60 text-sm">{item.description}</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white/20 group-hover:text-white/60 transition-all duration-200 mt-1 shrink-0 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
