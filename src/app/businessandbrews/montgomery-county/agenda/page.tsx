import { Metadata } from 'next';
import WaveDivider from '@/components/businessandbrews/WaveDivider';
import FallNetworkAgenda from '@/components/businessandbrews/FallNetworkAgenda';

export const metadata: Metadata = {
  title: 'Agenda — Montgomery County | Business & Brews',
};

export default function MontgomeryCountyAgendaPage() {
  return (
    <div>
      {/* Header section with gradient accent */}
      <div className="bg-gradient-to-b from-connection-blue/15 to-transparent pt-20 pb-4 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-white/40 uppercase tracking-widest mb-2">
            Montgomery County
          </p>
          <h1 className="text-3xl md:text-5xl font-montserrat font-bold mb-2">
            2026 Meeting Agenda
          </h1>
          <p className="text-white/60">Montgomery County, Maryland</p>
        </div>
      </div>

      <WaveDivider color="#1D4781" className="opacity-40" />

      <FallNetworkAgenda />
    </div>
  );
}
