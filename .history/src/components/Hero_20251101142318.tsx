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

          <div 
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-blue-200 via-amber-100 to-blue-100 rounded-3xl blur-2xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-white via-blue-50 to-amber-50 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 group">
              
              {/* Floating decorative elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-amber-400 to-blue-500 rounded-full opacity-20 animate-float"></div>
              <div className="absolute bottom-8 left-6 w-8 h-8 bg-gradient-to-br from-blue-400 to-amber-500 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
              
              <div className="space-y-8 relative z-10">
                <div className="relative aspect-square bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden flex items-center justify-center shadow-inner group-hover:shadow-lg transition-shadow duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-blue-100/20 group-hover:from-amber-200/30 group-hover:to-blue-200/30 transition-all duration-500"></div>
                  <img 
                    src="/logo copy.jpeg" 
                    alt="Riverway Logo" 
                    className="w-4/5 h-4/5 object-contain transform group-hover:scale-105 transition-transform duration-500 relative z-10" 
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors duration-300">
                      Our Story
                    </h3>
                    <div className="flex space-x-1">
                      <Star className="w-5 h-5 text-amber-500 fill-current" />
                      <Star className="w-5 h-5 text-amber-500 fill-current" />
                      <Star className="w-5 h-5 text-amber-500 fill-current" />
                      <Star className="w-5 h-5 text-amber-500 fill-current" />
                      <Star className="w-5 h-5 text-amber-500 fill-current" />
                    </div>
                  </div>
                  
                  <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-blue-400 rounded-full group-hover:w-24 transition-all duration-500"></div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Connected to <span className="font-semibold text-blue-700">The Gambia</span>, 
                    a nation defined by the majestic River Gambia that flows from end to end, 
                    inspiring <span className="font-semibold text-amber-700">vitality and community</span>.
                  </p>

                  <div className="flex items-center justify-between pt-4 text-sm">
                    <div className="flex items-center space-x-2 text-amber-700">
                      <MapPin className="w-4 h-4" />
                      <span>The Gambia</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-700">
                      <Award className="w-4 h-4" />
                      <span>Authentic</span>
                    </div>
                  </div>
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
