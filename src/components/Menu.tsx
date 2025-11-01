import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ChefHat } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
}

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('category');

        if (error) throw error;
        setMenuItems(data || []);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

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

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto"></div>
          </div>
        ) : (
          <>
            {selectedCategory === 'all' && (
              <div className="space-y-16">
                {Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-amber-700 inline-block">
                      {category}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      {items.map((item) => (
                        <div key={item.id} className="group">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                              {item.name}
                            </h3>
                            <span className="text-lg font-bold text-amber-700 ml-4 whitespace-nowrap">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
