import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Info, PawPrint, RefreshCw } from 'lucide-react';
import { useDog } from '../context/DogContext';
import { fetchDogFacts, fetchKinduffDogFacts } from '../services/dogApi';
import { DogFact } from '../types';

const Compare = () => {
  const { 
    breeds, 
    loading, 
    error, 
    selectedBreeds, 
    breedImages, 
    setSelectedBreed, 
    fetchBreeds 
  } = useDog();
  
  const [dogFacts, setDogFacts] = useState<DogFact[]>([]);
  const [factsLoading, setFactsLoading] = useState(false);
  
  useEffect(() => {
    if (breeds.length === 0) {
      fetchBreeds();
    }
    
    loadFacts();
  }, [breeds, fetchBreeds]);
  
  const loadFacts = async () => {
    setFactsLoading(true);
    try {
      // Get 2 facts from each API
      const dukeFactsPromise = fetchDogFacts(2);
      const kinduffFactsPromise = fetchKinduffDogFacts(2);
      
      const [dukeFacts, kinduffFacts] = await Promise.all([dukeFactsPromise, kinduffFactsPromise]);
      setDogFacts([...dukeFacts, ...kinduffFacts]);
    } catch (error) {
      console.error('Error loading dog facts:', error);
    } finally {
      setFactsLoading(false);
    }
  };
  
  const handleBreedSelect = (event: React.ChangeEvent<HTMLSelectElement>, index: 0 | 1) => {
    const breedId = parseInt(event.target.value, 10);
    const selectedBreed = breeds.find(breed => breed.id === breedId) || null;
    setSelectedBreed(index, selectedBreed);
  };
  
  const getFact = (index: number): string => {
    if (dogFacts.length === 0) return 'Loading facts...';
    return dogFacts[index % dogFacts.length]?.fact || 'No fact available';
  };
  
  const renderBreedSelector = (index: 0 | 1) => (
    <div className="mb-4">
      <label htmlFor={`breed-select-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
        Select a dog breed
      </label>
      <div className="relative">
        <select
          id={`breed-select-${index}`}
          className="input appearance-none pr-10"
          value={selectedBreeds[index]?.id || ''}
          onChange={(e) => handleBreedSelect(e, index)}
        >
          <option value="">-- Select a breed --</option>
          {breeds.map(breed => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
      </div>
    </div>
  );
  
  const renderBreedInfo = (index: 0 | 1) => {
    const breed = selectedBreeds[index];
    const imageUrl = breedImages[index];
    
    if (!breed) return null;
    
    return (
      <div className="card h-full flex flex-col">
        <div className="h-64 bg-gray-200 relative rounded-t-lg overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={breed.name} 
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <RefreshCw className="animate-spin text-gray-400" size={32} />
            </div>
          )}
        </div>
        
        <div className="p-6 flex-grow">
          <h2 className="text-2xl font-bold mb-2">{breed.name}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Info size={18} className="text-primary-500" />
                Breed Info
              </h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm"><span className="font-medium">Temperament:</span> {breed.temperament}</p>
                <p className="text-sm"><span className="font-medium">Life Span:</span> {breed.life_span}</p>
                <p className="text-sm"><span className="font-medium">Weight:</span> {breed.weight.imperial} lbs</p>
                <p className="text-sm"><span className="font-medium">Height:</span> {breed.height.imperial} inches</p>
                {breed.bred_for && (
                  <p className="text-sm"><span className="font-medium">Bred For:</span> {breed.bred_for}</p>
                )}
                {breed.breed_group && (
                  <p className="text-sm"><span className="font-medium">Breed Group:</span> {breed.breed_group}</p>
                )}
                {breed.origin && (
                  <p className="text-sm"><span className="font-medium">Origin:</span> {breed.origin}</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <PawPrint size={18} className="text-secondary-500" />
                Fun Facts
              </h3>
              <div className="mt-2 space-y-3">
                <p className="text-sm italic bg-gray-50 p-3 rounded-md">
                  {getFact(index * 2)}
                </p>
                <p className="text-sm italic bg-gray-50 p-3 rounded-md">
                  {getFact(index * 2 + 1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className="pt-24 pb-16 min-h-screen bg-cream"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Compare Dog Breeds</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Select two dog breeds to compare side-by-side and discover which four-legged friend is the perfect match for your lifestyle.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="md:w-1/2">
                {renderBreedSelector(0)}
              </div>
              <div className="md:w-1/2">
                {renderBreedSelector(1)}
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2 mb-6 md:mb-0">
                {selectedBreeds[0] ? (
                  renderBreedInfo(0)
                ) : (
                  <div className="card h-full flex flex-col items-center justify-center p-10 text-center">
                    <PawPrint size={48} className="text-gray-300 mb-4" />
                    <p className="text-gray-500">Select a dog breed on the left to see information</p>
                  </div>
                )}
              </div>
              
              <div className="md:w-1/2">
                {selectedBreeds[1] ? (
                  renderBreedInfo(1)
                ) : (
                  <div className="card h-full flex flex-col items-center justify-center p-10 text-center">
                    <PawPrint size={48} className="text-gray-300 mb-4" />
                    <p className="text-gray-500">Select a dog breed on the right to see information</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-center mt-12">
              <button 
                className="btn btn-secondary flex items-center gap-2"
                onClick={loadFacts}
                disabled={factsLoading}
              >
                {factsLoading ? (
                  <RefreshCw className="animate-spin" size={18} />
                ) : (
                  <RefreshCw size={18} />
                )}
                Refresh Fun Facts
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Compare;