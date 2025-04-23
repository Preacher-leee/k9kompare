import { motion } from 'framer-motion';
import { MessageCircle, Heart, Search, PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
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
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
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
          <h1 className="text-4xl font-bold mb-4">About K9Kompare</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our mission is to make dog breed research fun, engaging, and accessible to everyone.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-10 mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                K9Kompare was born out of a simple idea: make it easier for prospective dog owners to find their perfect canine companion. We believe that the right match between human and dog creates a lifetime of happiness for both.
              </p>
              <p className="mt-4">
                Founded by a team of dog enthusiasts and animal welfare advocates, K9Kompare combines technology with a passion for dogs to create a platform that helps people make informed decisions about dog ownership.
              </p>
              <p className="mt-4">
                We've all been there – scrolling through endless websites trying to compare different dog breeds, wondering which one would be the best fit for our lifestyle. K9Kompare streamlines this process, putting all the information you need in one place with a side-by-side comparison tool.
              </p>
              <p className="mt-4">
                But we're more than just a comparison tool. We're a community of dog lovers dedicated to promoting responsible dog ownership and celebrating the joy that dogs bring to our lives.
              </p>
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="card p-6" variants={itemVariants}>
              <div className="w-12 h-12 bg-primary-100 text-primary-500 rounded-full flex items-center justify-center mb-4">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To make the process of finding the right dog breed fun, engaging, and accessible to everyone, promoting responsible dog ownership and improving the lives of dogs and their humans.
              </p>
            </motion.div>
            
            <motion.div className="card p-6" variants={itemVariants}>
              <div className="w-12 h-12 bg-secondary-100 text-secondary-500 rounded-full flex items-center justify-center mb-4">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Approach</h3>
              <p className="text-gray-600">
                We combine comprehensive data with an easy-to-use interface to help you compare dog breeds side-by-side. We focus on the characteristics that matter most when choosing a breed that fits your lifestyle.
              </p>
            </motion.div>
          </motion.div>
          
          <div className="card p-8 md:p-10 mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Team</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Behind K9Kompare is a dedicated team of dog lovers, tech enthusiasts, and animal welfare advocates. Our diverse team brings together expertise in:
              </p>
              <ul className="mt-4">
                <li>Canine behavior and training</li>
                <li>Veterinary care and animal health</li>
                <li>Web development and user experience design</li>
                <li>Data analysis and research</li>
              </ul>
              <p className="mt-4">
                What unites us is our shared love for dogs and our belief that the right information can lead to better matches and happier lives for both dogs and their humans.
              </p>
            </div>
          </div>
          
          <div className="bg-primary-500 text-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-center mb-6">
                <MessageCircle size={32} className="mr-4" />
                <h2 className="text-2xl font-bold">Get In Touch</h2>
              </div>
              <p className="text-lg mb-6">
                Have questions, suggestions, or just want to share your dog stories with us? We'd love to hear from you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/newsletter" className="btn bg-white text-primary-600 hover:bg-gray-100 flex items-center justify-center gap-2">
                  <PawPrint size={20} />
                  Join Our Newsletter
                </Link>
                <a href="mailto:contact@k9kompare.com" className="btn bg-secondary-500 text-white hover:bg-secondary-600 flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;