'use client';

import { useState } from 'react';
import CategoryCard from './CategoryCard';
import WaitlistModal from './WaitlistModal';
import { Category } from '@/data/categoriesData';

interface Props {
  categories: Category[];
}

export default function CategoryGridWrapper({ categories }: Props) {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setShowWaitlist(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {categories.slice(0, 8).map((category) => (
          <CategoryCard 
            key={category.id} 
            name={category.name}
            description={category.description}
            icon={
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d={category.icon} />
              </svg>
            }
            onClick={() => handleCategoryClick(category)} 
          />
        ))}
      </div>
      <WaitlistModal 
        isOpen={showWaitlist} 
        onClose={() => setShowWaitlist(false)} 
        category={selectedCategory?.name || 'Home Service'} 
      />
    </>
  );
}
