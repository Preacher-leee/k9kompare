import { Link } from 'react-router-dom';
import Logo from '../ui/Logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-600 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo className="h-12 w-auto mb-4" isWhite />
            <p className="text-sm text-gray-300 mb-4">
              Making dog breed research fun and engaging
            </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/compare" className="text-gray-300 hover:text-white transition-colors">Compare Breeds</Link></li>
              <li><Link to="/facts" className="text-gray-300 hover:text-white transition-colors">Fun Dog Facts</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dog Care Tips</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Breed Health</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Training Resources</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Adoption Info</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our weekly newsletter
            </p>
            <Link to="/newsletter" className="btn btn-secondary inline-block">Subscribe Now</Link>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} K9Kompare.com. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://www.termsfeed.com/live/f7885e6c-d04a-4f66-b6e6-bfd4b5530cec" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="https://www.termsfeed.com/live/f7854bbc-cb72-41dd-b2f3-263b1dd613e5" className="hover:text-white transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
