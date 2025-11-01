import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, Users, Mail, Phone, User } from 'lucide-react';

export default function Reservations() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    partySize: '2',
    specialRequests: '',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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
            party_size: parseInt(formData.partySize),
            special_requests: formData.specialRequests,
          },
        ]);

      if (submitError) throw submitError;

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        partySize: '2',
        specialRequests: '',
      });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to submit reservation. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-12 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Reserve Your Table</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Experience the authentic flavors of The Gambia at Riverway. Book your table and join us for a culinary journey inspired by the River Gambia's vitality and tradition.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                Thank you! Your reservation has been received. We'll confirm shortly.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-700" />
                    Full Name
                  </div>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
                  placeholder="Your name"
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
                    <Users className="w-4 h-4 text-amber-700" />
                    Party Size
                  </div>
                </label>
                <select
                  name="partySize"
                  value={formData.partySize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
                    <option key={size} value={size}>{size} {size === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    Date
                  </div>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={minDate}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
                />
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Reserve Your Table'}
            </button>
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
                  <p className="text-gray-900 font-medium">info@riverway.com</p>
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
