import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, PawPrint, ArrowRight } from 'lucide-react';
import { fetchDogFacts, fetchKinduffDogFacts, fetchRandomDogImages, getHttpDogImageUrl } from '../services/dogApi';
import { DogFact } from '../types';

const Facts = () => {
  const [facts, setFacts] = useState<DogFact[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [factsPerPage] = useState(3);
  const [animating, setAnimating] = useState(false);
  
  useEffect(() => {
    fetchAllData();
  }, []);
  
  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch facts from both APIs
      const [dukeFacts, kinduffFacts, images] = await Promise.all([
        fetchDogFacts(10),
        fetchKinduffDogFacts(10),
        fetchRandomDogImages(5)
      ]);
      
      // Combine and shuffle facts
      const allFacts = [...dukeFacts, ...kinduffFacts];
      setFacts(shuffleArray(allFacts));
      setImages(images);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Fisher-Yates shuffle algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  const refreshFacts = async () => {
    if (animating) return;
    
    setAnimating(true);
    fetchAllData();
    
    // After animation completes, reset animating state
    setTimeout(() => {
      setAnimating(false);
    }, 1000);
  };
  
  // Get current facts for pagination
  const indexOfLastFact = currentPage * factsPerPage;
  const indexOfFirstFact = indexOfLastFact - factsPerPage;
  const currentFacts = facts.slice(indexOfFirstFact, indexOfLastFact);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Generate a random HTTP status code for HTTP Dog API
  const getRandomStatusCode = (): number => {
    const commonCodes = [200, 201, 204, 304, 400, 401, 403, 404, 418, 500, 503];
    return commonCodes[Math.floor(Math.random() * commonCodes.length)];
  };
  
  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="pt-24 pb-16 min-h-screen bg-cream"
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Fun Dog Facts</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover interesting and fun facts about dogs that will surprise and delight dog lovers of all ages.
          </p>
          <motion.button
            className="btn btn-secondary mt-6 flex items-center gap-2 mx-auto"
            onClick={refreshFacts}
            disabled={loading || animating}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            Refresh Facts
          </motion.button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-secondary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Fetching interesting dog facts...</p>
            </div>
          </div>
        ) : (
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
              >
                {currentFacts.map((fact, index) => (
                  <motion.div
                    key={`${fact.id}-${index}`}
                    variants={fadeVariants}
                    className="card h-full flex flex-col overflow-hidden"
                  >
                    <div className="h-48 bg-gray-200 relative">
                      {images[index % images.length] && (
                        <img 
                          src={images[index % images.length]} 
                          alt="Dog" 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      )}
                      <div className="absolute top-2 right-2 bg-white/90 py-1 px-2 rounded text-xs font-medium text-gray-700">
                        {fact.source}
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex-grow">
                        <div className="flex items-start mb-4">
                          <PawPrint size={20} className="text-secondary-500 mr-2 mt-1 flex-shrink-0" />
                          <p className="text-gray-700">{fact.fact}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">Did you know this fact about dogs?</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            
            {/* Pagination */}
            <div className="flex justify-center space-x-2">
              {Array.from({ length: Math.ceil(facts.length / factsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    currentPage === index + 1
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            {/* HTTP Dog Section */}
            <div className="mt-16 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-primary-500 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-4">HTTP Status Dogs</h2>
                  <p className="mb-4">
                    Ever wondered what HTTP status codes would look like as dogs? Check out this fun visual representation!
                  </p>
                  <button
                    onClick={refreshFacts}
                    className="btn bg-white text-primary-500 hover:bg-gray-100 flex items-center gap-2"
                  >
                    Show Me Another <ArrowRight size={18} />
                  </button>
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex flex-col items-center">
                    <div className="mb-4">
                      <img
                        src={getHttpDogImageUrl(getRandomStatusCode())}
                        alt="HTTP Status Dog"
                        className="max-h-64 rounded-lg shadow-sm"
                      />
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Images from <a href="https://http.dog/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">HTTP.dog</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Facts;