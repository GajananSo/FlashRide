import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Lock, Phone, CreditCard, 
  Car, MapPin, Loader2, Gauge, Users 
} from 'lucide-react';

const RegisterDriver = () => {
  const [formData, setFormData] = useState({
    driverName: '', age: '', gender: '', mobileNo: '', mailId: '', password: '',
    licenseNo: '', upiID: '', vehicleName: '', vehicleNo: '', vehicleType: '',
    model: '', vehicleCapacity: '', pricePerKM: '', averageSpeed: '',
    latitude: 0.0, longitude: 0.0 // To match CurrentLocationDTO
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCaptureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setFormData(prev => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }));
        alert("Location Captured Successfully!");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Sending data to your Spring Boot Controller
      const response = await axios.post('http://localhost:8080/auth/register/driver', formData);
      if (response.status === 200) {
        alert("Registration Successful!");
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration Failed. Check Backend Console.');
    } finally {
      setLoading(false);
    }
  };

  // Field definitions to match RegisterDriverVehicleDTO
  const sections = {
    personal: [
      { label: 'Full Name', key: 'driverName', type: 'text', icon: <User size={18}/> },
      { label: 'Mobile No', key: 'mobileNo', type: 'number', icon: <Phone size={18}/> },
      { label: 'Email ID', key: 'mailId', type: 'email', icon: <Mail size={18}/> },
      { label: 'Password', key: 'password', type: 'password', icon: <Lock size={18}/> },
      { label: 'Age', key: 'age', type: 'number', icon: <Users size={18}/> },
      { label: 'License No', key: 'licenseNo', type: 'number', icon: <CreditCard size={18}/> },
      { label: 'UPI ID', key: 'upiID', type: 'text', icon: <CreditCard size={18}/> },
    ],
    vehicle: [
      { label: 'Vehicle Name', key: 'vehicleName', type: 'text', icon: <Car size={18}/> },
      { label: 'Vehicle Number', key: 'vehicleNo', type: 'text', icon: <Gauge size={18}/> },
      { label: 'Model/Brand', key: 'model', type: 'text', icon: <Car size={18}/> },
      { label: 'Capacity', key: 'vehicleCapacity', type: 'number', icon: <Users size={18}/> },
      { label: 'Price/KM', key: 'pricePerKM', type: 'number', icon: <CreditCard size={18}/> },
      { label: 'Avg Speed', key: 'averageSpeed', type: 'number', icon: <Gauge size={18}/> },
    ]
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-300 p-6 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-[#0f0f12] border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Branding */}
        <div className="md:w-1/3 bg-indigo-600 p-10 flex flex-col justify-between text-white">
          <div>
            <h1 className="text-3xl font-black italic">FlashRide</h1>
            <p className="mt-4 text-indigo-100">Join our community of professional drivers and start earning today.</p>
          </div>
          <div className="space-y-4">
             <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-md">
                <MapPin size={20} />
                <p className="text-xs">Lat: {formData.latitude.toFixed(4)} <br/> Long: {formData.longitude.toFixed(4)}</p>
             </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <form onSubmit={handleSubmit} className="md:w-2/3 p-10 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <h2 className="text-2xl font-bold text-white">Driver Registration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Fields */}
            {sections.personal.map((f) => (
              <div key={f.key} className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{f.label}</label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-indigo-500 transition-all">
                  <span className="text-slate-500 mr-3">{f.icon}</span>
                  <input 
                    type={f.type} required
                    onChange={(e) => setFormData({...formData, [f.key]: e.target.value})}
                    className="bg-transparent border-none outline-none w-full text-white text-sm"
                  />
                </div>
              </div>
            ))}

            {/* Vehicle Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Vehicle Type</label>
              <select 
                required
                onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-indigo-500"
              >
                <option value="" className="bg-[#0f0f12]">Select Type</option>
                <option value="Mini" className="bg-[#0f0f12]">Mini</option>
                <option value="Sedan" className="bg-[#0f0f12]">BUS</option>
                <option value="SUV" className="bg-[#0f0f12]">SUV</option>
                <option value="Bike" className="bg-[#0f0f12]">Bike</option>
              </select>
            </div>

            {/* Vehicle Fields */}
            {sections.vehicle.map((f) => (
              <div key={f.key} className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{f.label}</label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-indigo-500 transition-all">
                  <span className="text-slate-500 mr-3">{f.icon}</span>
                  <input 
                    type={f.type} required
                    onChange={(e) => setFormData({...formData, [f.key]: e.target.value})}
                    className="bg-transparent border-none outline-none w-full text-white text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button" onClick={handleCaptureLocation}
              className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
            >
              <MapPin size={20} className="text-indigo-400" /> Capture GPS
            </button>
            <button 
              type="submit" disabled={loading}
              className="flex-[2] py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Complete Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterDriver;