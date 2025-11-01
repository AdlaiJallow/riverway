import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, Mail, Phone, User, MessageCircle, ChefHat, Star, MapPin, CheckCircle } from 'lucide-react';
import { sendReservationEmail, sendWhatsAppNotification } from '../lib/emailService';

export default function Reservations() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [formAnimationKey, setFormAnimationKey] = useState(0);
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
    email: '',
    phone: '',
    date: '',
    time: '',
    selectedMenuItems: [] as string[],
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
      
      return {
        ...prev,
        selectedMenuItems: newSelection,
      };
    });
  };

  const calculateTotal = (): number => {
    return formData.selectedMenuItems.reduce((total, itemId) => {
      const item = menuItems.find(menu => menu.id === itemId);
      return total + (item ? item.price : 0);
    }, 0);
  };

  const getSelectedItemsWithPrices = () => {
    return formData.selectedMenuItems.map(itemId => {
      const item = menuItems.find(menu => menu.id === itemId);
      return item ? { name: item.name, price: item.price } : null;
    }).filter(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Send email notification using our email service
      const emailSent = await sendReservationEmail(formData);

      if (!emailSent) {
        throw new Error('Email sending failed');
      }

      // Also try to save to Supabase if configured (optional backup)
      try {
        const { error: submitError } = await supabase
          .from('reservations')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              date: formData.date,
              time: formData.time,
              selected_menu_items: formData.selectedMenuItems.join(', '),
              special_requests: formData.specialRequests,
            },
          ]);

        if (submitError) {
          console.warn('Supabase save failed (using mock):', submitError);
        }
      } catch (dbError) {
        console.warn('Database save failed, but email was sent:', dbError);
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        selectedMenuItems: [],
        specialRequests: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to submit reservation. Please try again or call us directly at +220 3939528.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Alternative submission via WhatsApp
  const handleWhatsAppSubmit = () => {
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setError('Please fill in all required fields before sending via WhatsApp.');
      return;
    }
    
    setError('');
    sendWhatsAppNotification(formData);
    
    // Show success message and clear form
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      selectedMenuItems: [],
      specialRequests: '',
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  // Function to check if date is weekend (Saturday or Sunday)
  const isWeekend = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  };

  // Function to get next available weekend date
  const getNextWeekendDate = () => {
    const today = new Date();
    const nextSaturday = new Date(today);
    const daysUntilSaturday = (6 - today.getDay() + 7) % 7;
    nextSaturday.setDate(today.getDate() + (daysUntilSaturday === 0 ? 7 : daysUntilSaturday));
    return nextSaturday.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 pt-20 pb-32 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200 to-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div 
          ref={setRef('header')}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-6 py-3 bg-gradient-to-r from-amber-100 to-blue-100 text-amber-800 rounded-full text-sm font-bold tracking-wide uppercase animate-pulse">
                Book Your Experience
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Reserve Your <span className="bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">Table</span>
            </h1>
            
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Experience the authentic flavors of <span className="font-semibold text-blue-700">The Gambia</span> at Riverway. 
              Book your table and join us for a <span className="font-semibold text-amber-700">culinary journey</span> inspired by the River Gambia's vitality and tradition.
            </p>

            {/* Progress Indicators */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <div className="flex items-center space-x-2 px-4 py-2 bg-amber-100 rounded-full">
                <CheckCircle className="w-5 h-5 text-amber-600" />
                <span className="text-amber-800 font-semibold">Step 1: Details</span>
              </div>
              <div className="w-8 h-0.5 bg-amber-300"></div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full">
                <ChefHat className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-semibold">Step 2: Menu</span>
              </div>
              <div className="w-8 h-0.5 bg-blue-300"></div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-full">
                <Star className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-semibold">Step 3: Confirm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Form Container */}
        <div 
          ref={setRef('form')}
          className={`relative transition-all duration-1000 delay-300 ${
            isVisible.form ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-amber-200 via-blue-100 to-amber-100 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl p-10 border border-amber-100">
          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✅ Thank you for choosing Riverway! Your reservation request has been sent directly to our team at adlaijallow@gmail.com. We'll contact you within 24 hours to confirm your table and discuss any special arrangements.
              </p>
              <p className="text-green-700 text-sm mt-2">
                If you don't hear from us within 24 hours, please call us at +220 3939528 or +220 9957606.
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
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-300 to-transparent"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-amber-700 group-focus-within:animate-pulse" />
                        Full Name
                      </div>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 outline-none transition-all duration-300 hover:border-amber-300"
                      placeholder="Enter your full name"
                    />
                  </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-700" />
                    Email
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-700" />
                    Phone Number
                  </div>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
                  placeholder="+220 XXX XXXX"
                />
              </div>



              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    Date (Weekends Only)
                  </div>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    if (selectedDate && !isWeekend(selectedDate)) {
                      setError('We are only open on weekends (Saturday & Sunday). Please select a weekend date.');
                      return;
                    }
                    setError('');
                    handleChange(e);
                  }}
                  required
                  min={getNextWeekendDate()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">We are open Saturday & Sunday only</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-700" />
                    Time (11am - 9pm)
                  </div>
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
                >
                  <option value="">Select time</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="11:30">11:30 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="12:30">12:30 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="13:30">1:30 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="14:30">2:30 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="15:30">3:30 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="16:30">4:30 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="17:30">5:30 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                </select>
              </div>
            </div>

            {/* Menu Selection Section */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-4">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-amber-700" />
                  Pre-Order Menu Items (Optional)
                </div>
              </label>
              <div className="mb-4 space-y-2">
                <p className="text-sm text-gray-600">
                  Select the dishes you'd like to pre-order. You can also order when you arrive at the restaurant.
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
                        {categoryItems.map(item => (
                          <label
                            key={item.id}
                            className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
                              formData.selectedMenuItems.includes(item.id)
                                ? 'border-amber-500 bg-amber-50 text-amber-900'
                                : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                            }`}
                          >
                            <div className="flex items-start">
                              <input
                                type="checkbox"
                                checked={formData.selectedMenuItems.includes(item.id)}
                                onChange={() => handleMenuSelection(item.id)}
                                className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 focus:ring-2 mr-3 mt-1"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <span className="text-sm font-semibold text-gray-900">{item.name}</span>
                                    {item.availability && (
                                      <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                        {item.availability}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-sm font-bold text-amber-700">D{item.price}</span>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                              </div>
                            </div>
                          </label>
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

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none resize-none"
                placeholder="Dietary restrictions, special occasions, traditional dish preferences, seating requests, etc."
              ></textarea>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {loading ? 'Sending Email...' : 'Send Reservation via Email'}
              </button>
              
              <div className="text-center text-gray-500 text-sm">or</div>
              
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                disabled={loading}
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Send via WhatsApp
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Restaurant Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Operating Hours</p>
                  <p className="text-gray-900 font-medium">Saturday & Sunday: 11am - 10pm</p>
                  <p className="text-gray-900 font-medium">Weekdays: Closed</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Location</p>
                  <p className="text-gray-900">Brusubi Phase 2, Opposite Police Station</p>
                  <p className="text-gray-700 text-sm">The Gambia</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Phone</p>
                  <p className="text-gray-900 font-medium">+220 3939528</p>
                  <p className="text-gray-900 font-medium">+220 9957606</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">Email</p>
                  <p className="text-gray-900 font-medium">fatoukinnehcorr@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="text-amber-800 font-semibold mb-2">Reservation Notes</h4>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>• We recommend booking in advance, especially for weekend dining</li>
                <li>• Large groups (6+) may require special arrangements</li>
                <li>• We accommodate dietary restrictions with advance notice</li>
                <li>• Traditional Gambian dishes can be prepared upon request</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
