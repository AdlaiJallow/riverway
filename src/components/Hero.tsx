interface HeroProps {
  setCurrentPage: (page: string) => void;
}

export default function Hero({ setCurrentPage }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Authentic Gambian Cuisine,
              <span className="text-amber-700"> Elevated</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              After extensive recipe development, we're back stronger and fresher than ever. Thoughtfully crafted dishes designed to elevate your dining experience and satisfy every palate.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Inspired by the vitality and continuity of the River Gambia, we bring authentic, rooted cuisine that flows with new flavors and experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setCurrentPage('menu')}
                className="px-8 py-3 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors text-center"
              >
                Explore Menu
              </button>
              <button
                onClick={() => setCurrentPage('reservations')}
                className="px-8 py-3 border-2 border-amber-700 text-amber-700 font-semibold rounded-lg hover:bg-amber-50 transition-colors text-center"
              >
                Make Reservation
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="relative aspect-square bg-white rounded-2xl overflow-hidden flex items-center justify-center">
                  <img src="/logo copy.jpeg" alt="Riverway Logo" className="w-3/4 h-3/4 object-contain" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Our Story</h3>
                  <p className="text-sm text-gray-600">
                    Connected to The Gambia, a nation defined by the majestic River Gambia that flows from end to end, inspiring vitality and community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
    </div>
  );
}
