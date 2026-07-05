import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { User, Car, Smartphone, Lock, Loader2 } from 'lucide-react';

const Login = () => {
  const [role, setRole] = useState('CUSTOMER'); 
  const [formData, setFormData] = useState({ mobileNo: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/auth/login', formData);

      if (response.data.statuscode === 200) {
    // Force the token to be a string and trim it immediately
    const cleanToken = String(response.data.data).trim();
    
    localStorage.setItem('token', cleanToken);
    localStorage.setItem('userMobile', formData.mobileNo);
    localStorage.setItem('userRole', role);

    role === 'DRIVER' ? navigate('/driver-dashboard') : navigate('/dashboard');
}
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-indigo-500/10">
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">FlashRide</h2>
        <p className="text-gray-400 text-sm">Login to continue your journey</p>
      </div>

      <div className="flex p-1 bg-gray-800/50 rounded-2xl mb-6 relative">
        <button 
          type="button"
          onClick={() => setRole('CUSTOMER')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 z-10 ${role === 'CUSTOMER' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
        >
          <User size={18} /> Customer
        </button>
        <button 
          type="button"
          onClick={() => setRole('DRIVER')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 z-10 ${role === 'DRIVER' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
        >
          <Car size={18} /> Driver
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center text-red-400 text-sm animate-pulse">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative group">
          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
          <input 
            type="tel" 
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
            placeholder="Mobile Number" 
            className="w-full bg-gray-800/40 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password" 
            className="w-full bg-gray-800/40 border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white shadow-lg transition-all mt-4 active:scale-[0.98] ${
            role === 'DRIVER' 
              ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20' 
              : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
          }`}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            `Sign in as ${role}`
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm mb-4">New user? Register as</p>
        <div className="flex gap-3 justify-center">
          <Link 
            to="/register" 
            className="flex-1 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-indigo-400 hover:text-white hover:bg-gray-700 transition text-sm font-medium"
          >
            Customer
          </Link>
          <Link 
            to="/register-driver" 
            className="flex-1 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-emerald-400 hover:text-white hover:bg-gray-700 transition text-sm font-medium"
          >
            Driver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;