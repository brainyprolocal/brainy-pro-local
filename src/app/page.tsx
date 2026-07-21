import { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/data/categoriesData';
import { featuredPros } from '@/data/prosData';
import ProCard from '@/components/ProCard';
import JsonLd from '@/components/JsonLd';
import HeroSearchWrapper from '@/components/HeroSearchWrapper';
import CategoryGridWrapper from '@/components/CategoryGridWrapper';

export const metadata: Metadata = {
  title: 'brAIny pro | Find Trusted Home Service Pros in Central Maryland',
  description: 'Vetted professionals. Verified reviews. Real results for Laurel, Columbia, Ellicott City & beyond.',
};

export default function HomePage() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "brAIny pro",
        "url": "https://brainyprolocal.com",
        "description": "Find Trusted Home Service Pros in Central Maryland"
      },
      {
        "@type": "LocalBusiness",
        "name": "brAIny pro",
        "url": "https://brainyprolocal.com",
        "description": "Vetted professionals. Verified reviews. Real results for Laurel, Columbia, Ellicott City & beyond.",
        "areaServed": ["Laurel", "Columbia", "Ellicott City", "Central Maryland"]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-clean-white font-inter text-trust-navy">
      <JsonLd data={jsonLdData} />
      
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-trust-navy via-connection-blue to-action-accent overflow-hidden px-4 py-20 text-center text-clean-white">
        {/* Animated shapes background class expected in globals.css */}
        <div className="absolute inset-0 z-0 bg-shapes-pattern opacity-20 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold mb-6 drop-shadow-lg leading-tight">
            Find Trusted Home Service Pros in Central Maryland
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl font-light">
            Vetted professionals. Verified reviews. Real results for Laurel, Columbia, Ellicott City & beyond.
          </p>
          <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl overflow-hidden p-1 bg-white/10 backdrop-blur-md">
            <HeroSearchWrapper />
          </div>
        </div>
        
        {/* Scroll indicator arrow */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 2. Category Grid Section */}
      <section className="py-24 px-4 bg-clean-white max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold text-trust-navy mb-4">Popular Home Services</h2>
          <div className="w-24 h-1 bg-action-accent mx-auto rounded-full"></div>
        </div>
        <CategoryGridWrapper categories={categories} />
      </section>

      {/* 3. How It Works Section */}
      <section className="py-24 px-4 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-trust-navy mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-action-accent mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 text-center relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-slate-200 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-slate-50 text-action-accent mb-6 font-bold font-outfit">
                1
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-trust-navy mb-3">🔍 Tell Us What You Need</h3>
              <p className="text-slate-600 text-lg">Describe your project and location</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-slate-50 text-action-accent mb-6 font-bold font-outfit">
                2
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-trust-navy mb-3">✅ We Vet the Best</h3>
              <p className="text-slate-600 text-lg">Our team personally reviews and approves every pro</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-slate-50 text-action-accent mb-6 font-bold font-outfit">
                3
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-trust-navy mb-3">🤝 Get Connected</h3>
              <p className="text-slate-600 text-lg">Receive quotes from the top 3 pros in your area</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Pros Section */}
      <section className="py-24 px-4 bg-clean-white max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-montserrat font-bold text-trust-navy mb-4">Featured Trusted Professionals</h2>
            <div className="w-24 h-1 bg-action-accent rounded-full mb-4"></div>
            <p className="text-slate-500 italic">All professionals are manually vetted by our team</p>
          </div>
          <Link href="/pros" className="text-action-accent font-medium hover:text-connection-blue transition-colors flex items-center gap-2">
            View All Pros
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPros.slice(0, 3).map((pro) => (
            <ProCard key={pro.id} pro={pro} />
          ))}
        </div>
      </section>

      {/* 5. Trust Bar */}
      <section className="bg-trust-navy text-clean-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          <div className="px-4">
            <div className="text-4xl md:text-5xl font-outfit font-bold text-action-accent mb-2">20+</div>
            <div className="text-sm md:text-base font-medium text-white/80 uppercase tracking-wider">Years Experience</div>
          </div>
          <div className="px-4">
            <div className="text-4xl md:text-5xl font-outfit font-bold text-action-accent mb-2">500+</div>
            <div className="text-sm md:text-base font-medium text-white/80 uppercase tracking-wider">Homeowners Served</div>
          </div>
          <div className="px-4">
            <div className="text-4xl md:text-5xl font-outfit font-bold text-action-accent mb-2">MD</div>
            <div className="text-sm md:text-base font-medium text-white/80 uppercase tracking-wider">Central Maryland Focus</div>
          </div>
          <div className="px-4">
            <div className="text-4xl md:text-5xl font-outfit font-bold text-action-accent mb-2">100%</div>
            <div className="text-sm md:text-base font-medium text-white/80 uppercase tracking-wider">Satisfaction Guarantee</div>
          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="bg-connection-blue py-20 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-action-accent rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-trust-navy rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-clean-white mb-6">
            Are You a Home Service Pro?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join Central Maryland's most trusted contractor network. Get exclusive leads, CRM tools, and more.
          </p>
          <Link 
            href="/for-pros" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-connection-blue bg-clean-white rounded-full shadow-xl hover:bg-slate-100 hover:scale-105 transition-all duration-300 gap-3"
          >
            Join the Network
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
