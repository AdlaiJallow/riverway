import { Waves, Heart, Leaf } from 'lucide-react';

export default function About() {
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
    <div className="min-h-screen bg-white pt-12 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Our Story</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              After a period of rebranding and extensive recipe development, we are delighted to announce our return, stronger, fresher, and more inspired than before.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our renewed menu features thoughtfully crafted dishes designed to elevate your dining experience and satisfy every palate.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-amber-50 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-amber-700">Riverway</span> reflects our deep connection to The Gambia. As a nation defined by the majestic River Gambia that flows from end to end, we are inspired by its vitality, continuity, and the sense of community it brings.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 group-hover:bg-amber-50 transition-colors mb-4">
                  <Icon className="w-8 h-8 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-3xl p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Riverway embodies the spirit of authenticity, rooted in tradition, and ever-flowing with new flavors and experiences. Every dish we serve is a celebration of Gambian heritage, prepared with passion and presented with pride. We invite you to experience the journey of tastes that tell the story of our nation's rich culinary heritage.
          </p>
        </div>
      </div>
    </div>
  );
}
