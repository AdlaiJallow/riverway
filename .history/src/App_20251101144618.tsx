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

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {currentPage === 'home' && (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <Gallery />
          </>
        )}

        {currentPage === 'menu' && <Menu setCurrentPage={setCurrentPage} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'reservations' && <Reservations />}

        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
