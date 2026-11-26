import { Metadata } from 'next';
import Link from 'next/link';
import BlueprintInteractive from './BlueprintInteractive';

export const metadata: Metadata = {
  title: 'Your Digital Blueprint',
  description:
    'The step-by-step roadmap to building a complete digital presence for your business. See exactly what you need at every stage — from domain registration to full automation.',
  robots: { index: false, follow: false },
};

export default function BlueprintPage() {
  return (
    <div className="min-h-screen bg-clean-white text-trust-navy">
      {/* ═══════════════════════════════════════════
       *  HERO (Server-rendered)
       * ═══════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-trust-navy via-connection-blue to-action-accent overflow-hidden px-4 py-32 sm:py-40 text-center text-clean-white">
        <div className="absolute inset-0 blueprint-grid pointer-events-none" />

        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-action-accent/20 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-connection-blue/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-inter">
            <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Your Roadmap to Digital Success
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-outfit font-bold mb-6 drop-shadow-lg leading-[1.1] tracking-tight">
            Your Digital<br />
            <span className="text-white/80">Blueprint.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-inter font-light leading-relaxed">
            The step-by-step roadmap to building a complete digital presence for
            your business. Each phase builds on the last — and we handle every
            piece.
          </p>

          <div className="mt-12 flex flex-col items-center gap-2 text-white/50 text-sm font-inter">
            <span>See the full roadmap</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
       *  INTERACTIVE STARTING-POINT & ROADMAP
       * ═══════════════════════════════════════════ */}
      <BlueprintInteractive />

      {/* ═══════════════════════════════════════════
       *  CTA BANNER (Server-rendered)
       * ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-connection-blue to-action-accent py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid pointer-events-none" />
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-trust-navy/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <img
            src="/brand/logo-text-white.svg"
            alt="brainy pro"
            className="h-10 sm:h-12 mx-auto mb-4"
          />
          <h2 className="text-3xl md:text-5xl font-outfit font-bold text-clean-white mb-6">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-inter">
            Every business is different. Let&apos;s figure out exactly where you
            are and build the roadmap that makes sense for yours.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-connection-blue bg-clean-white rounded-full shadow-xl hover:bg-slate-100 hover:scale-105 transition-all duration-300 gap-3 font-montserrat"
          >
            <img src="/brand/logo-icon-blue.svg" alt="" className="w-6 h-6" />
            Let&apos;s Talk
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
