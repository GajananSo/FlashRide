import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, MapPin, Navigation, 
  IndianRupee, Zap, ChevronRight, Loader2, Info, Car
} from 'lucide-react';

const RideBooking = () => {
  const navigate = useNavigate();
  
  const mobileNo = localStorage.getItem('userMobile');
  const token = localStorage.getItem('token');

  // Input States
  const [sourceLoc, setSourceLoc] = useState('');
  const [destinationLoc, setDestinationLoc] = useState('');
  const [distanceInput, setDistanceInput] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // --- FARE CALCULATION (UNCHANGED) ---
  const distance = parseFloat(distanceInput) || 0;
  const currentRate = selectedVehicle?.pricePerKM || selectedVehicle?.price_perkm || 0; 
  const fare = Math.round(distance * currentRate) || 0;
  const estimatedTime = Math.round(distance * 2) || 0; 

  // Fetch ONLY Available Vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/vehicle/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        // Filter to show only vehicles that are strictly AVAILABLE
        const availableOnly = (response.data.data || []).filter(
         v => v.availableStatus?.toUpperCase() === "AVAILABLE" || v.availableStatus?.toUpperCase() === "YES"
        );
        setVehicles(availableOnly);
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
      }
    };
    if (token) fetchVehicles();
  }, [token]);

  const handleQuickBook = async (e) => {
    e.preventDefault();
    
    if (!selectedVehicle) {
      alert("Please select a vehicle type.");
      return;
    }
    if (!sourceLoc || !destinationLoc || distance <= 0) {
      alert("Please enter valid pickup, destination, and distance.");
      return;
    }

    setIsSubmitting(true);
    
    // Payload matches your Booking Entity structure
    const bookingPayload = {
      vehicleid: Number(selectedVehicle.id), 
      sourceLoc: sourceLoc.trim(),
      destinationLoc: destinationLoc.trim(),
      distanceTravelled: Math.floor(distance),
      fare: Number(fare), 
      estimatedTime: Number(estimatedTime),
      bookingStatus: "BOOKED", // Moves it to history/active
      paymentStatus: "NOT PAID" // Default status
    };

    try {
      const response = await axios.post(
  `http://localhost:8080/booking/bookVehicle`, 
  bookingPayload, 
  {
    params: { mobileNo: mobileNo }, // This correctly appends ?mobileNo=...
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }
);

      if (response.data.statuscode === 200 || response.data.statuscode === 201) {
        alert(`Ride Confirmed! Record added to history.`);
        navigate('/dashboard'); // Go to dashboard to see active ride
      } else {
        alert(response.data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Server Error. Check if vehicle has an assigned driver.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans">
      <div className="max-w-xl mx-auto">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-white mb-10 transition-all group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase text-[10px] font-black tracking-widest">Back to Dashboard</span>
        </button>

        <h1 className="text-5xl font-black tracking-tighter mb-2 text-white italic">FLASH<span className="text-indigo-500">RIDE</span></h1>
        <p className="text-slate-500 mb-12 font-medium uppercase text-xs tracking-widest italic">Luxury Mobility Solutions</p>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <Zap size={150} className="absolute -right-16 -top-16 text-indigo-500/10 -rotate-12" />

          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <input 
                type="text" placeholder="Pickup Address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500 font-bold"
                value={sourceLoc} onChange={(e) => setSourceLoc(e.target.value)}
              />
              <input 
                type="text" placeholder="Destination Address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500 font-bold"
                value={destinationLoc} onChange={(e) => setDestinationLoc(e.target.value)}
              />
              <input 
                type="number" placeholder="Distance in KM"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500 font-bold text-3xl text-indigo-400"
                value={distanceInput} onChange={(e) => setDistanceInput(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2">Available Fleet</p>
              <div className="grid grid-cols-2 gap-3">
                {vehicles.length > 0 ? (
                  vehicles.map((v) => (
                    <div 
                      key={v.id}
                      onClick={() => setSelectedVehicle(v)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        selectedVehicle?.id === v.id 
                        ? 'border-indigo-500 bg-indigo-500/10' 
                        : 'border-white/5 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <Car size={24} className={selectedVehicle?.id === v.id ? 'text-indigo-500' : 'text-slate-500'} />
                      <p className="font-black text-sm mt-2 uppercase tracking-tighter truncate">{v.vehicleName}</p>
                      <p className="text-xs font-black text-emerald-500 mt-1">₹{v.pricePerKM}/KM</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-6 text-center border border-dashed border-white/10 rounded-2xl text-slate-600 text-xs italic">
                    No vehicles available at the moment.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-6 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Total Fare</p>
                <div className="flex items-center text-4xl font-black text-white">
                  <IndianRupee size={28} className="text-emerald-500" />
                  <span>{fare}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Est. Time</p>
                <p className="font-bold text-white tracking-tighter">{estimatedTime} MINS</p>
              </div>
            </div>

            <button 
              onClick={handleQuickBook}
              disabled={isSubmitting}
              className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <>Confirm Booking <ChevronRight size={20} /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default RideBooking;