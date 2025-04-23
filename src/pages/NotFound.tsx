import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';
import { getHttpDogImageUrl } from '../services/dogApi';

const NotFound = () => {
  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className="pt-24 pb-16 min-h-screen bg-cream flex flex-col items-center justify-center"
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8 inline-block">
          <div className="relative">
            <img 
              src={getHttpDogImageUrl(404)} 
              alt="404 Not Found Dog" 
              className="max-w-xs md:max-w-sm mx-auto rounded-lg shadow-md"
            />
          </div>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle size={24} className="text-secondary-500 mr-2" />
            <h1 className="text-3xl font-bold">Page Not Found</h1>
          </div>
          <p className="text-lg text-gray-600 mb-8">
            Oops! It looks like the page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="btn btn-primary flex items-center gap-2 mx-auto w-fit"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;