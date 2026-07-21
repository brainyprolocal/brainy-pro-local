'use client';

import React from 'react';
import Modal from '@/components/Modal';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export default function WaitlistModal({ isOpen, onClose, category }: WaitlistModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full text-center font-[family-name:var(--font-inter)] shadow-2xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-50 rounded-full opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-blue-50 rounded-full opacity-50 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-connection-blue mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-montserrat)] text-trust-navy mb-3">
            🚀 Coming Soon: <span className="text-action-accent">{category}</span> Directory
          </h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            We're building the most trusted network of {category} professionals in Central Maryland. Be the first to know when we launch!
          </p>

          <form className="flex flex-col gap-3 max-w-sm mx-auto mb-6" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-action-accent focus:ring-2 focus:ring-action-accent/20 transition-all text-trust-navy"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-action-accent hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg font-[family-name:var(--font-montserrat)]"
            >
              Join the Waitlist
            </button>
            <p className="text-xs text-gray-400 mt-2">
              No spam. Just a launch notification.
            </p>
          </form>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=J+D&background=random" alt="user" />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=S+M&background=random" alt="user" />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=A+P&background=random" alt="user" />
              </div>
            </div>
            <p className="text-sm font-medium text-trust-navy">
              Trusted by 500+ homeowners in Central Maryland
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
