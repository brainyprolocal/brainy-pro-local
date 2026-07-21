import React from 'react';
import { Pro } from '@/data/prosData';

/**
 * ProCard — Featured pro placeholder card component
 * Displays pro information with avatar, rating stars, verified badge, and trade info
 */
export default function ProCard({ pro }: { pro: Pro }) {
  const { name, businessName, trade, rating, reviewCount, yearsInBusiness, verified } = pro;

  // Get initials for avatar fallback
  const getInitials = (n: string) => {
    return n.split(' ').map(part => part[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col font-[family-name:var(--font-inter)] border border-gray-100 group">
      {/* Banner Top */}
      <div className="h-16 bg-gradient-to-r from-connection-blue to-blue-700 w-full relative">
        {verified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center shadow-sm">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            Verified Pro
          </div>
        )}
      </div>

      <div className="px-6 pb-6 pt-0 relative flex-1 flex flex-col">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center -mt-10 mx-auto shadow-md overflow-hidden relative z-10">
          <span className="text-2xl font-bold text-gray-400 font-[family-name:var(--font-montserrat)]">{getInitials(name)}</span>
        </div>

        {/* Info */}
        <div className="text-center mt-3 mb-1">
          <h3 className="text-xl font-bold text-trust-navy font-[family-name:var(--font-montserrat)] truncate">
            {name}
          </h3>
          <p className="text-action-accent font-semibold text-sm">{trade}</p>
          <p className="text-gray-500 text-xs mt-0.5">{businessName}</p>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-2 mt-auto pt-3">
          {/* Rating */}
          <div className="flex items-center justify-center text-sm bg-gray-50 rounded-lg py-2">
            <div className="flex text-[#FBBF24]">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className={`w-4 h-4 ${star <= Math.round(rating) ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 font-medium ml-2">({reviewCount})</span>
          </div>

          <div className="flex items-center justify-center text-xs font-medium text-gray-500 bg-gray-50 rounded-lg py-2">
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {yearsInBusiness} Years in Business
          </div>
        </div>

        <button className="w-full mt-4 bg-trust-navy text-white hover:bg-connection-blue py-2.5 rounded-lg font-semibold transition-colors duration-300 opacity-90 group-hover:opacity-100">
          View Profile
        </button>
      </div>
    </div>
  );
}
