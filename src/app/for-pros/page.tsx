import { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';
import ProSignupForm from '@/components/ProSignupForm';

export const metadata: Metadata = {
  title: 'For Pros | Digital Backend Systems for Home Service Contractors',
  description: 'brAIny pro installs digital backend systems for home service contractors to reactivate past clients, manage leads, and capture automated reviews.',
};

export default function ForProsPage() {
  const faqItems = [
    {
      question: 'What exactly does brAIny pro do?',
      answer: 'We build and install a custom digital backend for your home service business. This includes customer database reactivation, a centralized CRM to manage leads and jobs, and an automated system to capture reviews after you complete a job. Think of us as your operational partner for the digital side of your business.'
    },
    {
      question: 'How is this different from a marketing agency?',
      answer: 'Marketing agencies focus on getting you new leads, often with mixed results. We focus on building operational systems that maximize the value of your existing business. We reactivate past clients who already trust you, streamline your lead management so nothing falls through the cracks, and automate your review capture to build organic trust in your local area.'
    },
    {
      question: 'What does it cost?',
      answer: 'Every contractor\'s needs are different, but we offer competitive, straightforward pricing without hidden fees. During our initial consultation, we\'ll discuss your specific goals and outline a custom package that fits your business model and budget.'
    },
    {
      question: 'How quickly can I get set up?',
      answer: 'Once we have our initial consultation and agree on a plan, we can typically have your core digital backend systems installed and operational within 1 to 2 weeks. We handle the heavy lifting so you can stay focused on your trades.'
    },
    {
      question: 'Do I need to be tech-savvy?',
      answer: 'Not at all. We built brAIny pro specifically for contractors who want the benefits of modern technology without the headache of managing it. We set everything up, train you on the simple dashboard, and provide ongoing support so you never feel lost.'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col bg-clean-white">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-trust-navy to-connection-blue pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-md">
            Stop Chasing Leads. Start Building Systems.
          </h1>
          <p className="font-inter text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            brAIny pro installs the digital backend that makes your business run — so you can get back to doing what you do best.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="#join-network" className="w-full sm:w-auto px-8 py-4 bg-action-accent hover:bg-blue-500 text-white font-montserrat font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Join the Network
            </Link>
            <Link href="#how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-montserrat font-semibold rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300">
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Problem/Solution Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* The Problem */}
            <div className="space-y-8">
              <div>
                <h2 className="font-montserrat text-3xl font-bold text-trust-navy mb-2">The Problem</h2>
                <div className="w-16 h-1 bg-red-500 rounded"></div>
              </div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg text-trust-navy">No follow-up system</h3>
                    <p className="text-gray-600 font-inter mt-1">Losing touch with past clients who already trust you and are ready to hire you again.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg text-trust-navy">Losing reviews</h3>
                    <p className="text-gray-600 font-inter mt-1">Competitors with inferior work are ranking higher simply because they ask for reviews.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg text-trust-navy">Admin overload</h3>
                    <p className="text-gray-600 font-inter mt-1">Spending your evenings managing paperwork and disorganized leads instead of resting or growing.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="space-y-8 bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-connection-blue/5 rounded-bl-full"></div>
              <div>
                <h2 className="font-montserrat text-3xl font-bold text-trust-navy mb-2">The Solution</h2>
                <div className="w-16 h-1 bg-action-accent rounded"></div>
              </div>
              <ul className="space-y-6 relative z-10">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-action-accent mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg text-trust-navy">Operational Partner</h3>
                    <p className="text-gray-600 font-inter mt-1">We are NOT a marketing agency. We install systems that make you look like the most trusted option.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-action-accent mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg text-trust-navy">Built by Trade Experts</h3>
                    <p className="text-gray-600 font-inter mt-1">Designed by someone with 20+ years in the trades who actually understands your daily grind.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-action-accent mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg text-trust-navy">Streamlined Tech</h3>
                    <p className="text-gray-600 font-inter mt-1">Everything works automatically in the background, buying back your time effortlessly.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tier 1 Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-3xl sm:text-4xl font-bold text-trust-navy mb-4">Your Digital Backend, Installed</h2>
            <p className="font-inter text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              These aren&apos;t marketing tricks. These are operational systems that buy back your time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-action-accent/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-action-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-action-accent mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="font-montserrat text-xl font-bold text-trust-navy mb-3">Customer Database Reactivation</h3>
              <p className="font-inter text-gray-600 leading-relaxed">
                We reconnect you with past clients who already trust you. Most contractors are sitting on a goldmine of repeat business.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-action-accent/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-action-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-action-accent mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h3 className="font-montserrat text-xl font-bold text-trust-navy mb-3">CRM Integration</h3>
              <p className="font-inter text-gray-600 leading-relaxed">
                One place for every lead, every job, every follow-up. Stop losing track of opportunities and start closing more deals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-action-accent/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-action-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-action-accent mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              </div>
              <h3 className="font-montserrat text-xl font-bold text-trust-navy mb-3">Automated Review Capture</h3>
              <p className="font-inter text-gray-600 leading-relaxed">
                After every job, we automatically ask your happy clients for a review. You build trust while you sleep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Social Proof */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-trust-navy text-white text-center">
        <div className="max-w-5xl mx-auto">
          <svg className="w-12 h-12 text-action-accent mx-auto mb-6 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
          <blockquote className="font-montserrat text-2xl sm:text-3xl font-medium leading-tight mb-12">
            "Built by a contractor who spent 20+ years in the field and knows what it takes to run a business — not just market one."
          </blockquote>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Testimonial 1 */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-left">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="font-inter text-gray-300 mb-4 text-sm">&quot;The automated review system alone has doubled our organic leads. It&apos;s like having an admin working 24/7.&quot;</p>
              <div className="font-montserrat font-semibold text-white">Mike R.</div>
              <div className="font-inter text-action-accent text-xs">HVAC Contractor</div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-left">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="font-inter text-gray-300 mb-4 text-sm">&quot;Finally, a CRM that doesn&apos;t feel like rocket science. Managing our leads has never been easier.&quot;</p>
              <div className="font-montserrat font-semibold text-white">Sarah T.</div>
              <div className="font-inter text-action-accent text-xs">Plumbing Services</div>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-left">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="font-inter text-gray-300 mb-4 text-sm">&quot;Reactivating our old customers brought in a wave of jobs during our slow season. Invaluable.&quot;</p>
              <div className="font-montserrat font-semibold text-white">David L.</div>
              <div className="font-inter text-action-accent text-xs">Roofing Specialists</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-t border-white/10 pt-10">
            <div>
              <div className="text-3xl font-bold font-montserrat text-action-accent mb-1">500+</div>
              <div className="text-sm font-inter text-gray-400 uppercase tracking-wider">Pros in Our Network</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-montserrat text-action-accent mb-1">20+ Years</div>
              <div className="text-sm font-inter text-gray-400 uppercase tracking-wider">Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold font-montserrat text-action-accent mb-1">Local</div>
              <div className="text-sm font-inter text-gray-400 uppercase tracking-wider">Central Maryland Focused</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GHL Embed Section */}
      <section id="join-network" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 relative">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl sm:text-4xl font-bold text-trust-navy mb-4">Join the Central Maryland Network</h2>
            <p className="font-inter text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and our team will personally reach out within 24 hours to set up your digital backend.
            </p>
          </div>
          
          <ProSignupForm />
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-3xl sm:text-4xl font-bold text-trust-navy mb-4">Frequently Asked Questions</h2>
            <p className="font-inter text-lg text-gray-600">Everything you need to know about partnering with brAIny pro.</p>
          </div>
          
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "brAIny pro Digital Backend Systems",
            "provider": {
              "@type": "LocalBusiness",
              "name": "brAIny pro",
              "url": "https://brainyprolocal.com",
              "logo": "https://brainyprolocal.com/logo.png",
              "slogan": "Build trust. Buy back time. Keep your clients for life.",
              "description": "Digital bridges for local home service pros in Central Maryland."
            },
            "areaServed": {
              "@type": "State",
              "name": "Maryland"
            },
            "serviceType": "B2B SaaS Digital Backend for Home Service Contractors",
            "description": "Custom digital backend installation for contractors including CRM, database reactivation, and automated review capture."
          })
        }}
      />
    </main>
  );
}
