import { ChefHat, Star, Clock, Users, Award } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Menu() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};
    
    Object.keys(sectionRefs.current).forEach(key => {
      const element = sectionRefs.current[key];
      if (element) {
        observers[key] = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.1 }
        );
        observers[key].observe(element);
      }
    });

    return () => {
      Object.values(observers).forEach((observer: IntersectionObserver) => observer.disconnect());
    };
  }, []);

  const setRef = (key: string) => (el: HTMLElement | null) => {
    sectionRefs.current[key] = el;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div 
          ref={setRef('header')}
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-6 py-3 bg-gradient-to-r from-amber-100 to-blue-100 text-amber-800 rounded-full text-sm font-bold tracking-wide uppercase">
                Discover Our Flavors
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <ChefHat className="w-12 h-12 text-amber-700 animate-bounce" />
                <div className="absolute -inset-2 bg-amber-200 rounded-full blur-lg opacity-50 animate-pulse"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                Our <span className="bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">Menu</span>
              </h1>
            </div>
            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Each dish is thoughtfully crafted with <span className="font-semibold text-amber-700">authentic Gambian flavors</span> and 
              <span className="font-semibold text-blue-700"> fresh ingredients</span>, designed to elevate your dining experience.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <div className="flex items-center space-x-2 px-4 py-2 bg-amber-100 rounded-full">
                <Star className="w-5 h-5 text-amber-600 fill-current" />
                <span className="text-amber-800 font-semibold">Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-semibold">Fresh Daily</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-full">
                <Award className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-semibold">Authentic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Image Section */}
        <div 
          ref={setRef('menu')}
          className={`flex justify-center transition-all duration-1000 delay-300 ${
            isVisible.menu ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="w-full max-w-5xl relative group">
            {/* Animated background */}
            <div className="absolute -inset-8 bg-gradient-to-br from-amber-200 via-blue-100 to-amber-100 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse"></div>
            
            {/* Menu container */}
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/menu.jpeg"
                  alt="Restaurant Menu"
                  className={`w-full h-auto transition-all duration-700 transform group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                
                {/* Loading placeholder */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
                    <ChefHat className="w-16 h-16 text-gray-400 animate-bounce" />
                  </div>
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Menu info */}
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Complete Menu Selection</h3>
                <p className="text-gray-600 mb-6">
                  Explore our full range of authentic Gambian dishes, from traditional favorites to modern interpretations.
                </p>
                
                <div className="flex justify-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Serves 1-4 people</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>15-25 min prep</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>Chef's selection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div 
          ref={setRef('cta')}
          className={`text-center mt-16 transition-all duration-1000 delay-600 ${
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-r from-amber-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Experience Authentic Flavors?</h3>
            <p className="text-amber-100 mb-6">Make a reservation and let our chefs take you on a culinary journey through Gambian cuisine.</p>
            <button className="px-8 py-3 bg-white text-amber-700 font-semibold rounded-lg hover:bg-amber-50 transition-colors transform hover:-translate-y-1 hover:shadow-lg">
              Book Your Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
