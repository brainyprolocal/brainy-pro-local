'use client';

import React, { useState } from 'react';
import Modal from '@/components/Modal';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: string;
  city?: string;
}

const SERVICES = [
  'Plumbing', 'HVAC', 'Electrical', 'Roofing', 
  'General Handyman', 'Carpentry', 'Landscaping', 
  'Cleaning', 'Painting', 'Other'
];

export default function LeadCaptureModal({ isOpen, onClose, service, city }: LeadCaptureModalProps) {
  // State is mainly for visual mocking, as the form isn't functional right now.
  const [selectedService, setSelectedService] = useState(service || '');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-2xl bg-white p-6 md:p-8 rounded-2xl text-trust-navy font-[family-name:var(--font-inter)]">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-montserrat)] text-connection-blue mb-4">
            We are currently vetting the top 3 pros in your area. 
          </h2>
          <p className="text-gray-600 font-medium text-sm md:text-base">
            Enter your details, and we will personally connect you with our approved pro.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-connection-blue mb-8 bg-blue-50/50 p-3 rounded-lg">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Free Quotes
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Vetted Pros
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            No Obligation
          </span>
        </div>

        {/* Mocked Form Section - for layout visualization */}
        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">First Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-action-accent focus:ring-1 focus:ring-action-accent transition-colors" placeholder="John" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Phone Number</label>
              <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-action-accent focus:ring-1 focus:ring-action-accent transition-colors" placeholder="(555) 000-0000" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1 text-gray-700">Email Address</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-action-accent focus:ring-1 focus:ring-action-accent transition-colors" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Zip Code</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-action-accent focus:ring-1 focus:ring-action-accent transition-colors" placeholder="20707" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Service Needed</label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-action-accent focus:ring-1 focus:ring-action-accent transition-colors bg-white"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">Select a service...</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {city && (
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">City</label>
                <input type="text" disabled className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg" value={city} />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Briefly describe your project</label>
            <textarea 
              rows={3} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-action-accent focus:ring-1 focus:ring-action-accent transition-colors resize-none"
              placeholder="Tell us what you need help with..."
            ></textarea>
          </div>

          <button 
            type="button" 
            className="w-full bg-action-accent hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors font-[family-name:var(--font-montserrat)] mt-2"
          >
            Get My Free Quotes
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
             GoHighLevel FORM EMBED BLOCK — HOMEOWNER LEAD CAPTURE
             Paste your GHL iframe code inside this container.
             Remove the mocked form fields above once the iframe is live.
             ═══════════════════════════════════════════════════════════════ */}
        <div id="ghl-homeowner-form-embed" className="mt-8 border-t border-gray-200 pt-8">
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
            <p>GHL Form Embed Placeholder</p>
          </div>
        </div>

      </div>
    </Modal>
  );
}
