import { ChefHat, Star, Clock, Award, Heart, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface MenuProps {
  setCurrentPage: (page: string) => void;
}

export default function Menu({ setCurrentPage }: MenuProps) {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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

  const features = [
    { icon: Star, title: "Signature Dishes", description: "Authentic Gambian flavors", color: "text-yellow-500" },
    { icon: Clock, title: "Fresh Daily", description: "Made with love every morning", color: "text-blue-500" },
    { icon: Award, title: "Award Winning", description: "Recognized for excellence", color: "text-purple-500" },
    { icon: Heart, title: "Family Recipes", description: "Passed down generations", color: "text-red-500" }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 pt-16 pb-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-amber-200 to-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200 to-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-gradient-to-br from-green-200 to-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div 
          ref={setRef('header')}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible.header 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-block">
              <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-100 to-blue-100 rounded-full border border-amber-200 shadow-lg">
                <ChefHat className="w-5 h-5 text-amber-700 animate-bounce-gentle" />
                <span className="text-amber-800 font-bold text-sm tracking-wide uppercase">Culinary Excellence</span>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-amber-600 via-amber-700 to-blue-600 bg-clip-text text-transparent animate-fade-in-up">
                  Our Menu
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}></div>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Each dish is thoughtfully crafted with <span className="font-semibold text-amber-700">authentic Gambian flavors</span> and 
              <span className="font-semibold text-blue-700"> fresh ingredients</span>, designed to elevate your dining experience.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div 
          ref={setRef('features')}
          className={`grid md:grid-cols-4 gap-8 mb-16 transition-all duration-1000 delay-300 ${
            isVisible.features 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className={`text-center group cursor-pointer transition-all duration-500 hover:transform hover:-translate-y-2 ${
                  isVisible.features ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${index * 100 + 600}ms` }}
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-blue-200 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 transform group-hover:scale-110"></div>
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-white to-amber-50 border-2 border-amber-100 shadow-lg group-hover:shadow-xl group-hover:border-blue-200 transition-all duration-500">
                    <Icon className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Menu Image Section */}
        <div 
          ref={setRef('menu')}
          className={`transition-all duration-1000 delay-600 ${
            isVisible.menu 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative group max-w-5xl mx-auto">
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full opacity-20 animate-float"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
            
            {/* Menu Card */}
            <div className="relative bg-gradient-to-br from-white via-amber-50 to-blue-50 rounded-3xl p-8 shadow-2xl border border-amber-200 group-hover:shadow-3xl transition-all duration-500">
              {/* Card Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-blue-500 text-white rounded-full shadow-lg mb-4">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-bold text-sm tracking-wide uppercase">Our Signature Collection</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Authentic Gambian Cuisine</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full mx-auto"></div>
              </div>

              {/* Menu Image Container */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img
                  src="/menu.jpeg"
                  alt="Restaurant Menu - Authentic Gambian Cuisine"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                  onLoad={() => setIsImageLoaded(true)}
                />
                
                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1">Traditional Flavors</h3>
                      <p className="text-sm opacity-90">Crafted with authentic spices and fresh ingredients</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Footer */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Experience the rich culinary heritage of The Gambia with every bite
                </p>
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-700">15+</div>
                    <div className="text-sm text-gray-600">Signature Dishes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700">100%</div>
                    <div className="text-sm text-gray-600">Fresh Ingredients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">Daily</div>
                    <div className="text-sm text-gray-600">Made Fresh</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div 
          ref={setRef('cta')}
          className={`text-center mt-16 transition-all duration-1000 delay-900 ${
            isVisible.cta 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="bg-gradient-to-r from-amber-600 to-blue-600 text-white rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Our Flavors?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join us for an authentic culinary journey through The Gambia's finest dishes
            </p>
            <button className="px-10 py-4 bg-white text-amber-700 font-bold text-lg rounded-xl hover:bg-amber-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
              Make a Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
