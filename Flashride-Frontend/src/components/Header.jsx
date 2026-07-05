import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#0b0f1a] border-b border-gray-900 sticky top-0 z-50">
      {/* Left Side: Logo & Navigation */}
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold text-white tracking-tighter hover:opacity-90">
          Flash<span className="text-indigo-500">Ride</span>
        </Link>
        
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
          {/* Clicking Ride opens the Booking page */}
          <Link to="/book-ride" className="hover:text-white transition">Ride</Link>
        </div>
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center gap-6">
        <div className="hidden lg:block text-right">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Developer</p>
          <p className="text-xs text-indigo-400 font-medium">Gajanan Solanke</p>
        </div>

        <div className="flex items-center gap-4 border-l border-gray-800 pl-6">
          <button className="text-sm font-medium text-gray-300 hover:text-white transition">
            Help
          </button>
          
          {/* Clicking Log in opens the Login page */}
          <button 
            onClick={() => navigate('/login')}
            className="bg-white text-black text-sm font-bold px-6 py-2 rounded-full hover:bg-gray-200 transition shadow-md"
          >
            Log in
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;