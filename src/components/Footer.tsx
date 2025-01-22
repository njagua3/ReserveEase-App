import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">ReserveEase</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Making dining reservations simple and efficient for everyone.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm sm:text-base transition-colors">Home</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white text-sm sm:text-base transition-colors">Sign Up</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white text-sm sm:text-base transition-colors">Login</Link></li>
              <li><Link to="/admin" className="text-gray-400 hover:text-white text-sm sm:text-base transition-colors">Admin</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm sm:text-base transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm sm:text-base transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm sm:text-base transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm sm:text-base transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} ReservEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;