'use client';

import { useActionState } from 'react';
import { submitRSVP, type RSVPState } from '@/app/businessandbrews/actions';

interface RSVPFormProps {
  eventName: string;
}

export default function RSVPForm({ eventName }: RSVPFormProps) {
  const [state, formAction, isPending] = useActionState<RSVPState, FormData>(
    submitRSVP,
    null
  );

  if (state?.success) {
    return (
      <div className="max-w-md mx-auto p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
        <div className="text-4xl mb-4">🍻</div>
        <p className="text-xl font-semibold font-montserrat mb-2">RSVP Received!</p>
        <p className="text-white/70">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="max-w-md mx-auto">
      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-5">
        <h3 className="text-xl font-semibold font-montserrat text-center mb-6">
          RSVP
        </h3>

        <input type="hidden" name="eventName" value={eventName} />

        {/* Attending */}
        <div>
          <label htmlFor="attending" className="block text-sm font-medium text-white/80 mb-1.5">
            Will you be attending? <span className="text-action-accent">*</span>
          </label>
          <select
            id="attending"
            name="attending"
            required
            defaultValue=""
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-action-accent focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled className="bg-[#0F172A]">Select...</option>
            <option value="yes" className="bg-[#0F172A]">Yes, I&apos;ll be there!</option>
            <option value="no" className="bg-[#0F172A]">No, I can&apos;t make it</option>
          </select>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-white/80 mb-1.5">
            Full Name <span className="text-action-accent">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            placeholder="John Smith"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-action-accent focus:border-transparent transition-all"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-1.5">
            Company <span className="text-action-accent">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            placeholder="Your company name"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-action-accent focus:border-transparent transition-all"
          />
        </div>

        {/* Suggestions / Questions */}
        <div>
          <label htmlFor="suggestions" className="block text-sm font-medium text-white/80 mb-1.5">
            Suggestions or questions you&apos;d like answered
            <span className="text-white/40 text-xs ml-1">(optional)</span>
          </label>
          <textarea
            id="suggestions"
            name="suggestions"
            rows={3}
            placeholder="Any topics you'd like covered, dietary needs, etc."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-action-accent focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Error message */}
        {state && !state.success && (
          <p className="text-red-400 text-sm text-center">{state.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-8 py-4 bg-action-accent hover:bg-action-accent/80 disabled:bg-action-accent/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 text-lg flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </>
          ) : (
            'RSVP'
          )}
        </button>
      </div>
    </form>
  );
}
