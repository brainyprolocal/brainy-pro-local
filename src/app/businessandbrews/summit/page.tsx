import Link from 'next/link';
import { Metadata } from 'next';
import RSVPForm from '@/components/businessandbrews/RSVPForm';
import EventBackground from '@/components/businessandbrews/EventBackground';

export const metadata: Metadata = {
  title: 'Summit | Business & Brews',
  openGraph: {
    images: [
      {
        url: '/businessandbrews/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'brainy pro — Business & Brews Summit',
      },
    ],
  },
};

export default function SummitPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <EventBackground variant="amber" />

      <div className="relative z-10 flex-1 flex flex-col items-center px-6 pt-12 md:pt-16 pb-12">
        {/* Centered top title */}
        <h2 className="text-3xl md:text-5xl font-montserrat font-bold tracking-widest uppercase text-white/80 mb-10 md:mb-14 text-center whitespace-nowrap">
          Business &amp; Brews
        </h2>

        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Event Info — left column */}
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-action-accent/20 text-action-accent border border-action-accent/30 mb-4">
              Online Event
            </span>
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
              Online Summit
            </h1>
            <p className="text-lg text-white/80 mb-1">Virtual Event</p>
            <p className="text-lg text-white/80 mb-4">Date TBA</p>
            
            <div className="w-24 h-0.5 bg-action-accent/50 mx-auto md:mx-0 my-6"></div>
            
            <p className="text-white/70 text-lg leading-relaxed max-w-lg mx-auto md:mx-0 mb-8">
              Join us for an evening of networking with Maryland home service professionals. Connect, share ideas, and grow your business in a relaxed atmosphere.
            </p>
            
            <Link 
              href="/businessandbrews/summit/agenda"
              className="inline-flex items-center gap-2 px-8 py-4 bg-action-accent hover:bg-action-accent/80 text-white font-semibold rounded-xl transition-all duration-300 text-lg"
            >
              View 2026 Agenda &rarr;
            </Link>
          </div>

          {/* RSVP — right column */}
          <div className="md:pt-4">
            <RSVPForm eventName="Business & Brews Summit — Online" />
          </div>
        </div>
      </div>
    </div>
  );
}
