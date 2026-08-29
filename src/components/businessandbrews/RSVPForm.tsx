'use client';

import { useActionState } from 'react';
import { submitRSVP, type RSVPState } from '@/app/businessandbrews/actions';

export interface EventDetails {
  title: string;
  startDate: string; // ISO 8601, e.g. "2026-10-16T18:00:00"
  endDate: string;   // ISO 8601, e.g. "2026-10-16T19:30:00"
  location: string;
  description?: string;
}

interface RSVPFormProps {
  eventName: string;
  eventDetails?: EventDetails;
}

function toCalendarDate(iso: string): string {
  return iso.replace(/[-:]/g, '').split('.')[0];
}

function buildGoogleCalUrl(event: EventDetails): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${toCalendarDate(event.startDate)}/${toCalendarDate(event.endDate)}`,
    location: event.location,
    details: event.description || '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildIcsContent(event: EventDetails): string {
  const uid = `${toCalendarDate(event.startDate)}-${event.title.replace(/\s+/g, '')}@brainyprolocal.com`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//brainy pro//Business & Brews//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTART:${toCalendarDate(event.startDate)}`,
    `DTEND:${toCalendarDate(event.endDate)}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    `DESCRIPTION:${event.description || ''}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function downloadIcs(event: EventDetails) {
  const content = buildIcsContent(event);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${event.title.replace(/\s+/g, '-').toLowerCase()}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function RSVPForm({ eventName, eventDetails }: RSVPFormProps) {
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

        {state.attending === 'yes' && eventDetails && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-sm text-white/50 mb-3">Add to your calendar</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={buildGoogleCalUrl(eventDetails)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-medium transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.5 3h-3V1.5h-1.5V3h-6V1.5H7.5V3h-3C3.675 3 3 3.675 3 4.5v15c0 .825.675 1.5 1.5 1.5h15c.825 0 1.5-.675 1.5-1.5v-15c0-.825-.675-1.5-1.5-1.5zm0 16.5h-15V9h15v10.5zm0-12h-15V4.5h15V7.5z" />
                </svg>
                Google Calendar
              </a>
              <button
                onClick={() => downloadIcs(eventDetails)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-medium transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
                Apple / Outlook
              </button>
            </div>
          </div>
        )}
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
            placeholder="Any suggestions or topics you'd like covered?"
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
