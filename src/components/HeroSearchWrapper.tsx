'use client';

import { useState } from 'react';
import SearchBar from './SearchBar';
import LeadCaptureModal from './LeadCaptureModal';

export default function HeroSearchWrapper() {
  const [showModal, setShowModal] = useState(false);
  const [searchService, setSearchService] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const handleSearch = ({ service, city }: { service: string; city: string }) => {
    setSearchService(service);
    setSearchCity(city);
    setShowModal(true);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <LeadCaptureModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        service={searchService} 
        city={searchCity} 
      />
    </>
  );
}
