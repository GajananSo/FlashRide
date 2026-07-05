import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Car, Info, Loader2, IndianRupee, Filter, 
  Zap, Gauge, Box, ShieldCheck 
} from 'lucide-react';

const AvailableVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxBudget, setMaxBudget] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // ✅ Points to your backend endpoint
        const response = await axios.get("http://localhost:8080/driver/findallvehicle");

        if (response.data.statuscode === 200) {
          setVehicles(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter(vehicle => {
    if (!maxBudget) return true;
    return vehicle.baseFare <= parseFloat(maxBudget);
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
        <p className="text-indigo-400 font-black tracking-[0.3em] animate-pulse">LOADING FLEET...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <button 
              onClick={() => navigate('/customer-dashboard')} 
              className="group flex items-center gap-2 text-slate-500 hover:text-white mb-6 transition-all"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
              <span className="font-bold uppercase text-xs tracking-[0.2em]">Dashboard</span>
            </button>

            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase">
              The <span className="text-indigo-500">Flash</span> Fleet
            </h1>
            <p className="text-slate-500 mt-2 font-medium italic">
              Premium vehicles. Transparent pricing. Zero hidden costs.
            </p>
          </div>

          {/* Budget Filter - Styled to match the dark theme */}
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4 focus-within:border-indigo-500/50 transition-all">
            <Filter size={20} className="text-indigo-400" />
            <div className="flex flex-col">
               <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Max Budget</label>
               <input 
                type="number" 
                placeholder="Enter Amount" 
                className="bg-transparent outline-none text-lg font-bold w-40 text-white placeholder:text-slate-700"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle) => (
              <div 
                key={vehicle.vehicleId} 
                className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 hover:border-indigo-500/40 transition-all group relative overflow-hidden shadow-2xl"
              >
                {/* Visual Flair (Zap Watermark) */}
                <Zap size={140} className="absolute -right-10 -bottom-10 text-white/[0.02] -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                
                <div className="relative z-10">
                  {/* Card Top: Icon & Pricing */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform">
                      <Car size={36} />
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Cost Per KM</p>
                      <div className="flex items-center justify-end text-4xl font-black text-white tracking-tighter">
                        <IndianRupee size={24} className="text-emerald-500" />
                        <span>{vehicle.baseFare}</span>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Identity */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-indigo-400 transition-colors">
                      {vehicle.vehicleModel}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                        {vehicle.vehicleNumber}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2 mb-1 text-slate-500">
                        <Box size={14} />
                        <span className="text-[10px] font-bold uppercase">Class</span>
                      </div>
                      <p className="text-sm font-black text-slate-200 uppercase tracking-tighter">
                        {vehicle.vehicleType}
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2 mb-1 text-slate-500">
                        <Gauge size={14} />
                        <span className="text-[10px] font-bold uppercase">Performance</span>
                      </div>
                      <p className="text-sm font-black text-slate-200 uppercase">Tier 1</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => navigate('/book-ride', { state: { vehicle } })}
                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    Confirm Selection
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-[#0a0a0a] rounded-[3rem] border border-dashed border-white/10">
              <Info className="mx-auto text-slate-700 mb-4" size={64} />
              <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">No Vehicles Match</h3>
              <p className="text-slate-600 mt-2 font-medium">Try increasing your budget or checking back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableVehicles;