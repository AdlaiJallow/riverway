import { ImageIcon } from 'lucide-react';

export default function Gallery() {
  const images = [
    {
      id: 1,
      title: 'Authentic Gambian Cuisine',
      image: '/food.jpeg',
    },
    {
      id: 2,
      title: 'Traditional Dishes',
      image: '/food2.jpeg',
    },
    {
      id: 3,
      title: 'Signature Specialties',
      image: '/dett.jpeg',
    },
    {
      id: 4,
      title: 'Our Menu Selection',
      image: '/menu.jpeg',
    },
    {
      id: 5,
      title: 'Restaurant Experience',
      image: '/logo.jpeg',
    },
    {
      id: 6,
      title: 'Riverway Dining',
      image: '/logo copy.jpeg',
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ImageIcon className="w-8 h-8 text-amber-700" />
            <h2 className="text-4xl font-bold text-gray-900">Gallery</h2>
          </div>
          <p className="text-gray-600">
            Discover the beauty of our authentic Gambian dishes and dining experience
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {images.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl aspect-square shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-semibold text-lg">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
