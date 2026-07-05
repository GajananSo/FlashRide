import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Smartphone, Lock, MapPin, Loader2, ArrowLeft, Cake, VenetianMask } from 'lucide-react';

const RegisterCustomer = () => {
  const [formData, setFormData] = useState({
    name: '', age: '', gender: '', mobileNo: '',
    emailId: '', password: '', latitude: '', longitude: ''
  });
  const [loading, setLoading] = useState(false);
  const [showManual, setShowManual] = useState(false); 
  const navigate = useNavigate();

  // Unified Location Logic
  const handleLocationAction = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported. Please enter coordinates manually.");
      setShowManual(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData(prev => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }));
        setShowManual(false);
        alert("📍 Location captured successfully!");
      },
      (err) => {
        // If GPS fails (Unavailable/Denied), show manual inputs
        console.error(err);
        setShowManual(true);
        alert("GPS Signal Unavailable. Please enter coordinates manually.");
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.latitude || !formData.longitude) {
      alert("Location is required for FlashRide. Please capture or enter coordinates.");
      return;
    }

    setLoading(true);
    try {
      // Connects to your Spring Boot Backend
      await axios.post('http://localhost:8080/auth/register/customer', formData);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration Failed. Check backend logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl p-8 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl animate-fadeIn mt-10 mb-10 mx-auto">
      
      <Link to="/login" className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6 text-sm group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Login
      </Link>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tighter">Create Account</h2>
        <p className="text-gray-400">Join <span className="text-pink-400 font-semibold">FlashRide</span> as a Customer</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-6">
        
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-400 transition-colors" size={20} />
          <input 
            type="text" required placeholder="Full Name" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-gray-800/40 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-pink-500 transition-all"
          />
        </div>

        <div className="relative group">
          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-400 transition-colors" size={20} />
          <input 
            type="tel" required placeholder="Mobile Number" value={formData.mobileNo}
            onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
            className="w-full bg-gray-800/40 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-pink-500 transition-all"
          />
        </div>

        <div className="relative group md:col-span-2">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-400 transition-colors" size={20} />
          <input 
            type="email" required placeholder="Email Address" value={formData.emailId}
            onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
            className="w-full bg-gray-800/40 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-pink-500 transition-all"
          />
        </div>

        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-400 transition-colors" size={20} />
          <input 
            type="password" required placeholder="Password" value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-gray-800/40 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-pink-500 transition-all"
          />
        </div>

        <div className="relative group">
          <Cake className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-400 transition-colors" size={20} />
          <input 
            type="number" required placeholder="Age" value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full bg-gray-800/40 border border-gray-700 rounded-xl py-4 pl-12 px-4 text-white outline-none focus:border-pink-500 transition-all"
          />
        </div>

        <div className="relative group md:col-span-2">
          <VenetianMask className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-pink-400 transition-colors" size={20} />
          <select 
            required value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full bg-gray-800/40 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-pink-500 transition-all appearance-none"
          >
            <option value="" className="bg-gray-900">Select Gender</option>
            <option value="Male" className="bg-gray-900">Male</option>
            <option value="Female" className="bg-gray-900">Female</option>
            <option value="Other" className="bg-gray-900">Other</option>
          </select>
        </div>

        <div className="md:col-span-2 mt-4 space-y-4">
          <button
            type="button"
            onClick={handleLocationAction}
            className={`w-full py-4 border rounded-xl flex items-center justify-center gap-2 transition font-semibold ${
              formData.latitude ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-white/5 border-gray-700 text-gray-300 hover:bg-white/10'
            }`}
          >
            <MapPin size={20} />
            {formData.latitude ? 'Location Captured ✓' : 'Capture Current Location'}
          </button>

          {showManual && (
            <div className="grid grid-cols-2 gap-4 animate-fadeIn">
              <input 
                type="number" step="any" placeholder="Latitude"
                value={formData.latitude}
                onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                className="bg-gray-800/60 border border-gray-600 rounded-lg p-3 text-white outline-none focus:border-pink-500"
              />
              <input 
                type="number" step="any" placeholder="Longitude"
                value={formData.longitude}
                onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                className="bg-gray-800/60 border border-gray-600 rounded-lg p-3 text-white outline-none focus:border-pink-500"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Complete Registration'}
        </button>
      </form>
    </div>
  );
};

export default RegisterCustomer;