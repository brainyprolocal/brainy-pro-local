import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Howard County | Business & Brews',
};

export default function HowardCountyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-6">
        <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-action-accent/20 text-action-accent border border-action-accent/30 mb-6">
          In-Person Event
        </span>
        <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-4">
          Howard County
        </h1>
        <p className="text-xl text-white/60 mb-8 tracking-wide">
          Business & Brews
        </p>
        <p className="text-lg text-white/80 mb-2">Howard County, Maryland</p>
        <p className="text-lg text-white/80 mb-2">Date TBA</p>
        <p className="text-lg text-white/80 mb-2">Venue TBA</p>
        
        <div className="w-24 h-0.5 bg-action-accent/50 mx-auto my-8"></div>
        
        <p className="text-white/70 text-lg leading-relaxed max-w-lg mx-auto mb-12">
          Join us for an evening of networking with Maryland home service professionals. Connect, share ideas, and grow your business in a relaxed atmosphere.
        </p>
        
        <Link 
          href="/businessandbrews/howard-county/agenda"
          className="inline-flex items-center gap-2 px-8 py-4 bg-action-accent hover:bg-action-accent/80 text-white font-semibold rounded-xl transition-all duration-300 text-lg"
        >
          View 2026 Agenda &rarr;
        </Link>
      </div>
    </div>
  );
}
