import { Waves, Heart, Leaf } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
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
  const values = [
    {
      icon: Waves,
      title: 'Continuity',
      description: 'Like the River Gambia flowing from end to end, our cuisine flows with tradition and evolution.',
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'Built on the sense of togetherness and shared experiences that define Gambian culture.',
    },
    {
      icon: Leaf,
      title: 'Authenticity',
      description: 'Rooted in genuine traditions, ever-flowing with fresh flavors and innovative experiences.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 pt-16 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div 
          ref={setRef('hero')}
          className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24 transition-all duration-1000 ${
            isVisible.hero 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold tracking-wide uppercase">
                  Our Journey
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Our <span className="bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">Story</span>
              </h1>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-light">
                After a period of rebranding and extensive recipe development, we are delighted to announce our return, 
                <span className="font-semibold text-amber-700"> stronger, fresher, and more inspired</span> than before.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Our renewed menu features thoughtfully crafted dishes designed to elevate your dining experience and satisfy every palate.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2 text-amber-700">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Authentic Flavors</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="font-medium">Fresh Ingredients</span>
              </div>
              <div className="flex items-center space-x-2 text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="font-medium">Cultural Heritage</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-6 bg-gradient-to-br from-blue-200 via-amber-100 to-blue-100 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-white via-blue-50 to-amber-50 rounded-3xl p-10 border border-blue-200 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-blue-500 rounded-full opacity-20 animate-spin" style={{ animationDuration: '8s' }}></div>
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full mb-4"></div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">The Riverway Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  <span className="font-bold text-2xl text-amber-700">Riverway</span> reflects our deep connection to The Gambia. 
                  As a nation defined by the majestic <span className="font-semibold text-blue-700">River Gambia</span> that flows from end to end, 
                  we are inspired by its <span className="italic">vitality</span>, <span className="italic">continuity</span>, 
                  and the <span className="font-semibold text-amber-600">sense of community</span> it brings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div 
          ref={setRef('values')}
          className={`mb-24 transition-all duration-1000 delay-300 ${
            isVisible.values 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three pillars that guide everything we do at Riverway
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index} 
                  className={`text-center group cursor-pointer transition-all duration-500 hover:transform hover:-translate-y-4 ${
                    isVisible.values ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: `${index * 200 + 400}ms` }}
                >
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-amber-200 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 transform group-hover:scale-110"></div>
                    <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 shadow-lg group-hover:shadow-2xl group-hover:border-amber-200 transition-all duration-500 group-hover:rotate-12">
                      <Icon className="w-10 h-10 text-amber-700 group-hover:text-blue-700 transition-colors duration-300 group-hover:scale-110" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-blue-400 rounded-full mx-auto group-hover:w-20 transition-all duration-500"></div>
                    <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Approach Section */}
        <div 
          ref={setRef('approach')}
          className={`relative transition-all duration-1000 delay-600 ${
            isVisible.approach 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-amber-900 rounded-3xl p-16 shadow-2xl">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute top-10 left-10 w-32 h-32 bg-amber-400 rounded-full opacity-10 animate-float"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-400 rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full opacity-5 animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                  <span className="px-6 py-3 bg-amber-500 text-white rounded-full text-sm font-bold tracking-wide uppercase shadow-lg">
                    Our Philosophy
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  Our <span className="text-amber-300">Approach</span>
                </h2>
                
                <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-blue-400 rounded-full mx-auto mb-8"></div>
                
                <p className="text-xl md:text-2xl text-blue-100 leading-relaxed mb-8 font-light">
                  Riverway embodies the spirit of <span className="font-semibold text-amber-300">authenticity</span>, 
                  rooted in tradition, and ever-flowing with new flavors and experiences.
                </p>
                
                <p className="text-lg text-blue-200 leading-relaxed max-w-3xl mx-auto">
                  Every dish we serve is a celebration of Gambian heritage, prepared with passion and presented with pride. 
                  We invite you to experience the journey of tastes that tell the story of our nation's rich culinary heritage.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-300 mb-2">15+</div>
                    <div className="text-blue-200">Traditional Recipes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-300 mb-2">100%</div>
                    <div className="text-blue-200">Fresh Ingredients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-300 mb-2">5★</div>
                    <div className="text-blue-200">Customer Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
