export interface Pro {
  id: string;
  name: string;
  businessName: string;
  trade: string;
  rating: number;
  reviewCount: number;
  yearsInBusiness: number;
  city: string;
  verified: boolean;
  specialties: string[];
}

export const featuredPros: Pro[] = [
  {
    id: 'pro-1',
    name: 'David Miller',
    businessName: 'Miller & Sons Plumbing',
    trade: 'Plumbing',
    rating: 4.9,
    reviewCount: 142,
    yearsInBusiness: 15,
    city: 'Columbia, MD',
    verified: true,
    specialties: ['Water Heaters', 'Pipe Repair', 'Drain Cleaning']
  },
  {
    id: 'pro-2',
    name: 'Sarah Jenkins',
    businessName: 'Bright Spark Electrical Services',
    trade: 'Electrical',
    rating: 4.8,
    reviewCount: 98,
    yearsInBusiness: 8,
    city: 'Ellicott City, MD',
    verified: true,
    specialties: ['Panel Upgrades', 'Lighting Install', 'Smart Home Setup']
  },
  {
    id: 'pro-3',
    name: 'Marcus Johnson',
    businessName: 'Patuxent Climate Control',
    trade: 'HVAC',
    rating: 4.9,
    reviewCount: 215,
    yearsInBusiness: 22,
    city: 'Laurel, MD',
    verified: true,
    specialties: ['AC Repair', 'Furnace Install', 'Duct Cleaning']
  },
  {
    id: 'pro-4',
    name: 'Elena Rodriguez',
    businessName: 'Green Leaf Landscaping of Maryland',
    trade: 'Landscaping',
    rating: 4.7,
    reviewCount: 84,
    yearsInBusiness: 12,
    city: 'Clarksville, MD',
    verified: true,
    specialties: ['Lawn Care', 'Hardscaping', 'Seasonal Cleanup']
  },
  {
    id: 'pro-5',
    name: 'James Wilson',
    businessName: 'Chesapeake Roofing Pros',
    trade: 'Roofing',
    rating: 5.0,
    reviewCount: 310,
    yearsInBusiness: 18,
    city: 'Annapolis, MD',
    verified: true,
    specialties: ['Roof Replacement', 'Storm Damage', 'Gutters']
  },
  {
    id: 'pro-6',
    name: 'Michael Thompson',
    businessName: 'Howard County Custom Painters',
    trade: 'Painting',
    rating: 4.8,
    reviewCount: 126,
    yearsInBusiness: 10,
    city: 'Savage, MD',
    verified: true,
    specialties: ['Interior Painting', 'Exterior Painting', 'Cabinet Refinishing']
  }
];
