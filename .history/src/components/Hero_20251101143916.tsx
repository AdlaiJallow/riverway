import { useState, useEffect } from 'react';
import { ChefHat, Star, Award, Users, MapPin, Clock } from 'lucide-react';

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

export default function Hero({ setCurrentPage }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const highlights = [
    { icon: Star, text: "5★ Rated Experience", color: "text-yellow-500" },
    { icon: ChefHat, text: "Authentic Recipes", color: "text-amber-600" },
    { icon: Award, text: "Award Winning", color: "text-blue-600" },
    { icon: Users, text: "Community Favorite", color: "text-green-600" }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % highlights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [highlights.length]);
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-amber-50 min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200 to-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-amber-200 to-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Badge */}
            <div className="inline-block">
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-blue-100 rounded-full border border-amber-200">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-amber-800 font-semibold text-sm tracking-wide uppercase">Welcome to Riverway</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                <span className="block text-gray-900 animate-fade-in-up">Authentic</span>
                <span className="block bg-gradient-to-r from-amber-600 via-amber-700 to-blue-600 bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Gambian
                </span>
                <span className="block text-gray-900 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  Cuisine, <span className="text-amber-700">Elevated</span>
                </span>
              </h1>
            </div>

            {/* Rotating Highlights */}
            <div className="h-16 flex items-center">
              <div className="flex items-center space-x-3 transition-all duration-500">
                {highlights.map((highlight, index) => {
                  const Icon = highlight.icon;
                  return (
                    <div 
                      key={index}
                      className={`flex items-center space-x-2 transition-all duration-500 ${
                        currentSlide === index 
                          ? 'opacity-100 scale-100 translate-x-0' 
                          : 'opacity-30 scale-95 translate-x-2'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${highlight.color}`} />
                      <span className="font-semibold text-gray-800">{highlight.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className={`space-y-6 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-xl text-gray-700 leading-relaxed font-light">
                After extensive recipe development, we're back <span className="font-semibold text-amber-700">stronger and fresher</span> than ever. 
                Thoughtfully crafted dishes designed to elevate your dining experience and satisfy every palate.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Inspired by the vitality and continuity of the <span className="font-semibold text-blue-700">River Gambia</span>, 
                we bring authentic, rooted cuisine that flows with new flavors and experiences.
              </p>
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 pt-6 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button
                onClick={() => setCurrentPage('menu')}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-center overflow-hidden"
              >
                <span className="relative z-10">Explore Menu</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => setCurrentPage('reservations')}
                className="group px-8 py-4 border-2 border-amber-600 text-amber-700 font-bold rounded-xl hover:bg-amber-50 hover:border-amber-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-center relative overflow-hidden"
              >
                <span className="relative z-10">Make Reservation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-700 mb-1">15+</div>
                <div className="text-sm text-gray-600 font-medium">Signature Dishes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700 mb-1">100%</div>
                <div className="text-sm text-gray-600 font-medium">Fresh Daily</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700 mb-1">5★</div>
                <div className="text-sm text-gray-600 font-medium">Experience</div>
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
