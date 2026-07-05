import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
//import axios from 'axios';
import { 
  Car, History, LogOut, Navigation, 
  Search, ArrowRight, Bell, Menu, X, Shield 
} from 'lucide-react';

const CustomerDashboard = () => {
  const [customerName] = useState(localStorage.getItem('userName') || 'Explorer');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeRide, setActiveRide] = useState(null);
  const navigate = useNavigate();
  const mobileNo = localStorage.getItem('userMobile');

useEffect(() => {
    let isMounted = true; 

    if (!mobileNo) {
        navigate('/login');
        return;
    }

    const fetchCurrentRide = async () => {
        try {
            const response = await api.get(`/booking/active?mobileNo=${mobileNo}`);
            
            if (isMounted) {
                if (response.data.statuscode === 200 && response.data.data) {
                    setActiveRide(response.data.data); 
                } else {
                    setActiveRide(null); 
                }
            }
        } catch (error) {
             console.log(error)
            if (isMounted) setActiveRide(null);
            console.warn("No active ride found for: " + mobileNo);
        }
    };

    fetchCurrentRide();

    return () => { isMounted = false; }; // Cleanup function
}, [mobileNo, navigate]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans">
      
      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0a0a] border-r border-white/5 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2.5 bg-indigo-600 text-white rounded-lg">
              <Car size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">Flash<span className="text-indigo-500">Ride</span></span>
          </div>

          <nav className="flex-1 space-y-1">
            <SidebarItem icon={<Navigation size={20}/>} label="Home" active onClick={() => setSidebarOpen(false)} />
            
            {/* ADDED: Available Vehicles Tab */}
            <SidebarItem icon={<Car size={20}/>} label="Available Vehicles" onClick={() => navigate('/available-vehicles')} />
            
            <SidebarItem icon={<History size={20}/>} label="History" onClick={() => navigate('/ride-history')} />
          </nav>

          <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="flex items-center gap-3 p-4 text-slate-500 hover:text-red-400 mt-auto transition-colors">
            <LogOut size={20} />
            <span className="font-bold text-xs uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-72 flex flex-col relative">
        <header className="h-20 px-8 flex items-center justify-between sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
          <button className="lg:hidden p-2" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm font-bold text-slate-400 hidden sm:block">{customerName}</span>
            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold border border-white/10">
              {customerName.charAt(0)}
            </div>
          </div>
        </header>

        <div className="p-6 md:p-12 max-w-5xl w-full mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
              Ready to roll, {customerName.split(' ')[0]}?
            </h1>
          </div>

          {activeRide && (
            <div className="mb-8 p-6 bg-indigo-600 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-indigo-200">Current Trip</p>
                  <h2 className="text-2xl font-black">To {activeRide.destinationLoc}</h2>
                 <p className="text-sm opacity-90">
                    {activeRide?.vehicleName || "Loading..."} • {activeRide?.vehicleNumber || "N/A"}
                 </p>
                </div>
                <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Navigation className="animate-pulse" />
                </div>
              </div>
            </div>
          )}

          <div onClick={() => navigate('/book-ride')} className="group cursor-pointer bg-[#121212] border border-white/5 p-6 rounded-3xl flex items-center gap-4 mb-12 hover:border-indigo-500/30 transition-all">
            <div className="p-3 bg-white text-black rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <Search size={24} />
            </div>
            <span className="text-xl font-bold text-slate-400">Where to?</span>
            <ArrowRight className="ml-auto text-slate-600 group-hover:translate-x-2 transition-transform" />
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ShortcutCard title="Request Ride" desc="Instant pickup" icon={<Navigation size={32}/>} onClick={() => navigate('/book-ride')} />
           
            <ShortcutCard title="Fleet" desc="Available vehicles" icon={<Car size={32}/>} onClick={() => navigate('/available-vehicles')} />
            
            <ShortcutCard title="History" desc="Past journeys" icon={<History size={32}/>} onClick={() => navigate('/ride-history')} />
          </div>
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${active ? 'bg-white text-black shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
    {icon} <span className="font-bold text-sm tracking-tight">{label}</span>
  </div>
);

const ShortcutCard = ({ title, desc, icon, onClick }) => (
  <div onClick={onClick} className="bg-[#121212] p-8 rounded-3xl border border-white/5 hover:bg-[#181818] hover:border-indigo-500/20 cursor-pointer group transition-all">
    <div className="mb-6 text-indigo-500 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-black mb-1 tracking-tight uppercase">{title}</h3>
    <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{desc}</p>
  </div>
);

export default CustomerDashboard;