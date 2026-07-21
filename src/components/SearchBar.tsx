'use client';

import React, { useState, useRef, useEffect } from 'react';

const SERVICES = [
  'Plumbing', 'Electrical', 'HVAC', 'Landscaping', 'Roofing', 
  'Carpentry', 'Painting', 'Cleaning', 'General Handyman'
];

const CITIES = [
  'Laurel', 'Columbia', 'Ellicott City', 'Clarksville', 
  'Highland', 'Fulton', 'Savage', 'Jessup', 'Elkridge'
];

interface SearchBarProps {
  onSearch: (data: { service: string; city: string }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [service, setService] = useState('');
  const [city, setCity] = useState('');
  
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const serviceRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  const filteredServices = SERVICES.filter(s => s.toLowerCase().includes(service.toLowerCase()));
  const filteredCities = CITIES.filter(c => c.toLowerCase().includes(city.toLowerCase()));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (serviceRef.current && !serviceRef.current.contains(event.target as Node)) {
        setShowServiceDropdown(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ service, city });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-2 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-2 relative"
    >
      {/* Service Input */}
      <div className="relative flex-1" ref={serviceRef}>
        <div className="flex items-center bg-gray-50/50 hover:bg-gray-100/50 rounded-xl px-4 py-3 border border-transparent focus-within:border-connection-blue/30 focus-within:bg-white transition-all">
          <svg className="w-5 h-5 text-connection-blue mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <input 
            type="text" 
            placeholder="What service do you need?"
            className="w-full bg-transparent outline-none text-trust-navy placeholder-gray-500 font-[family-name:var(--font-inter)]"
            value={service}
            onChange={(e) => {
              setService(e.target.value);
              setShowServiceDropdown(true);
            }}
            onFocus={() => setShowServiceDropdown(true)}
          />
        </div>
        
        {/* Service Dropdown */}
        {showServiceDropdown && filteredServices.length > 0 && (
          <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 max-h-60 overflow-y-auto">
            {filteredServices.map(s => (
              <div 
                key={s} 
                className="px-4 py-2 hover:bg-connection-blue/10 cursor-pointer text-trust-navy font-[family-name:var(--font-inter)]"
                onClick={() => {
                  setService(s);
                  setShowServiceDropdown(false);
                }}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:block w-px bg-gray-200 self-stretch my-2"></div>

      {/* City Input */}
      <div className="relative flex-1" ref={cityRef}>
        <div className="flex items-center bg-gray-50/50 hover:bg-gray-100/50 rounded-xl px-4 py-3 border border-transparent focus-within:border-connection-blue/30 focus-within:bg-white transition-all">
          <svg className="w-5 h-5 text-connection-blue mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <input 
            type="text" 
            placeholder="Your city (e.g., Laurel)"
            className="w-full bg-transparent outline-none text-trust-navy placeholder-gray-500 font-[family-name:var(--font-inter)]"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setShowCityDropdown(true);
            }}
            onFocus={() => setShowCityDropdown(true)}
          />
        </div>
        
        {/* City Dropdown */}
        {showCityDropdown && filteredCities.length > 0 && (
          <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 max-h-60 overflow-y-auto">
            {filteredCities.map(c => (
              <div 
                key={c} 
                className="px-4 py-2 hover:bg-connection-blue/10 cursor-pointer text-trust-navy font-[family-name:var(--font-inter)]"
                onClick={() => {
                  setCity(c);
                  setShowCityDropdown(false);
                }}
              >
                {c}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="bg-action-accent hover:bg-blue-700 text-white rounded-xl px-8 py-3 flex items-center justify-center transition-all duration-300 font-bold font-[family-name:var(--font-montserrat)] shadow-md hover:shadow-lg"
      >
        <svg className="w-5 h-5 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <span className="hidden md:inline">Search</span>
      </button>
    </form>
  );
}
