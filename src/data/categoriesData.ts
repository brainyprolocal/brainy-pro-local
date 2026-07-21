export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string; // SVG path data for the icon (simple d attribute for a path)
  slug: string;
}

export const categories: Category[] = [
  {
    id: 'cat-plumbing',
    name: 'Plumbing',
    description: 'Expert local plumbers for repairs, installations, and emergencies.',
    icon: 'M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 19.5c-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5 7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5zM11.25 7.5h1.5v4.5h-1.5zM11.25 13.5h1.5v1.5h-1.5z',
    slug: 'plumbing'
  },
  {
    id: 'cat-electrical',
    name: 'Electrical',
    description: 'Licensed electricians keeping your home safely powered up.',
    icon: 'M13.5 2.25l-7.5 12h5.25v7.5l7.5-12h-5.25v-7.5z',
    slug: 'electrical'
  },
  {
    id: 'cat-hvac',
    name: 'HVAC',
    description: 'Heating and cooling professionals for year-round comfort.',
    icon: 'M12 2.25a9.75 9.75 0 00-9.75 9.75c0 5.385 4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75a9.75 9.75 0 00-9.75-9.75zm0 18A8.25 8.25 0 1112 3.75a8.25 8.25 0 010 16.5zM8.25 12a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z',
    slug: 'hvac'
  },
  {
    id: 'cat-landscaping',
    name: 'Landscaping',
    description: 'Lawn care and outdoor design to elevate your curb appeal.',
    icon: 'M11.25 21v-6.375l-4.5 2.625-1.5-2.625 6-3.375V6.75l-4.5 2.625-1.5-2.625 6-3.375 6 3.375-1.5 2.625-4.5-2.625v4.5l6 3.375-1.5 2.625-4.5-2.625V21h-1.5z',
    slug: 'landscaping'
  },
  {
    id: 'cat-roofing',
    name: 'Roofing',
    description: 'Top-rated roofers protecting your home from the elements.',
    icon: 'M2.25 12l9.75-7.5 9.75 7.5M4.5 10.5v9h15v-9M9 19.5v-6h6v6',
    slug: 'roofing'
  },
  {
    id: 'cat-carpentry',
    name: 'Carpentry',
    description: 'Skilled carpenters for custom woodwork and renovations.',
    icon: 'M9 21H5.25A2.25 2.25 0 013 18.75V15m3-12h12.75A2.25 2.25 0 0121 5.25v3.75M12 21v-3.75m0 3.75h3.75M12 21H8.25M21 12h-3.75m0 0H12m5.25 0V8.25m0 3.75v3.75',
    slug: 'carpentry'
  },
  {
    id: 'cat-painting',
    name: 'Painting',
    description: 'Interior and exterior painters bringing color to your space.',
    icon: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.879-6.873a1.5 1.5 0 00-1.4-2.31h-1.5a1.5 1.5 0 00-1.4 2.31l-3.879 6.873a15.993 15.993 0 00-4.648 4.764m0 0l-3.42-3.42',
    slug: 'painting'
  },
  {
    id: 'cat-cleaning',
    name: 'Cleaning',
    description: 'Professional cleaners for a spotless and healthy home.',
    icon: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6.75h.75m-.75 3h.75m-.75 3h.75m3-6.75h.75m-.75 3h.75m-.75 3h.75',
    slug: 'cleaning'
  }
];
