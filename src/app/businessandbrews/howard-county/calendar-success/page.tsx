import Link from "next/link";
import { Metadata } from "next";
import EventBackground from "@/components/businessandbrews/EventBackground";

export const metadata: Metadata = {
  title: "Added to Calendar | Business & Brews — Howard County",
};

export default function HowardCountyCalendarSuccessPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <EventBackground variant="emerald" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md w-full mx-auto p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
          <div className="text-5xl mb-5">📅</div>

          <h1 className="text-2xl font-montserrat font-bold mb-2">
            You&apos;re all set!
          </h1>
          <p className="text-white/70 mb-1">
            <span className="font-semibold text-white">Business &amp; Brews — Howard County</span> has been added to your calendar.
          </p>
          <p className="text-white/50 text-sm mt-1 mb-6">
            Monday, September 14, 2026 &bull; 6:00 – 7:30 PM<br />
            Cushwa and Rad Pies Taproom<br />
            6695 Dobbin Rd Ste G, Columbia, MD 21045
          </p>

          <div className="w-16 h-0.5 bg-action-accent/50 mx-auto my-6" />

          <p className="text-white/60 text-sm mb-8">
            We look forward to seeing you there. Feel free to share the event with a fellow home service pro!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/businessandbrews/howard-county"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-action-accent hover:bg-action-accent/80 text-white font-semibold rounded-xl transition-all duration-300 text-sm"
            >
              ← Back to Event Page
            </Link>
            <Link
              href="/businessandbrews"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-xl transition-all text-sm"
            >
              All Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
