'use client';

import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      // Basic focus trap
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-clean-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in scale-100 transition-all">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-trust-navy hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-action-accent"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {title && (
            <h2 id="modal-title" className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-trust-navy mb-4 pr-8">
              {title}
            </h2>
          )}
          <div className="text-trust-navy">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
