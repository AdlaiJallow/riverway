import { ImageIcon, Play } from 'lucide-react';
import { useState } from 'react';

export default function Gallery() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const mediaItems = [
    {
      id: 1,
      title: 'Authentic Gambian Cuisine',
      src: '/food.jpeg',
      type: 'image',
    },
    {
      id: 2,
      title: 'Traditional Dishes',
      src: '/food2.jpeg',
      type: 'image',
    },
    {
      id: 3,
      title: 'Signature Specialties',
      src: '/dett.jpeg',
      type: 'image',
    },
    {
      id: 4,
      title: 'Our Menu Selection',
      src: '/menu.jpeg',
      type: 'image',
    },
    {
      id: 5,
      title: 'Delicious Food Preparation',
      src: '/foody.mp4',
      type: 'video',
    },
    {
      id: 6,
      title: 'Signature Lasagna',
      src: '/lassagna.mp4',
      type: 'video',
    },
    {
      id: 7,
      title: 'Restaurant Experience',
      src: '/logo.jpeg',
      type: 'image',
    },
    {
      id: 8,
      title: 'Riverway Dining',
      src: '/logo copy.jpeg',
      type: 'image',
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
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl aspect-square shadow-lg hover:shadow-xl transition-shadow"
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="relative w-full h-full">
                  <video
                    src={item.src}
                    className="w-full h-full object-cover cursor-pointer"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    controls={false}
                    onMouseEnter={(e) => {
                      const video = e.currentTarget;
                      video.play().catch((error) => {
                        console.log('Video play failed on hover:', error);
                      });
                    }}
                    onMouseLeave={(e) => {
                      const video = e.currentTarget;
                      video.pause();
                      video.currentTime = 0;
                    }}
                    onClick={(e) => {
                      const video = e.currentTarget;
                      if (video.paused) {
                        video.play().catch((error) => {
                          console.log('Video play failed on click:', error);
                        });
                      } else {
                        video.pause();
                      }
                    }}
                    onError={(e) => {
                      console.error('Video error:', e);
                    }}
                    onLoadStart={() => {
                      console.log('Video loading started for:', item.src);
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 pointer-events-none">
                    <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              )}
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
