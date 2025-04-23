import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PawPrint, Search, Heart, Mail } from 'lucide-react';
import { useDog } from '../context/DogContext';
import { fetchRandomDogImages } from '../services/dogApi';

const Home = () => {
  const { fetchBreeds } = useDog();
  
  useEffect(() => {
    fetchBreeds();
    // We'll also preload some dog images for the homepage
    fetchRandomDogImages(3);
  }, [fetchBreeds]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-primary-500 to-primary-700 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Find Your Perfect Canine Companion
              </motion.h1>
              <motion.p 
                className="text-xl mb-8 text-gray-100"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Compare dog breeds side-by-side and discover which four-legged friend is right for your lifestyle.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link to="/compare" className="btn btn-secondary flex items-center justify-center gap-2">
                  <PawPrint size={20} />
                  Compare Breeds
                </Link>
                <Link to="/facts" className="btn btn-outline bg-white/10 text-white border-white hover:bg-white/20 flex items-center justify-center gap-2">
                  <Search size={20} />
                  Explore Dog Facts
                </Link>
              </motion.div>
            </div>
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative h-80 md:h-96 w-full">
                <img
                  src="https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Happy dogs" 
                  className="absolute top-0 right-0 h-64 w-64 object-cover rounded-lg shadow-lg z-20"
                />
                <img
                  src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Playful dog" 
                  className="absolute bottom-0 left-0 h-64 w-64 object-cover rounded-lg shadow-lg z-10"
                />
                <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-secondary-400 rounded-full flex items-center justify-center">
                  <PawPrint size={40} className="text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-cream" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-16 bg-cream"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            variants={itemVariants}
          >
            What Makes K9Kompare Special?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="card p-6 text-center"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <PawPrint size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Breed Comparison</h3>
              <p className="text-gray-600">
                Compare two dog breeds side-by-side to find your perfect match based on temperament, size, lifespan, and more.
              </p>
              <Link to="/compare" className="inline-flex items-center text-primary-500 font-medium mt-4 hover:text-primary-600 transition-colors">
                Compare Now <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>
            
            <motion.div 
              className="card p-6 text-center"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-secondary-100 text-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fun Dog Facts</h3>
              <p className="text-gray-600">
                Discover interesting and fun facts about dogs that will surprise and delight dog lovers of all ages.
              </p>
              <Link to="/facts" className="inline-flex items-center text-primary-500 font-medium mt-4 hover:text-primary-600 transition-colors">
                Learn More <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>
            
            <motion.div 
              className="card p-6 text-center"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Weekly Newsletter</h3>
              <p className="text-gray-600">
                Sign up for our weekly newsletter to receive curated dog facts, breed highlights, and exclusive content.
              </p>
              <Link to="/newsletter" className="inline-flex items-center text-primary-500 font-medium mt-4 hover:text-primary-600 transition-colors">
                Subscribe <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-primary-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
                <p className="text-gray-600 mb-6">
                  Start comparing dog breeds now and discover which furry friend aligns perfectly with your lifestyle and preferences.
                </p>
                <Link 
                  to="/compare" 
                  className="btn btn-primary inline-flex items-center"
                >
                  Get Started <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
              <div className="md:w-1/2 bg-secondary-500 p-8 md:p-12 text-white">
                <h3 className="text-2xl font-bold mb-4">Join Our Newsletter</h3>
                <p className="mb-6">
                  Get weekly dog facts, breed comparisons, and care tips delivered straight to your inbox.
                </p>
                <Link 
                  to="/newsletter" 
                  className="btn bg-white text-secondary-500 hover:bg-gray-100 inline-flex items-center"
                >
                  Subscribe Now <Heart size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;