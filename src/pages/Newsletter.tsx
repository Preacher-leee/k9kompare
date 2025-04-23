import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { subscribeToNewsletter } from '../services/dogApi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [preferences, setPreferences] = useState({
    weeklyFacts: true,
    breedHighlights: true,
    trainingTips: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await subscribeToNewsletter(email, firstName, lastName, preferences);
      
      if (result.success) {
        setSuccess(true);
        // Reset form
        setEmail('');
        setFirstName('');
        setLastName('');
        setPreferences({
          weeklyFacts: true,
          breedHighlights: true,
          trainingTips: false,
        });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const fadeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
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
          <h1 className="text-4xl font-bold mb-4">Join Our Newsletter</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Subscribe to our weekly newsletter to receive curated dog facts, breed highlights, and exclusive content delivered straight to your inbox.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="card overflow-hidden">
            <div className="p-8 md:p-10">
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Thank You for Subscribing!</h2>
                  <p className="text-gray-600 mb-6">
                    You've successfully subscribed to our newsletter. Check your inbox for a confirmation email soon!
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn btn-primary"
                  >
                    Subscribe Another Email
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="input pl-10"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="input"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="input"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Newsletter Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="weeklyFacts"
                              name="weeklyFacts"
                              type="checkbox"
                              checked={preferences.weeklyFacts}
                              onChange={handlePreferenceChange}
                              className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="weeklyFacts" className="font-medium text-gray-700">Weekly Dog Facts</label>
                            <p className="text-gray-500">Receive interesting facts about dogs every week</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="breedHighlights"
                              name="breedHighlights"
                              type="checkbox"
                              checked={preferences.breedHighlights}
                              onChange={handlePreferenceChange}
                              className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="breedHighlights" className="font-medium text-gray-700">Breed Highlights</label>
                            <p className="text-gray-500">Detailed information about specific dog breeds</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="trainingTips"
                              name="trainingTips"
                              type="checkbox"
                              checked={preferences.trainingTips}
                              onChange={handlePreferenceChange}
                              className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="trainingTips" className="font-medium text-gray-700">Training Tips</label>
                            <p className="text-gray-500">Advice and guides for training your canine companion</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {error && (
                      <div className="bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <AlertCircle size={20} className="text-red-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <button 
                        type="submit" 
                        className="btn btn-primary flex items-center gap-2"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Subscribe
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Why Subscribe?</h2>
              <ul className="space-y-4">
                <li className="flex">
                  <CheckCircle size={24} className="text-green-500 mr-3 flex-shrink-0" />
                  <p>Weekly curated content about different dog breeds</p>
                </li>
                <li className="flex">
                  <CheckCircle size={24} className="text-green-500 mr-3 flex-shrink-0" />
                  <p>Fun and interesting facts about dogs that you probably didn't know</p>
                </li>
                <li className="flex">
                  <CheckCircle size={24} className="text-green-500 mr-3 flex-shrink-0" />
                  <p>Breed comparison of the week to help you find your perfect match</p>
                </li>
                <li className="flex">
                  <CheckCircle size={24} className="text-green-500 mr-3 flex-shrink-0" />
                  <p>Tips and advice for dog owners and prospective dog parents</p>
                </li>
              </ul>
              <p className="mt-6 text-sm text-gray-500">
                We respect your privacy and will never share your information with third parties. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Newsletter;