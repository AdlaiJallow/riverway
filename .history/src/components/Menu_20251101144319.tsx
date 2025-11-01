import { ChefHat, Star, Clock, Award, Utensils, Heart, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Menu() {
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
    <div className="min-h-screen bg-white pt-12 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ChefHat className="w-8 h-8 text-amber-700" />
            <h1 className="text-4xl font-bold text-gray-900">Our Menu</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each dish is thoughtfully crafted with authentic Gambian flavors and fresh ingredients, designed to elevate your dining experience.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <img
              src="/menu.jpeg"
              alt="Restaurant Menu"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
