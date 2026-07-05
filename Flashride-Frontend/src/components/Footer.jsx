import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0b0f1a] text-gray-400 py-10 px-6 border-t border-gray-900 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand & Developer */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight">FlashRide</h2>
            <p className="text-xs leading-relaxed max-w-xs">
              A scalable web-based platform for intelligent ride booking and allocation.
            </p>
            <div className="pt-2">
              <p className="text-white text-sm font-semibold">{} Gajanan Solanke</p>
              <p className="text-[11px] text-gray-500 uppercase tracking-wider">MCA Developer</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-400 transition-colors">
                <a href="mailto:solankegajanan457@gmail.com" className="flex items-center gap-2">
                  <span>✉</span> solankegajanan457@gmail.com
                </a>
              </li>
              <li className="hover:text-blue-400 transition-colors">
                <a href="https://www.linkedin.com/in/gajanansolanke" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <span className="text-lg">in</span> LinkedIn Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Platform</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="hover:text-white cursor-pointer transition-all">About Us</span>
              <span className="hover:text-white cursor-pointer transition-all">Safety</span>
              <span className="hover:text-white cursor-pointer transition-all">Terms</span>
              <span className="hover:text-white cursor-pointer transition-all">Privacy</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-900 flex flex-col md:row justify-between items-center gap-4 text-[11px] text-gray-500">
          <p>© 2026 FlashRide Technologies Inc. • Designed by Gajanan</p>
          <div className="flex gap-4">
             <button className="bg-black border border-gray-800 px-3 py-1 rounded-md text-[10px] text-white hover:bg-gray-900">
               App Store
             </button>
             <button className="bg-black border border-gray-800 px-3 py-1 rounded-md text-[10px] text-white hover:bg-gray-900">
               Google Play
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;