import { Metadata } from 'next';
import WaveDivider from '@/components/businessandbrews/WaveDivider';
import FallNetworkAgenda from '@/components/businessandbrews/FallNetworkAgenda';

export const metadata: Metadata = {
  title: 'Agenda — Howard County | Business & Brews',
};

export default function HowardCountyAgendaPage() {
  return (
    <div>
      {/* Header section with gradient accent */}
      <div className="bg-gradient-to-b from-connection-blue/15 to-transparent pt-20 pb-4 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-white/40 uppercase tracking-widest mb-2">
            Howard County
          </p>
          <h1 className="text-3xl md:text-5xl font-montserrat font-bold mb-2">
            2026 Meeting Agenda
          </h1>
          <p className="text-white/60">Howard County, Maryland</p>
        </div>
      </div>

      <WaveDivider color="#1D4781" className="opacity-40" />

      {/* Schedule */}
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-24">
        <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 mb-4">
          <div className="text-action-accent font-mono text-sm whitespace-nowrap font-semibold min-w-[80px]">
            5:30 PM
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Registration &amp; Welcome</h2>
            <p className="text-white/60 text-sm">Check in, grab your name badge, and settle in.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 mb-4">
          <div className="text-action-accent font-mono text-sm whitespace-nowrap font-semibold min-w-[80px]">
            6:00 PM
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Networking &amp; Brews</h2>
            <p className="text-white/60 text-sm">Connect with fellow home service professionals over craft beers.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 mb-4">
          <div className="text-action-accent font-mono text-sm whitespace-nowrap font-semibold min-w-[80px]">
            6:45 PM
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Keynote Presentation</h2>
            <p className="text-white/60 text-sm">Industry insights and strategies for growth. Speaker TBA.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 mb-4">
          <div className="text-action-accent font-mono text-sm whitespace-nowrap font-semibold min-w-[80px]">
            7:15 PM
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Panel Discussion</h2>
            <p className="text-white/60 text-sm">Q&amp;A with successful Maryland home service business owners.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 mb-4">
          <div className="text-action-accent font-mono text-sm whitespace-nowrap font-semibold min-w-[80px]">
            7:45 PM
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Open Networking</h2>
            <p className="text-white/60 text-sm">Continue building relationships and exchanging ideas.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10 mb-4">
          <div className="text-action-accent font-mono text-sm whitespace-nowrap font-semibold min-w-[80px]">
            8:30 PM
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Closing Remarks</h2>
            <p className="text-white/60 text-sm">Wrap-up and next steps.</p>
          </div>
        </div>
      </div>

      {/* Fall Network Meeting Agenda */}
      <div className="max-w-3xl mx-auto px-6 pb-2">
        <div className="w-full h-px bg-white/10 my-4" />
      </div>
      <FallNetworkAgenda />
    </div>
  );
}
