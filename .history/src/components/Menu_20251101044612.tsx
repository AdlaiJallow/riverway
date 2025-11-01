import { ChefHat } from 'lucide-react';

export default function Menu() {
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
