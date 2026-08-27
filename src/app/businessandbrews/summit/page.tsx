import Link from 'next/link';
import { Metadata } from 'next';
import RSVPForm from '@/components/businessandbrews/RSVPForm';

export const metadata: Metadata = {
  title: 'Summit | Business & Brews',
};

export default function SummitPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero / Event Info */}
      <div className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-action-accent/20 text-action-accent border border-action-accent/30 mb-6">
            Online Event
          </span>
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-4">
            Business &amp; Brews Summit
          </h1>
          <p className="text-xl text-white/60 mb-8 tracking-wide">
            Business &amp; Brews
          </p>
          <p className="text-lg text-white/80 mb-2">Virtual Event</p>
          <p className="text-lg text-white/80 mb-2">Date TBA</p>
          
          <div className="w-24 h-0.5 bg-action-accent/50 mx-auto my-8"></div>
          
          <p className="text-white/70 text-lg leading-relaxed max-w-lg mx-auto mb-12">
            Join us for an evening of networking with Maryland home service professionals. Connect, share ideas, and grow your business in a relaxed atmosphere.
          </p>
          
          <Link 
            href="/businessandbrews/summit/agenda"
            className="inline-flex items-center gap-2 px-8 py-4 bg-action-accent hover:bg-action-accent/80 text-white font-semibold rounded-xl transition-all duration-300 text-lg"
          >
            View 2026 Agenda &rarr;
          </Link>
        </div>
      </div>

      {/* RSVP Section with Background Flair */}
      <div className="relative py-24 px-6 overflow-hidden mt-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-action-accent/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-connection-blue/10 to-transparent" />
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-action-accent/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-connection-blue/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="relative z-10">
          <RSVPForm eventName="Business & Brews Summit — Online" />
        </div>
      </div>
    </div>
  );
}
