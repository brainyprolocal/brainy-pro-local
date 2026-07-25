import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import PricingGrid from '@/components/PricingGrid';
import FAQAccordion from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'brAIny pro | The Operational Platform for Maryland Home Service Pros',
  description: 'Build trust. Buy back time. Keep your clients for life. The all-in-one operational platform and networking hub for Maryland\'s top home service professionals.',
};

const faqItems = [
  {
    question: 'What exactly does brAIny pro do?',
    answer: 'We build and install a custom digital backend for your home service business. This includes customer database reactivation, a centralized CRM to manage leads and jobs, and an automated system to capture reviews after you complete a job. Think of us as your operational partner for the digital side of your business.',
  },
  {
    question: 'How is this different from a marketing agency?',
    answer: 'Marketing agencies focus on getting you new leads, often with mixed results. We focus on building operational systems that maximize the value of your existing business. We reactivate past clients who already trust you, streamline your lead management so nothing falls through the cracks, and automate your review capture to build organic trust in your local area.',
  },
  {
    question: 'What does it cost?',
    answer: 'We offer three tiers to fit every stage of your business. Our Network tier is completely free, The Growth Engine is $97/month with a one-time $100 setup fee, and our Ultimate tier is custom-priced based on your needs. During our initial consultation, we\'ll outline the best fit for your goals.',
  },
  {
    question: 'How quickly can I get set up?',
    answer: 'Once we have our initial consultation and agree on a plan, we can typically have your core digital backend systems installed and operational within 1 to 2 weeks. We handle the heavy lifting so you can stay focused on your trades.',
  },
  {
    question: 'Do I need to be tech-savvy?',
    answer: 'Not at all. We built brAIny pro specifically for contractors who want the benefits of modern technology without the headache of managing it. We set everything up, train you on the simple dashboard, and provide ongoing support so you never feel lost.',
  },
  {
    question: 'What area do you serve?',
    answer: 'We currently serve home service professionals throughout Central Maryland, including Laurel, Columbia, Ellicott City, Clarksville, Highland, Fulton, Savage, Jessup, Elkridge, and the broader Howard County area.',
  },
];

export default function HomePage() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        'name': 'brAIny pro',
        'url': 'https://brainyprolocal.com',
        'description': 'The all-in-one operational platform for Maryland home service professionals.',
      },
      {
        '@type': 'Organization',
        'name': 'brAIny pro',
        'url': 'https://brainyprolocal.com',
        'description': 'Build trust. Buy back time. Keep your clients for life.',
        'areaServed': {
          '@type': 'State',
          'name': 'Maryland',
        },
        'serviceType': 'B2B SaaS Platform for Home Service Contractors',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-clean-white text-trust-navy">
      <JsonLd data={jsonLdData} />

      {/* ═══════════════════════════════════════════
       *  1. HERO SECTION — B2B SaaS Focus
       * ═══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-trust-navy via-connection-blue to-action-accent overflow-hidden px-4 py-24 text-center text-clean-white">
        {/* Decorative orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-action-accent/20 rounded-full blur-3xl pointer-events-none animate-float"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-inter">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Now serving Central Maryland contractors
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-outfit font-bold mb-6 drop-shadow-lg leading-[1.1] tracking-tight">
            Build Trust. Buy Back Time.{' '}
            <span className="block mt-2">Keep Your Clients for Life.</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 max-w-2xl font-inter font-light leading-relaxed">
            The all-in-one operational platform and networking hub for Maryland&apos;s top home service professionals.
          </p>

          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-trust-navy bg-clean-white rounded-full shadow-xl hover:bg-slate-100 hover:scale-105 transition-all duration-300 gap-3 font-montserrat group"
          >
            View Platform Pricing
            <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
       *  2. SOCIAL PROOF BAR
       * ═══════════════════════════════════════════ */}
      <section className="bg-trust-navy text-clean-white py-12 px-4 border-b border-white/5">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          <div>
            <div className="text-3xl font-bold font-outfit text-action-accent mb-1">20+</div>
            <div className="text-xs font-inter text-gray-400 uppercase tracking-wider">Years in the Trades</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-outfit text-action-accent mb-1">500+</div>
            <div className="text-xs font-inter text-gray-400 uppercase tracking-wider">Pros in Network</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-outfit text-action-accent mb-1">MD</div>
            <div className="text-xs font-inter text-gray-400 uppercase tracking-wider">Central Maryland</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-outfit text-action-accent mb-1">100%</div>
            <div className="text-xs font-inter text-gray-400 uppercase tracking-wider">Contractor-Focused</div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
       *  3. PROBLEM / SOLUTION SECTION
       * ═══════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-trust-navy mb-4">
              We&apos;re Not a Marketing Agency.
            </h2>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              We install the digital systems that make your business run — so you can get back to doing what you do best.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-action-accent/30 transition-all duration-300 group hover:shadow-lg">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-action-accent mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="font-outfit text-xl font-bold text-trust-navy mb-3">Database Reactivation</h3>
              <p className="font-inter text-gray-600 leading-relaxed">
                Reconnect with past clients who already trust you. Most contractors are sitting on a goldmine of repeat business.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-action-accent/30 transition-all duration-300 group hover:shadow-lg">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-action-accent mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              </div>
              <h3 className="font-outfit text-xl font-bold text-trust-navy mb-3">Automated Review Capture</h3>
              <p className="font-inter text-gray-600 leading-relaxed">
                After every job, your happy clients are automatically asked for a review. Build trust while you sleep.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-action-accent/30 transition-all duration-300 group hover:shadow-lg">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-action-accent mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h3 className="font-outfit text-xl font-bold text-trust-navy mb-3">Streamlined Operations</h3>
              <p className="font-inter text-gray-600 leading-relaxed">
                One place for every lead, every job, every follow-up. Stop losing track of opportunities and start closing more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
       *  4. PRICING GRID
       * ═══════════════════════════════════════════ */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-trust-navy mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              Choose the tier that fits your business. Upgrade or downgrade anytime.
            </p>
          </div>

          <PricingGrid />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
       *  5. TESTIMONIALS
       * ═══════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-trust-navy text-white">
        <div className="max-w-5xl mx-auto text-center">
          <svg className="w-12 h-12 text-action-accent mx-auto mb-6 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
          <blockquote className="font-outfit text-2xl sm:text-3xl font-medium leading-tight mb-8">
            &ldquo;Built by a contractor who spent 20+ years in the field and knows what it takes to run a business — not just market one.&rdquo;
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-left">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="font-inter text-gray-300 mb-4 text-sm">&quot;The automated review system alone has doubled our organic leads. It&apos;s like having an admin working 24/7.&quot;</p>
              <div className="font-outfit font-semibold text-white">Mike R.</div>
              <div className="font-inter text-action-accent text-xs">HVAC Contractor</div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-left">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="font-inter text-gray-300 mb-4 text-sm">&quot;Finally, a CRM that doesn&apos;t feel like rocket science. Managing our leads has never been easier.&quot;</p>
              <div className="font-outfit font-semibold text-white">Sarah T.</div>
              <div className="font-inter text-action-accent text-xs">Plumbing Services</div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-left">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="font-inter text-gray-300 mb-4 text-sm">&quot;Reactivating our old customers brought in a wave of jobs during our slow season. Invaluable.&quot;</p>
              <div className="font-outfit font-semibold text-white">David L.</div>
              <div className="font-inter text-action-accent text-xs">Roofing Specialists</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
       *  6. FAQ SECTION
       * ═══════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-trust-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 font-inter">
              Everything you need to know about partnering with brAIny pro.
            </p>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
       *  7. FINAL CTA BANNER
       * ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-connection-blue to-action-accent py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-trust-navy/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold text-clean-white mb-6">
            Ready to Stop Chasing Leads?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-inter">
            Join Central Maryland&apos;s most trusted contractor network and start building systems that work for you.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-connection-blue bg-clean-white rounded-full shadow-xl hover:bg-slate-100 hover:scale-105 transition-all duration-300 gap-3 font-montserrat"
          >
            View Platform Pricing
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
