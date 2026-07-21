'use client';

import { useState } from 'react';

export default function ProSignupForm() {
  const [showMockForm, setShowMockForm] = useState(true);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="p-8 md:p-12">
        
        {showMockForm && (
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-trust-navy mb-2 font-inter">First Name</label>
                <input type="text" id="firstName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-action-accent focus:border-transparent outline-none transition-all duration-200" placeholder="John" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-trust-navy mb-2 font-inter">Last Name</label>
                <input type="text" id="lastName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-action-accent focus:border-transparent outline-none transition-all duration-200" placeholder="Doe" />
              </div>
            </div>

            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-trust-navy mb-2 font-inter">Legal Business Name</label>
              <input type="text" id="businessName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-action-accent focus:border-transparent outline-none transition-all duration-200" placeholder="Doe's Plumbing LLC" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-trust-navy mb-2 font-inter">Business Phone Number</label>
                <input type="tel" id="phone" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-action-accent focus:border-transparent outline-none transition-all duration-200" placeholder="(555) 123-4567" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-trust-navy mb-2 font-inter">Business Email</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-action-accent focus:border-transparent outline-none transition-all duration-200" placeholder="john@doesplumbing.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-trust-navy mb-2 font-inter">Website URL (Optional)</label>
                <input type="url" id="website" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-action-accent focus:border-transparent outline-none transition-all duration-200" placeholder="https://doesplumbing.com" />
              </div>
              <div>
                <label htmlFor="trade" className="block text-sm font-medium text-trust-navy mb-2 font-inter">Primary Trade</label>
                <select id="trade" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-action-accent focus:border-transparent outline-none transition-all duration-200 bg-white">
                  <option value="">Select a trade...</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="hvac">HVAC</option>
                  <option value="electrical">Electrical</option>
                  <option value="roofing">Roofing</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="painting">Painting</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button type="button" className="w-full bg-action-accent hover:bg-connection-blue text-white font-montserrat font-bold text-lg py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                Apply Now
              </button>
            </div>
          </form>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200">
          {/* ═══════════════════════════════════════════════════════════════
               GoHighLevel FORM EMBED BLOCK — PRO SIGNUP / JOIN NETWORK
               Paste your GHL iframe code inside this container.
               Remove the mocked form fields above once the iframe is live.
               ═══════════════════════════════════════════════════════════════ */}
          <div id="ghl-pro-signup-form-embed" className="min-h-[400px] w-full rounded-xl border-2 border-dashed border-action-accent/30 bg-gray-50 p-8 flex items-center justify-center">
            <p className="text-gray-400 text-center font-inter">GoHighLevel Pro Signup Form — Paste iframe here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
