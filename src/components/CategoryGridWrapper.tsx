'use client';

import { useState } from 'react';
import CategoryCard from './CategoryCard';
import WaitlistModal from './WaitlistModal';

interface Category {
  id: string;
  name: string;
  iconPath: string;
}

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
            category={category} 
            onClick={() => handleCategoryClick(category)} 
          />
        ))}
      </div>
      <WaitlistModal 
        isOpen={showWaitlist} 
        onClose={() => setShowWaitlist(false)} 
        categoryName={selectedCategory?.name} 
      />
    </>
  );
}
