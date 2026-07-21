import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-trust-navy text-gray-300 pt-16 pb-8 border-t-[4px] border-t-connection-blue">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <span className="font-[family-name:var(--font-outfit)] text-3xl font-bold text-clean-white">
              brAIny pro
            </span>
            <p className="text-sm font-medium text-blue-200">
              Build trust. Buy back time. Keep your clients for life.
            </p>
            <p className="text-sm leading-relaxed text-gray-400">
              brAIny pro connects Central Maryland homeowners with vetted, trusted local home service professionals to make finding help stress-free and reliable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-clean-white font-semibold text-lg mb-4 font-[family-name:var(--font-montserrat)]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-action-accent transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link href="/find-a-pro" className="hover:text-action-accent transition-colors duration-200">Find a Pro</Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-action-accent transition-colors duration-200">Local Guides</Link>
              </li>
              <li>
                <Link href="/for-pros" className="hover:text-action-accent transition-colors duration-200">For Pros</Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-clean-white font-semibold text-lg mb-4 font-[family-name:var(--font-montserrat)]">
              Service Areas
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              <li>Laurel</li>
              <li>Columbia</li>
              <li>Ellicott City</li>
              <li>Clarksville</li>
              <li>Highland</li>
              <li>Fulton</li>
              <li>Savage</li>
              <li>Jessup</li>
              <li>Elkridge</li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="text-clean-white font-semibold text-lg mb-4 font-[family-name:var(--font-montserrat)]">
              Contact Us
            </h3>
            <ul className="space-y-3 mb-6 text-sm">
              <li>
                <a href="mailto:hello@brainyprolocal.com" className="hover:text-clean-white transition-colors">
                  hello@brainyprolocal.com
                </a>
              </li>
              <li>
                <a href="tel:+15555555555" className="hover:text-clean-white transition-colors">
                  (555) 555-5555
                </a>
              </li>
            </ul>
            <div className="flex space-x-4">
              {/* Social Placeholders */}
              <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-action-accent transition-colors" aria-label="Facebook">
                <span className="text-xs text-white">FB</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-action-accent transition-colors" aria-label="Twitter">
                <span className="text-xs text-white">TW</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-action-accent transition-colors" aria-label="Instagram">
                <span className="text-xs text-white">IG</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-sm text-center text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} brAIny pro. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with 20+ years of home service experience.</p>
        </div>
      </div>
    </footer>
  );
}
