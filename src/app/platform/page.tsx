import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Platform — Everything We Build For You',
  description:
    'Explore every tool, system, and automation the brAIny pro platform offers. From CRM and review capture to AI-powered replies and job bidding — see the full picture.',
};

/* ─────────────────────────────────────────
 * Feature data — comprehensive, un-tiered
 * ───────────────────────────────────────── */

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: 'Contractor Network Membership',
    description:
      'Get listed in our growing network of vetted Maryland home service professionals. Build referral relationships with contractors in complementary trades.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Online Directory Placement',
    description:
      'Priority placement in our upcoming consumer-facing directory so homeowners in your area can find and trust you before they ever pick up the phone.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: 'Database Reactivation',
    description:
      'Unlock hidden revenue sitting in your past customer list. We build automated outreach campaigns that reconnect you with clients who already know and trust your work.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Automated Review Capture',
    description:
      'After every completed job, your happy clients are automatically asked for a Google review. Build a 5-star reputation while you sleep — no awkward asks required.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: 'AI-Powered Review Replies',
    description:
      'Never leave a review unanswered. Our AI reads each review and crafts a thoughtful, on-brand reply — thanking happy customers and professionally addressing concerns, 24/7.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    title: 'Annual Marketing Calendar Jam Session',
    description:
      'Once a year, we sit down together and map out your entire promotional calendar — seasonal pushes, slow-season campaigns, and holiday specials, all planned in advance.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Missed-Call Text-Back Automation',
    description:
      'When you miss a call on a job site, your system instantly texts the caller back: "Hey, we saw you called — how can we help?" Turn missed calls into booked jobs.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: 'Automated Email & Text Follow-up Sequences',
    description:
      'Leads don&apos;t go cold on your watch. Automated drip campaigns nurture every prospect with perfectly timed texts and emails until they&apos;re ready to book.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Automated Multi-App Social Media Posting',
    description:
      'Stay visible without the daily grind. Schedule and auto-publish content across Facebook, Instagram, Google Business, and more — all from one dashboard.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    ),
  },
  {
    title: 'Custom Website & Landing Page Design',
    description:
      'A professional, mobile-first website built for conversions — not just looks. Fast-loading landing pages designed to turn visitors into leads for your specific trade.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Unified Multi-Channel Inbox',
    description:
      'SMS, email, Facebook Messenger, Instagram DMs, Google messages — all in one place. Never miss a lead because it came in on the wrong app.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
  },
  {
    title: 'Drag-and-Drop Sales Pipeline',
    description:
      'Visually track every lead from first contact to closed deal. Move opportunities through custom stages so you always know exactly where your money is.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Unified Calendar & Appointment Scheduling',
    description:
      'Let clients book directly into your calendar. Syncs with Google Calendar and sends automatic reminders so no-shows become a thing of the past.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Invoicing & Tap-to-Pay Integration',
    description:
      'Send professional invoices and collect payment on the spot. Tap-to-pay with your phone — no card reader needed. Get paid faster, every time.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    title: 'Form & Survey Builder',
    description:
      'Create custom intake forms, estimate request forms, and post-job satisfaction surveys. Collect exactly the information you need, automatically.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Call Tracking & Recording',
    description:
      'Know exactly which campaigns are driving calls. Every inbound call is tracked, recorded, and logged so you can measure ROI and coach your team.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Desktop and Mobile CRM App',
    description:
      'Manage your entire business from your truck, the job site, or your office. Full CRM access on desktop, iOS, and Android — your business travels with you.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Job Bidding Software',
    description:
      'Build and send professional estimates and bids in minutes. Track which bids are pending, accepted, or lost — and follow up automatically on the ones that haven&apos;t responded.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-clean-white text-trust-navy">
      {/* ═══════════════════════════════════════════
       *  HERO — Mission-Driven
       * ═══════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-trust-navy via-connection-blue to-action-accent overflow-hidden px-4 py-32 sm:py-40 text-center text-clean-white">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-action-accent/20 rounded-full blur-3xl pointer-events-none animate-float"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-inter">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            The Full Picture
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-outfit font-bold mb-6 drop-shadow-lg leading-[1.1] tracking-tight">
            Everything We Build<br />
            <span className="text-white/80">For Your Business.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-inter font-light leading-relaxed">
            Every tool listed below lives inside one platform. No piecemealing five different apps together. No hiring extra staff. Just the systems your business needs to run — installed, configured, and managed for you.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
       *  MISSION / PHILOSOPHY SECTION
       * ═══════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-trust-navy/5 text-trust-navy rounded-full border border-trust-navy/10 text-sm font-inter font-semibold uppercase tracking-wider">
                Our Mission
              </div>
              <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-trust-navy mb-6 leading-tight">
                Your partner — without the partnership paperwork.
              </h2>
              <p className="text-lg text-gray-600 font-inter mb-6 leading-relaxed">
                Most contractors don&apos;t need another employee. They need someone in their corner who understands the business, builds the right systems, and makes sure nothing falls through the cracks.
              </p>
              <p className="text-lg text-gray-600 font-inter leading-relaxed">
                That&apos;s us. We install the digital backbone of your operation so you can focus on what you do best — the actual work. Every feature below is something we configure, maintain, and support for you. You don&apos;t need to be tech-savvy. You just need to answer the phone when it rings more.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-action-accent shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="font-outfit font-bold text-trust-navy text-lg">Systems Over Hustle</h3>
                </div>
                <p className="font-inter text-gray-600 text-sm leading-relaxed">
                  You shouldn&apos;t have to stay up until midnight doing follow-ups. The right systems handle it while you rest.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-action-accent shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <h3 className="font-outfit font-bold text-trust-navy text-lg">Relationships Over Transactions</h3>
                </div>
                <p className="font-inter text-gray-600 text-sm leading-relaxed">
                  We help you build lasting customer connections — not chase one-time leads that never call back.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-action-accent shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <h3 className="font-outfit font-bold text-trust-navy text-lg">Trust Is the Product</h3>
                </div>
                <p className="font-inter text-gray-600 text-sm leading-relaxed">
                  Everything we build — reviews, follow-ups, reactivations — is designed to make your customers trust you more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
       *  FULL FEATURE GRID
       * ═══════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-trust-navy mb-4">
              Every Tool in the Toolbox
            </h2>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              Here&apos;s everything the brAIny pro platform can do for your business. Every contractor is different — during our consultation, we&apos;ll figure out exactly which pieces make sense for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-gray-50 p-7 rounded-2xl border border-gray-100 hover:border-action-accent/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-action-accent mb-5 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-outfit text-lg font-bold text-trust-navy mb-3">
                  {feature.title}
                </h3>
                <p className="font-inter text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
       *  "NOT ANOTHER EMPLOYEE" CALLOUT
       * ═══════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-trust-navy mb-6">
            You don&apos;t need to hire more people.
          </h2>
          <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto mb-4 leading-relaxed">
            Hiring an office manager, a marketing person, and a tech admin could cost $120k+ a year. Or you could let us install systems that handle what all three of those roles would do — for a fraction of the cost, with zero onboarding headaches.
          </p>
          <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto leading-relaxed">
            We&apos;re not a vendor. We&apos;re not an agency. We&apos;re the operational partner who gives you back your time and helps your business run like a machine.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
       *  CTA BANNER
       * ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-connection-blue to-action-accent py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-trust-navy/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold text-clean-white mb-6">
            Ready to See What Fits Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-inter">
            Every business is different. Let&apos;s figure out the exact combination of tools that makes sense for yours.
          </p>
          <Link
            href="/#pricing"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-connection-blue bg-clean-white rounded-full shadow-xl hover:bg-slate-100 hover:scale-105 transition-all duration-300 gap-3 font-montserrat"
          >
            View Platform Pricing
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
