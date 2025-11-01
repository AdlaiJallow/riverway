import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About' },
    { id: 'orders', label: 'Order Now' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer p-2 -m-2 touch-target" onClick={() => setCurrentPage('home')}>
            <img src="/logo copy.jpeg" alt="Riverway Logo" className="h-8 sm:h-10 w-8 sm:w-10 object-contain" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">Riverway</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-amber-700'
                    : 'text-gray-600 hover:text-amber-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-gray-600 hover:text-amber-700 transition-colors touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-md transition-colors touch-target ${
                    currentPage === item.id
                      ? 'text-amber-700 bg-amber-50'
                      : 'text-gray-600 hover:text-amber-700 hover:bg-amber-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
