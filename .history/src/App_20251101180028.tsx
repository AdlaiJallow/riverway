import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Reservations from './components/Reservations';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Enhanced page navigation with smooth scroll to top
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    // Scroll to top smoothly when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Navigation currentPage={currentPage} setCurrentPage={handlePageChange} />

        {currentPage === 'home' && (
          <>
            <Hero setCurrentPage={handlePageChange} />
            <Gallery />
          </>
        )}

        {currentPage === 'menu' && <Menu setCurrentPage={handlePageChange} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'orders' && <Reservations />}

        <Footer setCurrentPage={handlePageChange} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
