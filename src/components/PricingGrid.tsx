'use client';

import { useState } from 'react';
import MasterLeadModal from './MasterLeadModal';

/* ─────────────────────────────────────────
 * Tier data — all features belong to the
 * brAIny pro platform (white-label strict)
 * ───────────────────────────────────────── */

interface Tier {
  name: string;
  price: string;
  priceSuffix?: string;
  setupNote?: string;
  description: string;
  features: string[];
  cta: string;
  tierValue: string;   // value passed to the modal dropdown
  highlighted?: boolean;
  badge?: string;
}

const tiers: Tier[] = [
  {
    name: 'The Network',
    price: 'Free',
    description: 'Get listed and get found.',
    features: [
      'Join our current Maryland professional network.',
      'Priority placement in our upcoming online consumer directory.',
    ],
    cta: 'Join the Network',
    tierValue: 'Free Network',
  },
  {
    name: 'The Growth Engine',
    price: '$97',
    priceSuffix: '/ month',
    setupNote: '+$100 one-time setup fee',
    description: 'The operational backbone your business has been missing.',
    features: [
      'Everything in The Network, plus:',
      'Database Reactivation — Unlock hidden revenue from past clients.',
      'Automated Review Capture — Skyrocket your local Google rankings.',
      'Annual Marketing Calendar Jam Session.',
    ],
    cta: 'Start Growing',
    tierValue: '$97/mo Growth Engine',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'brAIny pro Ultimate',
    price: 'Contact for Pricing',
    setupNote: '+$100 one-time setup fee',
    description: 'The full-stack digital backend — everything, automated.',
    features: [
      'Everything in The Growth Engine, plus:',
      'Missed-Call Text-Back Automation.',
      'Automated Email & Text Follow-up Sequences.',
      'Automated Multi-App Social Media Posting.',
      'Custom Website & Landing Page Design.',
      'Unified Multi-Channel Inbox (SMS, Email, FB, IG).',
      'Drag-and-Drop Sales Pipeline Management.',
      'Unified Calendar & Appointment Scheduling.',
      'Invoicing & Tap-to-Pay Integration.',
      'Form & Survey Builder.',
      'Call Tracking & Recording.',
      'Desktop and Mobile CRM App.',
    ],
    cta: 'Get Custom Quote',
    tierValue: 'Custom Ultimate Tier',
  },
];

export default function PricingGrid() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>('');

  const openModal = (tierValue: string) => {
    setSelectedTier(tierValue);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 max-w-6xl mx-auto items-stretch">
        {tiers.map((tier, index) => {
          const isHighlighted = tier.highlighted;
          const isFirst = index === 0;
          const isLast = index === tiers.length - 1;

          return (
            <div
              key={tier.name}
              className={`
                relative flex flex-col
                ${isHighlighted
                  ? 'bg-white border-2 border-action-accent shadow-2xl rounded-2xl lg:rounded-2xl z-10 lg:scale-[1.05]'
                  : `bg-white border border-gray-200 shadow-md
                     ${isFirst ? 'rounded-2xl lg:rounded-l-2xl lg:rounded-r-none' : ''}
                     ${isLast ? 'rounded-2xl lg:rounded-r-2xl lg:rounded-l-none' : ''}
                    `
                }
                transition-all duration-300 hover:shadow-xl
              `}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-action-accent text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg font-outfit">
                  {tier.badge}
                </div>
              )}

              {/* Card Body */}
              <div className={`flex flex-col flex-1 p-8 ${isHighlighted ? 'pt-10' : ''}`}>
                {/* Tier Name */}
                <h3 className="text-lg font-bold font-outfit text-trust-navy tracking-wide uppercase">
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="mt-4 mb-2">
                  {tier.priceSuffix ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-extrabold font-outfit text-trust-navy">{tier.price}</span>
                      <span className="text-lg text-gray-500 font-inter">{tier.priceSuffix}</span>
                    </div>
                  ) : (
                    <span className={`text-4xl font-extrabold font-outfit ${tier.price === 'Free' ? 'text-green-600' : 'text-trust-navy'}`}>
                      {tier.price}
                    </span>
                  )}
                </div>

                {/* Setup Note */}
                {tier.setupNote && (
                  <p className="text-xs text-gray-400 font-inter mb-4 italic">
                    {tier.setupNote}
                  </p>
                )}

                {/* Description */}
                <p className="text-sm text-gray-600 font-inter mb-6 leading-relaxed">
                  {tier.description}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-gray-100 mb-6"></div>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-action-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700 font-inter leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => openModal(tier.tierValue)}
                  className={`
                    w-full py-3.5 rounded-xl font-semibold font-montserrat text-sm tracking-wide
                    transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg
                    ${isHighlighted
                      ? 'bg-action-accent text-white hover:bg-connection-blue'
                      : 'bg-trust-navy text-white hover:bg-connection-blue'
                    }
                  `}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Master Lead-Capture Modal */}
      <MasterLeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedTier={selectedTier}
      />
    </>
  );
}
