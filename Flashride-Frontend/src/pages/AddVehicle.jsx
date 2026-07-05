import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Gauge, Users, CreditCard, ArrowLeft, Save, Loader2, Zap } from 'lucide-react';
import api from "../api/axiosConfig";

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    name: '',
    vehicleNo: '',
    type: '',
    model: '',
    capacity: '',
    pricePerKM: '',
    avgSpeed: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    // 1. Changed .put to .post to match standard Backend Add controllers
    const response = await api.post('/vehicle/add', formData);
    
    // 2. Check if your backend uses statuscode 201 (Created) or 200
    if (response.data.statuscode === 200 || response.data.statuscode === 201) {
      alert("Vehicle Details Saved!");
      navigate('/driver-dashboard');
    }
  } catch (err) {
    console.error(err);
    // This will now catch 403s caused by expired tokens or bad URLs
    alert("Failed to save vehicle details. Please check your connection.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#060608] text-slate-200 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <div className="bg-[#0f0f12] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <h2 className="text-3xl font-black text-white mb-2">Vehicle Details</h2>
          <p className="text-slate-500 mb-8">Register or update your vehicle information</p>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Vehicle Name" icon={<Car size={18}/>} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Toyota Camry" />
            
            <InputGroup label="Vehicle Number" icon={<Gauge size={18}/>} 
              onChange={(e) => setFormData({...formData, vehicleNo: e.target.value})} placeholder="e.g. MH-12-AB-1234" />

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Vehicle Type</label>
              <select 
                required
                className="bg-white/5 border border-white/10 rounded-xl p-3.5 outline-none focus:border-emerald-500 text-sm transition-all"
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="" className="bg-[#0f0f12]">Select Type</option>
                <option value="Mini" className="bg-[#0f0f12]">Mini</option>
                <option value="Sedan" className="bg-[#0f0f12]">Sedan</option>
                <option value="SUV" className="bg-[#0f0f12]">SUV</option>
              </select>
            </div>

            <InputGroup label="Model" icon={<Zap size={18}/>} 
              onChange={(e) => setFormData({...formData, model: e.target.value})} placeholder="e.g. 2024 V6" />

            <InputGroup label="Seating Capacity" type="number" icon={<Users size={18}/>} 
              onChange={(e) => setFormData({...formData, capacity: e.target.value})} placeholder="e.g. 4" />

            <InputGroup label="Price per KM" type="number" icon={<CreditCard size={18}/>} 
              onChange={(e) => setFormData({...formData, pricePerKM: e.target.value})} placeholder="e.g. 15" />

            <InputGroup label="Average Speed" type="number" icon={<Gauge size={18}/>} 
              onChange={(e) => setFormData({...formData, avgSpeed: e.target.value})} placeholder="e.g. 60" />

            <button 
              type="submit" 
              disabled={loading}
              className="md:col-span-2 mt-4 py-4 bg-emerald-600 hover:bg-emerald-500 text-black rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-emerald-600/20"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Save size={20}/> Save Vehicle Info</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, icon, type = "text", onChange, placeholder }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-emerald-500 transition-all group">
      <span className="text-slate-500 mr-3 group-focus-within:text-emerald-500">{icon}</span>
      <input 
        type={type} 
        onChange={onChange} 
        placeholder={placeholder}
        className="bg-transparent border-none outline-none w-full text-sm text-white placeholder:text-slate-700" 
        required 
      />
    </div>
  </div>
);

export default AddVehicle;