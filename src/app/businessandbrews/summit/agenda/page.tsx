import { Metadata } from 'next';
import WaveDivider from '@/components/businessandbrews/WaveDivider';

export const metadata: Metadata = {
  title: 'Agenda — Summit | Business & Brews',
};

export default function SummitAgendaPage() {
  return (
    <div>
      {/* Header section with gradient accent */}
      <div className="bg-gradient-to-b from-connection-blue/15 to-transparent pt-20 pb-4 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-white/40 uppercase tracking-widest mb-2">
            Business &amp; Brews Summit
          </p>
          <h1 className="text-3xl md:text-5xl font-montserrat font-bold mb-2">
            2026 Meeting Agenda
          </h1>
          <p className="text-white/60">Virtual Event</p>
        </div>
      </div>

      <WaveDivider color="#1D4781" className="opacity-40" />

      {/* Schedule */}
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-24">
        <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 mb-4">
          <div className="text-action-accent font-mono text-sm whitespace-nowrap font-semibold min-w-[80px]">
            12:00 PM
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Virtual Lobby Opens</h2>
            <p className="text-white/60 text-sm">Join the virtual event space and test your connection.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 mb-4">
          <div className="text-action-accent font-mono text-sm whitespace-nowrap font-semibold min-w-[80px]">
            12:15 PM
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Welcome &amp; Introductions</h2>
            <p className="text-white/60 text-sm">Meet your fellow attendees in breakout rooms.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 mb-4">
          <div className="text-action-accent font-mono text-sm whitespace-nowrap font-semibold min-w-[80px]">
            12:45 PM
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Keynote Presentation</h2>
            <p className="text-white/60 text-sm">Industry insights and strategies for growth. Speaker TBA.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 mb-4">
          <div className="text-action-accent font-mono text-sm whitespace-nowrap font-semibold min-w-[80px]">
            1:30 PM
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Breakout Sessions</h2>
            <p className="text-white/60 text-sm">Choose from focused discussion topics relevant to your business.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 mb-4">
          <div className="text-action-accent font-mono text-sm whitespace-nowrap font-semibold min-w-[80px]">
            2:15 PM
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Panel Discussion</h2>
            <p className="text-white/60 text-sm">Q&amp;A with successful home service business owners.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 mb-4">
          <div className="text-action-accent font-mono text-sm whitespace-nowrap font-semibold min-w-[80px]">
            3:00 PM
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Virtual Happy Hour</h2>
            <p className="text-white/60 text-sm">Casual networking in themed breakout rooms.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
