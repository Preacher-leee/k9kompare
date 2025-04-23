import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Compare from './pages/Compare';
import Facts from './pages/Facts';
import Newsletter from './pages/Newsletter';
import About from './pages/About';
import NotFound from './pages/NotFound';

// Context
import { DogProvider } from './context/DogContext';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-secondary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-primary-600">Loading K9Kompare...</p>
        </div>
      </div>
    );
  }

  return (
    <DogProvider>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/facts" element={<Facts />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </DogProvider>
  );
}

export default App;