import React from 'react';

interface CategoryCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  onClick: () => void;
}

export default function CategoryCard({ name, icon, description, onClick }: CategoryCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-transparent hover:border-action-accent/20 hover:-translate-y-1 p-6 flex flex-col items-center text-center"
    >
      {/* Subtle hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-action-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      
      <div className="w-12 h-12 rounded-full bg-connection-blue flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      <h3 className="text-lg font-bold font-[family-name:var(--font-montserrat)] text-trust-navy mb-2">
        {name}
      </h3>
      
      <p className="text-sm text-gray-600 font-[family-name:var(--font-inter)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
