'use client';

import { useState } from 'react';

interface PhaseItem {
  title: string;
  description: string;
  iconPaths: string[];
}

interface Phase {
  number: number;
  title: string;
  tagline: string;
  prerequisite: string;
  items: PhaseItem[];
  unlocks: string;
}

interface StartingOption {
  id: string;
  label: string;
  description: string;
  startPhase: number;
  iconPaths: string[];
}

function StrokeIcon({ paths, className = 'w-6 h-6' }: { paths: string[]; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {paths.map((d, i) => (
        <path key={i} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
      ))}
    </svg>
  );
}

const startingOptions: StartingOption[] = [
  {
    id: 'scratch',
    label: 'Starting from scratch',
    description: 'No website, no online presence yet',
    startPhase: 1,
    iconPaths: ['M12 6v6m0 0v6m0-6h6m-6 0H6'],
  },
  {
    id: 'has-website',
    label: 'I have a website',
    description: 'Domain and site exist, but limited visibility',
    startPhase: 2,
    iconPaths: ['M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
  },
  {
    id: 'has-gbp',
    label: 'I have a Google listing',
    description: 'Website + Google Business Profile are live',
    startPhase: 3,
    iconPaths: [
      'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
      'M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    ],
  },
  {
    id: 'has-reviews',
    label: 'I need automation',
    description: 'Reviews are rolling — time to scale',
    startPhase: 4,
    iconPaths: ['M13 10V3L4 14h7v7l9-11h-7z'],
  },
];

const phases: Phase[] = [
  {
    number: 1,
    title: 'The Foundation',
    tagline: 'The non-negotiable building blocks every business needs before anything else.',
    prerequisite: 'None — this is where it all begins',
    unlocks:
      'With these in place, you can claim your online identity and start appearing in search results.',
    items: [
      {
        title: 'Domain Name',
        description:
          'Your digital address. A professional .com domain that represents your business and builds instant credibility.',
        iconPaths: ['M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'],
      },
      {
        title: 'Business Phone Number',
        description:
          'A dedicated business line that separates personal and work calls — and unlocks call tracking later.',
        iconPaths: ['M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'],
      },
      {
        title: 'Professional Business Email',
        description:
          'A branded email address (you@yourbusiness.com) that builds trust the moment a customer sees it in their inbox.',
        iconPaths: ['M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
      },
      {
        title: 'Website & Landing Page',
        description:
          'A mobile-first, fast-loading website designed to convert visitors into leads for your specific trade.',
        iconPaths: ['M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
      },
    ],
  },
  {
    number: 2,
    title: 'Online Identity & Citations',
    tagline: 'Get your business visible on every directory and map that matters.',
    prerequisite: 'Phase 1 — Foundation complete',
    unlocks:
      "You're now findable across Google, Yelp, and 100+ directories — the perfect foundation for earning reviews.",
    items: [
      {
        title: 'Google Business Profile',
        description:
          'Your storefront on Google. Appear in Maps, local search, and "near me" results with a fully optimized profile.',
        iconPaths: [
          'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
          'M15 11a3 3 0 11-6 0 3 3 0 016 0z',
        ],
      },
      {
        title: 'Business Citations & Directories',
        description:
          'Get listed on Yelp, Facebook, HomeAdvisor, Angi, BBB, and 100+ other directories. Consistent listings supercharge your local SEO.',
        iconPaths: ['M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'],
      },
      {
        title: 'NAP Consistency',
        description:
          'Your Name, Address, and Phone number must be identical across every listing. Inconsistencies tank your search rankings.',
        iconPaths: ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'],
      },
      {
        title: 'Local Link Building',
        description:
          'Earn authority with links from your Chamber of Commerce, local B2B partners, community organizations, and industry associations.',
        iconPaths: ['M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'],
      },
      {
        title: 'Listing Syndication',
        description:
          'Automatically push your business info to dozens of directories at once, keeping everything accurate and up to date.',
        iconPaths: ['M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'],
      },
    ],
  },
  {
    number: 3,
    title: 'Reputation & Reviews',
    tagline: 'Turn happy customers into 5-star proof — automatically.',
    prerequisite: 'Phase 2 — Google Business Profile live',
    unlocks: 'A 5-star reputation that generates trust before customers ever call you.',
    items: [
      {
        title: 'Automated Review Campaigns',
        description:
          'After every completed job, an SMS and email automatically ask your client for a Google review. No awkward asks needed.',
        iconPaths: ['M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'],
      },
      {
        title: 'Review Widget on Website',
        description:
          'Display your best Google reviews directly on your website to build instant social proof with every visitor.',
        iconPaths: ['M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'],
      },
      {
        title: 'AI-Powered Review Replies',
        description:
          'Every review gets a thoughtful, on-brand reply — thanking happy customers and addressing concerns — 24/7, automatically.',
        iconPaths: ['M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'],
      },
      {
        title: 'Reputation Monitoring',
        description:
          'Track your star rating, review volume, and sentiment across all platforms from a single dashboard.',
        iconPaths: [
          'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
          'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
        ],
      },
      {
        title: 'Review Funnel',
        description:
          'Happy customers get directed to Google. Unhappy ones go to a private feedback form so you can resolve issues before they go public.',
        iconPaths: ['M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'],
      },
    ],
  },
  {
    number: 4,
    title: 'Lead Capture & Communication',
    tagline: 'Make sure every potential customer has a way to reach you — and that you never miss one.',
    prerequisite: 'Phase 1 — Website & phone number active',
    unlocks: 'Every lead is captured, every call is answered, and no opportunity falls through the cracks.',
    items: [
      {
        title: 'Contact Forms',
        description:
          'Custom forms embedded on your website that capture leads and automatically route them into your CRM.',
        iconPaths: ['M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'],
      },
      {
        title: 'Online Booking & Scheduling',
        description:
          'Let customers book directly into your calendar. Syncs with Google Calendar and sends automatic reminders to reduce no-shows.',
        iconPaths: ['M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'],
      },
      {
        title: 'Missed-Call Text-Back',
        description:
          'When you miss a call on a job site, your system instantly texts the caller: "Hey, we saw you called — how can we help?"',
        iconPaths: ['M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'],
      },
      {
        title: 'Unified Multi-Channel Inbox',
        description:
          'SMS, email, Facebook Messenger, Instagram DMs, Google messages — all in one place. Never miss a lead because it came in on the wrong app.',
        iconPaths: ['M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'],
      },
      {
        title: 'Call Tracking & Recording',
        description:
          'Know exactly which campaigns drive calls. Every inbound call is tracked, recorded, and logged so you can measure ROI.',
        iconPaths: ['M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'],
      },
      {
        title: 'Website Chat Widget',
        description:
          "A live chat bubble on your website that captures visitor info and starts conversations — even when you're on a job.",
        iconPaths: ['M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'],
      },
    ],
  },
  {
    number: 5,
    title: 'Automation & Growth',
    tagline: "Put your follow-ups, nurturing, and outreach on autopilot so your business runs even when you don't.",
    prerequisite: 'Phases 1 – 4 in place',
    unlocks:
      'Your business runs like a machine — leads are nurtured, past clients are reactivated, and your pipeline stays full without lifting a finger.',
    items: [
      {
        title: 'Automated Follow-up Sequences',
        description:
          "Leads never go cold. Perfectly timed texts and emails nurture every prospect until they're ready to book.",
        iconPaths: ['M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
      },
      {
        title: 'Database Reactivation',
        description:
          'Unlock hidden revenue sitting in your past-customer list with automated outreach campaigns that reconnect you with clients who already know you.',
        iconPaths: ['M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'],
      },
      {
        title: 'Social Media Auto-Posting',
        description:
          'Schedule and auto-publish across Facebook, Instagram, Google Business, and more — all from one dashboard.',
        iconPaths: ['M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z'],
      },
      {
        title: 'Sales Pipeline & CRM',
        description:
          'Visually track every lead from first contact to closed deal. Move opportunities through custom stages so you always know where your money is.',
        iconPaths: ['M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'],
      },
      {
        title: 'Mobile CRM App',
        description:
          'Manage your entire business from your truck, the job site, or your office. Full CRM access on iOS and Android.',
        iconPaths: ['M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'],
      },
      {
        title: 'AI Booking Agent',
        description:
          "An AI assistant that answers calls, chats with website visitors, and books appointments 24/7 — even when you're on a job.",
        iconPaths: ['M13 10V3L4 14h7v7l9-11h-7z'],
      },
    ],
  },
  {
    number: 6,
    title: 'Full Operations',
    tagline: 'The complete digital transformation — your entire back office runs from one platform.',
    prerequisite: 'Full platform adoption',
    unlocks:
      'Complete digital operations — invoicing, bidding, surveys, analytics, and a branded client portal — all in one place.',
    items: [
      {
        title: 'Invoicing & Tap-to-Pay',
        description:
          'Send professional invoices and collect payment with your phone — no card reader needed. Get paid faster, every time.',
        iconPaths: ['M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'],
      },
      {
        title: 'Job Bidding & Estimates',
        description:
          'Build and send professional estimates in minutes. Track which bids are pending, accepted, or lost — and auto-follow-up.',
        iconPaths: ['M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'],
      },
      {
        title: 'Forms & Surveys',
        description:
          'Custom intake forms, estimate request forms, and post-job satisfaction surveys — collect exactly the info you need.',
        iconPaths: ['M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'],
      },
      {
        title: 'Marketing Calendar Planning',
        description:
          'Annual jam session to map out seasonal campaigns, slow-season pushes, and holiday specials — all planned in advance.',
        iconPaths: ['M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'],
      },
      {
        title: 'Reporting & Analytics',
        description:
          "Custom dashboards showing leads, conversions, revenue, and campaign performance — know exactly what's working.",
        iconPaths: ['M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'],
      },
      {
        title: 'Client Portal',
        description:
          'A branded portal where your customers can view appointments, invoices, and communicate with you — all in one place.',
        iconPaths: ['M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'],
      },
    ],
  },
];

const phaseLabels = ['', '01', '02', '03', '04', '05', '06'];

export default function BlueprintInteractive() {
  const [activeStart, setActiveStart] = useState('scratch');

  const startPhase =
    startingOptions.find((o) => o.id === activeStart)?.startPhase ?? 1;

  const getPhaseStatus = (phaseNumber: number): 'completed' | 'current' | 'upcoming' => {
    if (phaseNumber < startPhase) return 'completed';
    if (phaseNumber === startPhase) return 'current';
    return 'upcoming';
  };

  return (
    <>
      {/* ═══════════════════════════════════════════
       *  WHERE ARE YOU? — Starting-point selector
       * ═══════════════════════════════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-trust-navy/5 text-trust-navy rounded-full border border-trust-navy/10 text-sm font-inter font-semibold uppercase tracking-wider">
              Personalize Your View
            </div>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-trust-navy mb-4">
              Where Are You on the Journey?
            </h2>
            <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
              Select your starting point and we&apos;ll highlight the path forward.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {startingOptions.map((option) => {
              const isActive = activeStart === option.id;
              return (
                <button
                  key={option.id}
                  id={`start-option-${option.id}`}
                  onClick={() => setActiveStart(option.id)}
                  className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer group ${
                    isActive
                      ? 'border-action-accent bg-white shadow-lg shadow-action-accent/10 scale-[1.02]'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {isActive && (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-action-accent rounded-full border-2 border-white shadow-md">
                      <svg className="w-full h-full text-white p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      isActive
                        ? 'bg-action-accent text-white'
                        : 'bg-blue-50 text-action-accent group-hover:bg-blue-100'
                    }`}
                  >
                    <StrokeIcon paths={option.iconPaths} />
                  </div>

                  <h3
                    className={`font-outfit font-bold text-sm mb-1 transition-colors ${
                      isActive ? 'text-action-accent' : 'text-trust-navy'
                    }`}
                  >
                    {option.label}
                  </h3>
                  <p className="text-xs text-gray-500 font-inter">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
       *  ROADMAP — Phase tiers
       * ═══════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {phases.map((phase, index) => {
            const status = getPhaseStatus(phase.number);
            const isCompleted = status === 'completed';
            const isCurrent = status === 'current';

            return (
              <div key={phase.number}>
                <div
                  id={`phase-${phase.number}`}
                  className={`relative rounded-3xl border-2 overflow-hidden transition-all duration-500 ${
                    isCompleted
                      ? 'border-emerald-200 bg-emerald-50/20 opacity-60'
                      : isCurrent
                        ? 'border-action-accent phase-glow bg-white'
                        : 'border-gray-200 bg-white'
                  }`}
                >
                  <div
                    className={`flex items-center gap-4 sm:gap-5 p-6 sm:p-8 border-b ${
                      isCompleted
                        ? 'bg-emerald-50/50 border-emerald-100'
                        : isCurrent
                          ? 'bg-gradient-to-r from-action-accent/5 to-transparent border-action-accent/20'
                          : 'bg-slate-50/50 border-gray-100'
                    }`}
                  >
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 font-outfit font-bold text-lg sm:text-xl transition-all ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-600'
                          : isCurrent
                            ? 'bg-gradient-to-br from-connection-blue to-action-accent text-white shadow-lg shadow-action-accent/20'
                            : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        phaseLabels[phase.number]
                      )}
                    </div>

                    <div className="flex-grow min-w-0">
                      <h3
                        className={`text-xl sm:text-2xl font-outfit font-bold mb-1 ${
                          isCompleted ? 'text-emerald-700' : 'text-trust-navy'
                        }`}
                      >
                        {phase.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-inter line-clamp-2">
                        {phase.tagline}
                      </p>
                    </div>

                    {isCurrent && (
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 bg-action-accent text-white text-xs font-inter font-bold uppercase tracking-wider rounded-full shadow-md animate-pulse-glow shrink-0">
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                        Start Here
                      </span>
                    )}
                    {isCompleted && (
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-inter font-bold uppercase tracking-wider rounded-full shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Complete
                      </span>
                    )}
                  </div>

                  {isCurrent && (
                    <div className="sm:hidden px-6 pt-4">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-action-accent text-white text-xs font-inter font-bold uppercase tracking-wider rounded-full shadow-md animate-pulse-glow">
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                        Start Here
                      </span>
                    </div>
                  )}
                  {isCompleted && (
                    <div className="sm:hidden px-6 pt-4">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-inter font-bold uppercase tracking-wider rounded-full">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Complete
                      </span>
                    </div>
                  )}

                  <div className="px-6 sm:px-8 pt-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-inter text-gray-500">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>
                        <span className="font-semibold text-gray-600">Requires:</span>{' '}
                        {phase.prerequisite}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 sm:p-8">
                    {phase.items.map((item) => (
                      <div
                        key={item.title}
                        className={`group p-5 rounded-xl border transition-all duration-300 ${
                          isCompleted
                            ? 'bg-white/60 border-emerald-100'
                            : 'bg-gray-50 border-gray-100 hover:border-action-accent/30 hover:shadow-md hover:bg-white'
                        }`}
                      >
                        <div
                          className={`w-11 h-11 rounded-lg flex items-center justify-center mb-3 transition-all ${
                            isCompleted
                              ? 'bg-emerald-50 text-emerald-500'
                              : 'bg-blue-50 text-action-accent group-hover:scale-110'
                          }`}
                        >
                          <StrokeIcon paths={item.iconPaths} />
                        </div>
                        <h4 className="font-outfit font-bold text-sm text-trust-navy mb-2">
                          {item.title}
                        </h4>
                        <p className="font-inter text-xs text-gray-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mx-6 sm:mx-8 mb-6 sm:mb-8">
                    <div
                      className={`flex items-start gap-3 p-4 rounded-xl border ${
                        isCompleted
                          ? 'bg-emerald-50/50 border-emerald-100'
                          : 'bg-blue-50/50 border-blue-100'
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 shrink-0 mt-0.5 ${
                          isCompleted ? 'text-emerald-500' : 'text-action-accent'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      <p
                        className={`text-sm font-inter leading-relaxed ${
                          isCompleted ? 'text-emerald-700' : 'text-connection-blue'
                        }`}
                      >
                        <span className="font-semibold">This unlocks:</span>{' '}
                        {phase.unlocks}
                      </p>
                    </div>
                  </div>
                </div>

                {index < phases.length - 1 && (
                  <div className="flex justify-center py-5">
                    <div className="relative flex flex-col items-center">
                      <div className="relative w-0.5 h-14 bg-gradient-to-b from-action-accent/30 to-action-accent/10 rounded-full overflow-hidden">
                        <div className="connector-dot absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-action-accent rounded-full shadow-sm shadow-action-accent/50" />
                      </div>
                      <svg
                        className="w-5 h-5 text-action-accent/40 -mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
