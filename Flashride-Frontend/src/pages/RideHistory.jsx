// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { IndianRupee, Car, CreditCard } from 'lucide-react';

// const RideHistory = () => {
//   const [history, setHistory] = useState([]);
//   const mobileNo = localStorage.getItem('userMobile');

//   const fetchHistory = async () => {
//     try {
//       const res = await axios.get(`http://localhost:8080/booking/history?mobileNo=${mobileNo}`, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//       });
//       setHistory(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching history", err);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, [mobileNo]);

//   // Function to handle Payment and make vehicle available
//  const handlePayment = async (bookingId) => {
//   try {
//     const token = localStorage.getItem('token');
//     // Calling the endpoint we created in the BookingController
//     const res = await axios.post(
//       `http://localhost:8080/booking/pay?bookingId=${bookingId}`, 
//       {}, 
//       { headers: { 'Authorization': `Bearer ${token}` } }
//     );

//     if (res.status === 200) {
//       alert("Payment Successful! The vehicle is now available for new bookings.");
//       // Refresh the history list to show updated status
//       fetchHistory(); 
//     }
//   } catch (err) {
//     console.error("Payment failed", err);
//     alert("Could not process payment. Please try again.");
//   }
// };
//   return (
//     <div className="min-h-screen bg-[#050505] text-white p-8">
//       <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter italic">
//         Ride <span className="text-indigo-500">History</span>
//       </h1>
      
//       <div className="space-y-4 max-w-3xl">
//         {history.length > 0 ? history.map((ride) => (
//           <div key={ride.id} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:border-indigo-500/50 transition-all">
//             <div className="flex gap-6 items-center">
//               <div className="p-4 bg-white/5 rounded-2xl text-indigo-500 transition-all">
//                 <Car size={32} />
//               </div>
//               <div>
//                 <h3 className="font-black text-xl uppercase tracking-tight">To {ride.destinationLoc}</h3>
//                 <div className="flex items-center gap-3 text-slate-500 text-xs font-bold uppercase mt-1">
//                   <span>{ride.vehicle?.name}</span>
//                   <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
//                   <span>{new Date(ride.bookingDate).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col items-end gap-3">
//               <div className="text-right">
//                 <div className="flex items-center justify-end text-xl font-black text-emerald-500">
//                   <IndianRupee size={18} />
//                   <span>{ride.fare}</span>
//                 </div>
//                 <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
//                   ride.paymentStatus === 'PAID' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
//                 }`}>
//                   {ride.paymentStatus}
//                 </span>
//               </div>

//               <div className="flex flex-col items-end gap-2">
//   <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
//     ride.paymentStatus === 'PAID' 
//       ? 'bg-emerald-500/10 text-emerald-500' 
//       : 'bg-red-500/10 text-red-500'
//   }`}>
//     {ride.paymentStatus}
//   </span>

//   {ride.paymentStatus === "NOT PAID" && (
//     <button 
//       onClick={() => handlePayment(ride.id)}
//       className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold uppercase text-xs transition-all active:scale-95"
//     >
//       Pay Bill & Complete
//     </button>
//   )}
// </div>

//               {/* Show Pay Button only if NOT PAID */}
//               {ride.paymentStatus === "NOT PAID" && (
//                 <button 
//                   onClick={() => handlePayment(ride.id)}
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold uppercase text-xs"
//                 >
//                Pay Bill & Complete
//              </button>
//            )}           
//             </div>
//           </div>
//         )) : (
//           <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
//             <p className="text-slate-600 font-bold uppercase tracking-widest text-sm">No bookings found</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RideHistory;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, Car } from 'lucide-react';

const RideHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Manages components initial mount state
  const mobileNo = localStorage.getItem('userMobile');
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchHistory = async () => {
      if (!mobileNo) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8080/booking/history?mobileNo=${mobileNo}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        
        if (isMounted) {
          // Confirming exact object pathway delivery from backend structure
          if (res.data && res.data.data) {
            setHistory(res.data.data);
          } else {
            setHistory([]); 
          }
        }
      } catch (err) {
        console.error("Error fetching history", err);
      } finally {
        if (isMounted) {
          setLoading(false); // Drop loading block safely
        }
      }
    };

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, [mobileNo]);

  const proceedToPayment = (ride) => {
    console.log("Redirecting to payment for ride ID:", ride.id);
    
    if (!ride) {
      alert("Invalid ride data selected.");
      return;
    }

    // Pass data along to the separate /payment page
    navigate('/payment', { state: { booking: ride } });
  };

  // FIX: Prevents React from evaluating the map code loop on empty/undefined arrays during initialization
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <p className="text-sm font-bold uppercase tracking-widest text-slate-500 animate-pulse">
          Synchronizing History Database...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter italic">
        Ride <span className="text-indigo-500">History</span>
      </h1>
      
      <div className="space-y-4 max-w-3xl">
        {history && history.length > 0 ? history.map((ride) => (
          <div 
            key={ride.id} 
            className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:border-indigo-500/50 transition-all"
          >
            {/* Left Layout Container */}
            <div className="flex gap-6 items-center">
              <div className="p-4 bg-white/5 rounded-2xl text-indigo-500 transition-all">
                <Car size={32} />
              </div>
              <div>
                <h3 className="font-black text-xl uppercase tracking-tight">To {ride.destinationLoc}</h3>
                <div className="flex items-center gap-3 text-slate-500 text-xs font-bold uppercase mt-1">
                  <span>{ride.vehicle?.name || "Standard Vehicle"}</span>
                  <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                  <span>{ride.bookingDate ? new Date(ride.bookingDate).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Right Layout Container */}
            <div className="flex flex-col items-end gap-3">
              <div className="text-right">
                <div className="flex items-center justify-end text-xl font-black text-emerald-500">
                  <IndianRupee size={18} />
                  <span>{ride.fare}</span>
                </div>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mt-1 inline-block ${
                  ride.paymentStatus === 'PAID' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {ride.paymentStatus}
                </span>
              </div>

              {ride.paymentStatus === "NOT PAID" && (
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    proceedToPayment(ride);
                  }}
                  className="relative z-10 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold uppercase text-xs transition-all active:scale-95 shadow-md shadow-indigo-600/10 cursor-pointer"
                >
                  Pay Bill & Complete
                </button>
              )}
            </div>
          </div>
        )) : (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
            <p className="text-slate-600 font-bold uppercase tracking-widest text-sm">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideHistory;