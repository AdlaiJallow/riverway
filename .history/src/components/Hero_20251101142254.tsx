import { useState, useEffect, useRef } from 'react';
import { Star, Award, Users, MapPin } from 'lucide-react';

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

export default function Hero({ setCurrentPage }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  
  const fullText = 'Authentic Gambian Cuisine, Elevated';
  
  useEffect(() => {
    setIsVisible(true);
    
    // Typewriter effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-amber-50 min-h-screen">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div 
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 bg-gradient-to-r from-amber-100 to-blue-100 text-amber-800 rounded-full text-sm font-semibold tracking-wide uppercase animate-pulse">
                  Welcome to Riverway
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                <span className="inline-block overflow-hidden">
                  {typedText}
                  <span className="animate-pulse text-amber-700">|</span>
                </span>
              </h1>
            </div>

            <div className="space-y-6">
              <p className="text-2xl text-gray-700 leading-relaxed font-light">
                After extensive recipe development, we're back 
                <span className="font-semibold text-amber-700"> stronger and fresher</span> than ever.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Inspired by the vitality and continuity of the <span className="font-semibold text-blue-700">River Gambia</span>, 
                we bring authentic, rooted cuisine that flows with new flavors and experiences.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <button
                onClick={() => setCurrentPage('menu')}
                className="group px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-center relative overflow-hidden"
              >
                <span className="relative z-10">Explore Menu</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button
                onClick={() => setCurrentPage('reservations')}
                className="group px-10 py-4 border-2 border-amber-700 text-amber-700 font-bold rounded-xl hover:bg-gradient-to-r hover:from-amber-700 hover:to-amber-800 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl text-center"
              >
                Make Reservation
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-700 mb-1">15+</div>
                <div className="text-sm text-gray-600">Signature Dishes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700 mb-1">5★</div>
                <div className="text-sm text-gray-600">Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 mb-1">100%</div>
                <div className="text-sm text-gray-600">Fresh Daily</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="relative aspect-square bg-white rounded-2xl overflow-hidden flex items-center justify-center">
                  <img src="/logo copy.jpeg" alt="Riverway Logo" className="w-3/4 h-3/4 object-contain" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Our Story</h3>
                  <p className="text-sm text-gray-600">
                    Connected to The Gambia, a nation defined by the majestic River Gambia that flows from end to end, inspiring vitality and community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
    </div>
  );
}
