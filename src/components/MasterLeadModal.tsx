'use client';

import Modal from './Modal';

interface MasterLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: string;
}

const TRADE_OPTIONS = [
  'Plumbing',
  'Electrical',
  'HVAC',
  'Roofing',
  'Landscaping',
  'Carpentry',
  'Painting',
  'Cleaning',
  'General Handyman',
  'Other',
];

const TIER_OPTIONS = [
  'Free Network',
  '$97/mo Growth Engine',
  'Custom Ultimate Tier',
];

export default function MasterLeadModal({ isOpen, onClose, selectedTier }: MasterLeadModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join the brAIny pro Network">
      {/* ──────────────────────────────────────────────────────────────
       *  MASTER LEAD-CAPTURE FORM CONTAINER
       *  When the live form iframe is ready, replace the entire
       *  mockup below with the embed code inside the raw HTML div.
       * ────────────────────────────────────────────────────────────── */}

      {/* ═══ RAW HTML EMBED BLOCK ═══ */}
      <div id="b2b-master-form-embed">
        {/* <!-- PASTE B2B MASTER FORM IFRAME HERE --> */}
      </div>
      {/* ═══ END RAW HTML EMBED BLOCK ═══ */}

      {/* ═══ VISUAL MOCKUP (for UI spacing only — remove when live form is pasted) ═══ */}
      <div className="space-y-4 mt-2">
        <p className="text-sm text-gray-500 font-inter mb-4">
          Fill out the form below and our team will personally reach out within 24 hours.
        </p>

        {/* Row 1: First Name / Last Name */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 font-inter">First Name</label>
            <input
              type="text"
              placeholder="John"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-inter bg-gray-50 focus:outline-none focus:ring-2 focus:ring-action-accent/40 focus:border-action-accent transition-all"
              readOnly
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 font-inter">Last Name</label>
            <input
              type="text"
              placeholder="Smith"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-inter bg-gray-50 focus:outline-none focus:ring-2 focus:ring-action-accent/40 focus:border-action-accent transition-all"
              readOnly
            />
          </div>
        </div>

        {/* Row 2: Business Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 font-inter">Legal Business Name</label>
          <input
            type="text"
            placeholder="Smith & Sons Plumbing LLC"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-inter bg-gray-50 focus:outline-none focus:ring-2 focus:ring-action-accent/40 focus:border-action-accent transition-all"
            readOnly
          />
        </div>

        {/* Row 3: Phone / Email */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 font-inter">Business Phone</label>
            <input
              type="tel"
              placeholder="(410) 555-1234"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-inter bg-gray-50 focus:outline-none focus:ring-2 focus:ring-action-accent/40 focus:border-action-accent transition-all"
              readOnly
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 font-inter">Business Email</label>
            <input
              type="email"
              placeholder="john@smithplumbing.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-inter bg-gray-50 focus:outline-none focus:ring-2 focus:ring-action-accent/40 focus:border-action-accent transition-all"
              readOnly
            />
          </div>
        </div>

        {/* Row 4: Website URL */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 font-inter">Website URL</label>
          <input
            type="url"
            placeholder="https://smithplumbing.com"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-inter bg-gray-50 focus:outline-none focus:ring-2 focus:ring-action-accent/40 focus:border-action-accent transition-all"
            readOnly
          />
        </div>

        {/* Row 5: Trade / Tier Dropdowns */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 font-inter">Primary Trade</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-inter bg-gray-50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-action-accent/40 focus:border-action-accent transition-all appearance-none"
              disabled
            >
              <option>Select your trade</option>
              {TRADE_OPTIONS.map((trade) => (
                <option key={trade} value={trade}>{trade}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 font-inter">Select Your Tier</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-inter bg-gray-50 text-gray-500 focus:outline-none focus:ring-2 focus:ring-action-accent/40 focus:border-action-accent transition-all appearance-none"
              defaultValue={selectedTier || ''}
              disabled
            >
              <option value="">Select a tier</option>
              {TIER_OPTIONS.map((tier) => (
                <option key={tier} value={tier}>{tier}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button Mockup */}
        <button
          type="button"
          className="w-full mt-2 py-3 bg-action-accent hover:bg-connection-blue text-white font-semibold font-montserrat rounded-lg shadow-md transition-all duration-300 cursor-not-allowed opacity-80"
          disabled
        >
          Submit Application
        </button>

        <p className="text-xs text-center text-gray-400 font-inter mt-2">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </Modal>
  );
}
