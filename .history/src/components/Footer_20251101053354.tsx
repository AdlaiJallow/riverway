import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo copy.jpeg" alt="Riverway Logo" className="h-10 w-10 object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Authentic Gambian cuisine, thoughtfully crafted and inspired by tradition.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="text-gray-400 hover:text-amber-700 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('menu')}
                  className="text-gray-400 hover:text-amber-700 transition-colors"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="text-gray-400 hover:text-amber-700 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('reservations')}
                  className="text-gray-400 hover:text-amber-700 transition-colors"
                >
                  Reservations
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Hours</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>Sat & Sun: 11am - 10pm</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>Weekdays: Closed</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400 hover:text-amber-700 transition-colors">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Brusubi Phase 2, Opposite Police Station</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 hover:text-amber-700 transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+220 3939528 / +220 9957606</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 hover:text-amber-700 transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@riverway.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2025 Riverway. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-amber-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
