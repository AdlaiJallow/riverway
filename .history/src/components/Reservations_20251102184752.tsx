import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, Phone, User, MessageCircle, ChefHat, Star, Sparkles, MapPin, Info } from 'lucide-react';
import { sendReservationEmail, sendWhatsAppNotification } from '../lib/emailService';

export default function Reservations() {
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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    orderType: 'delivery' as 'delivery' | 'pickup',
    selectedMenuItems: [] as string[],
    menuQuantities: {} as Record<string, number>,
    specialRequests: '',
  });

  // Riverway Restaurant Menu Items (from menu copy.jpeg)
  const menuItems = [
    // Grilled & Main Dishes
    { 
      id: 'grilled-fish', 
      name: 'Grilled Fish', 
      category: 'Grilled & Mains', 
      price: 350,
      description: 'Oven-grilled fish with fries, coleslaw, onion sauce',
      availability: 'Only by order'
    },
    { 
      id: 'grilled-chicken', 
      name: 'Grilled Chicken', 
      category: 'Grilled & Mains', 
      price: 250,
      description: 'Juicy grilled chicken leg with fries, coleslaw, spaghetti and BBQ onion sauce',
      availability: 'Only by order'
    },
    { 
      id: 'fried-fish', 
      name: 'Fried Fish', 
      category: 'Grilled & Mains', 
      price: 300,
      description: 'Fried fish with fries, coleslaw, onion sauce and spaghetti'
    },
    { 
      id: 'cheesy-potato-chicken-balls', 
      name: 'Cheesy Potato Chicken Balls', 
      category: 'Grilled & Mains', 
      price: 250,
      description: 'Spiced chicken mixed with boiled potatoes, stuffed with cheese and breaded. Deep fried and served with fries'
    },
    { 
      id: 'loaded-fries', 
      name: 'Loaded Fries', 
      category: 'Grilled & Mains', 
      price: 350,
      description: 'Crunchy fries with bechamel, choice of protein and cheese sauce',
      availability: 'Only by order'
    },
    
    // Wraps
    { 
      id: 'wrap-regular', 
      name: 'Wrap', 
      category: 'Wraps', 
      price: 200,
      description: 'Protein of choice with fries, coleslaw, bechamel sauce and pickled onions, wrapped in tortilla'
    },
    { 
      id: 'wrap-cheese', 
      name: 'Wrap with Cheese', 
      category: 'Wraps', 
      price: 250,
      description: 'Protein of choice with fries, coleslaw, bechamel sauce and pickled onions, wrapped in tortilla, with cheese'
    },
    
    // Weekend Specials
    { 
      id: 'lasagna', 
      name: 'Lasagna', 
      category: 'Weekend Specials', 
      price: 450,
      description: 'Lasagne sheets layered with savoury bolognese sauce, bechamel sauce and cheese',
      availability: 'Sunday only'
    },
    { 
      id: 'mac-cheese', 
      name: 'Mac & Cheese', 
      category: 'Weekend Specials', 
      price: 500,
      description: 'Three-cheese mac & cheese served with fried wings',
      availability: 'Saturday only'
    },
    
    // Desserts
    { 
      id: 'vanilla-cake', 
      name: 'Vanilla Cake', 
      category: 'Desserts', 
      price: 250,
      description: 'Moist vanilla cake with vanilla buttercream, topped with caramel'
    },
    { 
      id: 'chocolate-cake', 
      name: 'Chocolate Cake', 
      category: 'Desserts', 
      price: 250,
      description: 'Moist chocolate cake, soaked with chocolate milk and topped with vanilla whipped cream'
    },
    { 
      id: 'churros', 
      name: 'Churros', 
      category: 'Desserts', 
      price: 100,
      description: 'Fresh fried churros, coated in cinnamon sugar with a side of chocolate'
    },
    
    // Beverages
    { 
      id: 'wonjo', 
      name: 'Wonjo', 
      category: 'Beverages', 
      price: 50,
      description: 'Traditional ginger drink'
    },
    { 
      id: 'ginger', 
      name: 'Ginger', 
      category: 'Beverages', 
      price: 50,
      description: 'Fresh ginger drink'
    },
  ];

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMenuSelection = (itemId: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedMenuItems.includes(itemId);
      const newSelection = isSelected
        ? prev.selectedMenuItems.filter(id => id !== itemId)
        : [...prev.selectedMenuItems, itemId];
      
      const newQuantities = { ...prev.menuQuantities };
      if (isSelected) {
        delete newQuantities[itemId];
      } else {
        newQuantities[itemId] = 1;
      }
      
      return {
        ...prev,
        selectedMenuItems: newSelection,
        menuQuantities: newQuantities,
      };
    });
  };

  const updateQuantity = (itemId: string, change: number) => {
    setFormData(prev => {
      const currentQty = prev.menuQuantities[itemId] || 0;
      const newQty = Math.max(0, currentQty + change);
      
      const newQuantities = { ...prev.menuQuantities };
      const newSelection = [...prev.selectedMenuItems];
      
      if (newQty === 0) {
        delete newQuantities[itemId];
        const index = newSelection.indexOf(itemId);
        if (index > -1) newSelection.splice(index, 1);
      } else {
        newQuantities[itemId] = newQty;
        if (!newSelection.includes(itemId)) {
          newSelection.push(itemId);
        }
      }
      
      return {
        ...prev,
        selectedMenuItems: newSelection,
        menuQuantities: newQuantities,
      };
    });
  };

  const calculateTotal = (): number => {
    return formData.selectedMenuItems.reduce((total, itemId) => {
      const item = menuItems.find(menu => menu.id === itemId);
      const quantity = formData.menuQuantities[itemId] || 1;
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getSelectedItemsWithPrices = () => {
    return formData.selectedMenuItems.map(itemId => {
      const item = menuItems.find(menu => menu.id === itemId);
      const quantity = formData.menuQuantities[itemId] || 1;
      return item ? { name: item.name, price: item.price, quantity } : null;
    }).filter(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Process order submission (email functionality disabled)
      const totalAmount = calculateTotal();
      const selectedItemsWithPrices = getSelectedItemsWithPrices();
      const emailSent = await sendReservationEmail(formData, totalAmount, selectedItemsWithPrices as Array<{name: string, price: number}>);

      if (!emailSent) {
        throw new Error('Order submission failed');
      }

      // Also try to save to Supabase if configured (optional backup)
      try {
        const { error: submitError } = await supabase
          .from('orders')
          .insert([
            {
              name: formData.name,
              phone: formData.phone,
              address: formData.address,
              order_type: formData.orderType,
              selected_menu_items: formData.selectedMenuItems.join(', '),
              special_requests: formData.specialRequests,
              total_amount: calculateTotal(),
            },
          ]);

        if (submitError) {
          console.warn('Supabase save failed (using mock):', submitError);
        }
      } catch (dbError) {
        console.warn('Database save failed, but order was processed:', dbError);
      }

      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        address: '',
        orderType: 'delivery' as 'delivery' | 'pickup',
        selectedMenuItems: [],
        menuQuantities: {},
        specialRequests: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to submit order. Please try again or call us directly at +220 3939528.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Alternative submission via WhatsApp
  const handleWhatsAppSubmit = () => {
    if (!formData.name || !formData.phone || !formData.address || formData.selectedMenuItems.length === 0) {
      setError('Please fill in all required fields and select at least one menu item before sending via WhatsApp.');
      return;
    }
    
    setError('');
    const totalAmount = calculateTotal();
    const selectedItemsWithPrices = getSelectedItemsWithPrices();
    sendWhatsAppNotification(formData, totalAmount, selectedItemsWithPrices as Array<{name: string, price: number}>);
    
    // Show success message and clear form
    setSubmitted(true);
    setFormData({
      name: '',
      phone: '',
      address: '',
      orderType: 'delivery' as 'delivery' | 'pickup',
      selectedMenuItems: [],
      menuQuantities: {},
      specialRequests: '',
    });
    setTimeout(() => setSubmitted(false), 5000);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 pt-16 pb-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-amber-200 to-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-200 to-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-green-200 to-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                <span className="text-amber-800 font-bold text-sm tracking-wide uppercase">Order Your Favorites</span>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-amber-600 via-amber-700 to-blue-600 bg-clip-text text-transparent animate-fade-in-up">
                  Place Your
                </span>
                <span className="block text-gray-900 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Order
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}></div>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              Savor the authentic flavors of The Gambia with <span className="font-semibold text-amber-700">Riverway's</span> delicious cuisine. 
              Order online for pickup or delivery and enjoy our signature dishes inspired by the <span className="font-semibold text-blue-700">River Gambia's</span> rich culinary heritage.
            </p>
          </div>
        </div>        <div 
          ref={setRef('form')}
          className={`relative transition-all duration-1000 delay-300 ${
            isVisible.form 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Decorative Elements */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full opacity-20 animate-float"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative bg-gradient-to-br from-white via-amber-50 to-blue-50 rounded-3xl shadow-2xl border border-amber-200 p-4 sm:p-6 lg:p-10">
          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✅ Thank you for your order! Your order has been sent directly to our kitchen team at adlaijallow@gmail.com. We'll contact you within 15 minutes to confirm your order and provide estimated preparation time.
              </p>
              <p className="text-green-700 text-sm mt-2">
                Order Total: <span className="font-bold">D{calculateTotal()}</span> • Estimated time: {formData.orderType === 'delivery' ? '30-45 minutes' : '15-20 minutes'}
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div 
              ref={setRef('personal')}
              className={`transition-all duration-700 delay-500 ${
                isVisible.personal 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Contact & Delivery Information</h3>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full"></div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="group">
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-amber-100 to-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-amber-700" />
                      </div>
                      Full Name
                    </div>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 outline-none transition-all duration-300 hover:border-amber-300 bg-white shadow-sm text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-amber-100 to-blue-100 rounded-full flex items-center justify-center">
                        <Phone className="w-3 h-3 text-amber-700" />
                      </div>
                      Phone Number
                    </div>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 outline-none transition-all duration-300 hover:border-amber-300 bg-white shadow-sm"
                    placeholder="+220 XXX XXXX"
                  />
                </div>



                <div className="group">
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-amber-100 to-blue-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-3 h-3 text-amber-700" />
                      </div>
                      Delivery Address
                    </div>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 outline-none transition-all duration-300 hover:border-amber-300 bg-white shadow-sm"
                    placeholder="Enter your delivery address"
                  />
                  <p className="text-sm text-amber-700 mt-2 font-medium">� We deliver within 10km of our location</p>
                </div>

                <div className="group">
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-amber-100 to-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-3 h-3 text-amber-700" />
                      </div>
                      Order Type
                    </div>
                  </label>
                  <select
                    name="orderType"
                    value={formData.orderType || 'delivery'}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 outline-none transition-all duration-300 hover:border-amber-300 bg-white shadow-sm"
                  >
                    <option value="delivery">Delivery (30-45 minutes)</option>
                    <option value="pickup">Pickup (15-20 minutes)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Menu Selection Section */}
            <div 
              ref={setRef('menu')}
              className={`transition-all duration-700 delay-700 ${
                isVisible.menu 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full flex items-center justify-center">
                    <ChefHat className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Select Your Items</h3>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">Required</span>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full mb-4"></div>
              </div>
              <div className="mb-4 space-y-2">
                <p className="text-sm text-gray-600">
                  Select the dishes you'd like to order. We'll prepare them fresh for pickup or delivery.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800 font-medium mb-1">📅 Special Availability:</p>
                  <p className="text-xs text-blue-700">
                    • Lasagna - Available Sundays only • Mac & Cheese - Available Saturdays only • Some items are only available by order (please call ahead)
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Group menu items by category */}
                {['Grilled & Mains', 'Wraps', 'Weekend Specials', 'Desserts', 'Beverages'].map(category => {
                  const categoryItems = menuItems.filter(item => item.category === category);
                  
                  if (categoryItems.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h4 className="font-semibold text-gray-900 mb-3 text-base border-b border-amber-200 pb-2">{category}</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {categoryItems.map(item => {
                          const quantity = formData.menuQuantities[item.id] || 0;
                          const isSelected = quantity > 0;
                          
                          return (
                            <div
                              key={item.id}
                              className={`flex flex-col p-3 sm:p-4 border rounded-lg transition-all ${
                                isSelected
                                  ? 'border-amber-500 bg-amber-50 text-amber-900'
                                  : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 pr-3">
                                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                    <div className="flex-1">
                                      <span className="text-sm sm:text-base font-semibold text-gray-900">{item.name}</span>
                                      {item.availability && (
                                        <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                          {item.availability}
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-sm sm:text-base font-bold text-amber-700 whitespace-nowrap mt-1 sm:mt-0">D{item.price}</span>
                                  </div>
                                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                                
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3 ml-2">
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.id, -1)}
                                    disabled={quantity === 0}
                                    className="w-8 h-8 rounded-full border border-amber-300 bg-white flex items-center justify-center text-amber-600 hover:bg-amber-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all touch-target"
                                  >
                                    -
                                  </button>
                                  <span className="min-w-[2rem] text-center font-semibold text-gray-900">
                                    {quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-8 h-8 rounded-full border border-amber-300 bg-amber-500 flex items-center justify-center text-white hover:bg-amber-600 transition-all touch-target"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {formData.selectedMenuItems.length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-base font-semibold text-amber-800">Your Order Summary</h5>
                    <span className="text-lg font-bold text-amber-900">
                      Total: D{calculateTotal()}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {getSelectedItemsWithPrices().map((item, index) => (
                      item && (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-amber-800 font-medium">• {item.name}</span>
                          <span className="text-amber-700 font-semibold">D{item.price}</span>
                        </div>
                      )
                    ))}
                  </div>

                  <div className="border-t border-amber-300 pt-3">
                    <div className="flex justify-between items-center text-base font-bold text-amber-900">
                      <span>Estimated Total:</span>
                      <span className="text-lg">D{calculateTotal()}</span>
                    </div>
                  </div>

                  <p className="text-xs text-amber-600 mt-3 italic">
                    * Final pricing and availability will be confirmed when you arrive. Some items may require advance ordering.
                  </p>
                </div>
              )}
            </div>

            {/* Special Requests Section */}
            <div 
              ref={setRef('special')}
              className={`transition-all duration-700 delay-800 ${
                isVisible.special 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="mb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Special Requests</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Optional</span>
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4"></div>
              </div>
              
              <label className="block text-sm font-bold text-gray-900 mb-3">
                Tell us about any special requirements or preferences
              </label>
                <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none transition-all duration-300 hover:border-green-300 bg-white shadow-sm resize-none text-sm sm:text-base"
                placeholder="Share any dietary restrictions, special occasions, traditional dish preferences, or other special needs..."
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div 
              ref={setRef('actions')}
              className={`space-y-6 transition-all duration-700 delay-900 ${
                isVisible.actions 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  type="submit"
                  disabled={loading || formData.selectedMenuItems.length === 0}
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden text-sm sm:text-base"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    {loading ? 'Placing Order...' : 'Submit Order'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  disabled={loading || formData.selectedMenuItems.length === 0}
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 overflow-hidden text-sm sm:text-base"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    Order via WhatsApp
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Choose your preferred method to place your order
                </p>
              </div>
            </div>
          </form>

          {/* Restaurant Information */}
          <div 
            ref={setRef('info')}
            className={`mt-12 pt-8 border-t-2 border-gradient-to-r from-amber-200 to-blue-200 transition-all duration-700 delay-1100 ${
              isVisible.info 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full flex items-center justify-center">
                    <Info className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Delivery & Contact Information</h3>
                </div>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8">
              {/* Operating Hours */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h4 className="text-lg font-bold text-gray-900">Operating Hours</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-900 font-semibold">Saturday & Sunday</p>
                  <p className="text-blue-600 font-bold">11am - 10pm</p>
                  <p className="text-gray-600 text-sm">Weekdays: Closed</p>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-2xl border border-amber-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-amber-600" />
                  <h4 className="text-lg font-bold text-gray-900">Location</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-900 font-medium">Brusubi Phase 2</p>
                  <p className="text-gray-700">Opposite Police Station</p>
                  <p className="text-gray-600 text-sm">The Gambia</p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                  <h4 className="text-lg font-bold text-gray-900">Contact</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-900 font-semibold">+220 3939528</p>
                  <p className="text-gray-900 font-semibold">+220 9957606</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500 to-blue-600 text-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-6 h-6 text-yellow-300" />
                <h4 className="text-xl font-bold">Important Order Information</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm opacity-90">Large orders (10+ items) may require extra preparation time</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm opacity-90">We accommodate dietary restrictions with advance notice</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm opacity-90">Weekend specials are available Saturday & Sunday only</p>
                  </div>
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
