import { useState, useEffect } from 'react';
import { ChefHat, Star, Award, Users } from 'lucide-react';

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
        <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-gradient-to-br from-blue-200 to-blue-100 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 sm:opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-br from-amber-200 to-amber-100 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 sm:opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 sm:left-1/3 w-40 sm:w-64 h-40 sm:h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl sm:blur-3xl opacity-15 sm:opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Badge */}
            <div className="inline-block">
              <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-amber-100 to-blue-100 rounded-full border border-amber-200">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-amber-800 font-semibold text-xs sm:text-sm tracking-wide uppercase">Welcome to Riverway</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
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
            <div className="h-12 sm:h-16 flex items-center">
              <div className="flex items-center space-x-2 sm:space-x-3 transition-all duration-500 overflow-x-auto">
                {highlights.map((highlight, index) => {
                  const Icon = highlight.icon;
                  return (
                    <div 
                      key={index}
                      className={`flex items-center space-x-1 sm:space-x-2 transition-all duration-500 whitespace-nowrap ${
                        currentSlide === index 
                          ? 'opacity-100 scale-100 translate-x-0' 
                          : 'opacity-30 scale-95 translate-x-2'
                      }`}
                    >
                      <Icon className={`w-4 sm:w-6 h-4 sm:h-6 ${highlight.color}`} />
                      <span className="font-semibold text-gray-800 text-sm sm:text-base">{highlight.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className={`space-y-6 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-light">
                After extensive recipe development, we're back <span className="font-semibold text-amber-700">stronger and fresher</span> than ever. 
                Thoughtfully crafted dishes designed to elevate your dining experience and satisfy every palate.
              </p>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Inspired by the vitality and continuity of the <span className="font-semibold text-blue-700">River Gambia</span>, 
                we bring authentic, rooted cuisine that flows with new flavors and experiences.
              </p>
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button
                onClick={() => setCurrentPage('menu')}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl text-center overflow-hidden text-sm sm:text-base"
              >
                <span className="relative z-10">Explore Menu</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => setCurrentPage('orders')}
                className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-amber-600 text-amber-700 font-bold rounded-xl hover:bg-amber-50 hover:border-amber-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-center relative overflow-hidden text-sm sm:text-base"
              >
                <span className="relative z-10">Order Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-200 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-amber-700 mb-1">15+</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Signature Dishes</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-700 mb-1">100%</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Fresh Daily</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-700 mb-1">5★</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Experience</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className={`relative transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {/* Main Card */}
            <div className="relative group">
              {/* Animated Background Glow */}
              <div className="absolute -inset-8 bg-gradient-to-br from-blue-200 via-amber-100 to-blue-100 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500 animate-pulse-glow"></div>
              
              {/* Card Content */}
              <div className="relative bg-gradient-to-br from-white via-blue-50 to-amber-50 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-blue-100 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Decorative Elements */}
                <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-amber-400 to-blue-500 rounded-full opacity-10 animate-spin" style={{ animationDuration: '10s' }}></div>
                <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-amber-500 rounded-full opacity-10 animate-float"></div>

                <div className="relative z-10 space-y-8">
                  {/* Logo Section */}
                  <div className="relative group/logo">
                    <div className="relative aspect-square bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden flex items-center justify-center shadow-lg border-2 border-blue-100 group-hover/logo:border-amber-200 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-blue-50 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500"></div>
                      <img 
                        src="/logo copy.jpeg" 
                        alt="Riverway Logo" 
                        className="w-4/5 h-4/5 object-contain relative z-10 transform group-hover/logo:scale-110 transition-transform duration-500" 
                      />
                    </div>
                  </div>

                  {/* Story Section */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-blue-100 rounded-full border border-amber-200 mb-4">
                        <Star className="w-4 h-4 text-amber-600" />
                        <span className="text-amber-800 font-semibold text-sm">Our Heritage</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">The Riverway Story</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full mx-auto mb-6"></div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed text-center">
                      Connected to The Gambia, a nation defined by the majestic 
                      <span className="font-semibold text-blue-700"> River Gambia</span> that flows from end to end, 
                      inspiring <span className="font-semibold text-amber-700">vitality</span> and 
                      <span className="font-semibold text-green-700"> community</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Action Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 transform rotate-3 hover:rotate-0 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">Open Now</span>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-4 shadow-xl transform -rotate-3 hover:rotate-0 transition-all duration-300">
              <div className="text-center">
                <div className="text-lg font-bold">New!</div>
                <div className="text-xs opacity-90">Menu Items</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
