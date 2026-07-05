import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IndianRupee, CreditCard, Wallet, Smartphone, ArrowLeft } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);

  // Retrieve the ride details sent via navigate() state
  const booking = location.state?.booking;

  // Safeguard if a user directly types /payment into the address bar
  if (!booking) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-bold uppercase tracking-tight">No active payment session found</p>
        <button 
          onClick={() => navigate('/history')} 
          className="bg-indigo-600 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Go back to History
        </button>
      </div>
    );
  }

  // const handleProcessPayment = async () => {
  //   if (!paymentMethod) {
  //     alert("Please choose a payment method before proceeding.");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const token = localStorage.getItem('token');
      
  //     // Call your backend endpoint passing the booking ID and selected payment mode
  //     const res = await axios.post(
  //       `http://localhost:8080/booking/pay?bookingId=${booking.id}&method=${paymentMethod}`, 
  //       {}, 
  //       { headers: { 'Authorization': `Bearer ${token}` } }
  //     );

  //     if (res.status === 200) {
  //       alert(`Payment processed via ${paymentMethod} successfully!`);
        
  //       // FIX: Redirects straight to Customer Dashboard instead of history screen
  //       navigate('/dashboard'); 
  //     }
  //   } catch (err) {
  //     console.error("Payment pipeline execution error", err);
  //     alert("Unable to reach transaction server. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleProcessPayment = async () => {
    // 1. First, make sure they actually selected UPI, CASH, or BANK
    if (!paymentMethod) {
      alert("Please choose a payment method before proceeding.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // 2. THIS IS WHERE YOUR AXIOS POST LINE GOES:
      // We pass both the bookingId and the chosen method to the backend
      const res = await axios.post(
        `http://localhost:8080/booking/pay?bookingId=${booking.id}&method=${paymentMethod}`, 
        {}, // Empty body because we are passing data via URL query parameters
        { 
          headers: { 'Authorization': `Bearer ${token}` } // Sends your JWT security token
        }
      );

      // 3. If the backend says 200 OK, it means payment is saved and SMS messages are sent!
      if (res.status === 200) {
        alert(`Payment processed via ${paymentMethod} successfully! Both you and the driver will receive a confirmation message.`);
        navigate('/dashboard'); // Redirect to Customer Dashboard
      }
    } catch (err) {
      console.error("Payment pipeline execution error", err);
      alert("Unable to reach transaction server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 flex justify-center items-center">
      <div className="max-w-md w-full bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 space-y-6 shadow-2xl">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase transition-all"
        >
          <ArrowLeft size={16} /> Cancel & Return
        </button>

        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic">
            Select <span className="text-indigo-500">Payment</span>
          </h1>
          <p className="text-xs text-slate-500 font-bold uppercase mt-1">Order Transaction ID: #{booking.id}</p>
        </div>

        {/* Bill Breakdown Summary Card */}
        <div className="bg-white/5 p-4 rounded-2xl flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">Destination Drop</p>
            <p className="font-bold text-lg tracking-tight">{booking.destinationLoc}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 font-bold uppercase">Fare Due</p>
            <div className="flex items-center text-2xl font-black text-emerald-500 justify-end">
              <IndianRupee size={22} />
              <span>{booking.fare}</span>
            </div>
          </div>
        </div>

        {/* Payment Configuration Options */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Available Gateway channels</label>
          
          {/* Option 1: UPI */}
          <div 
            onClick={() => setPaymentMethod('UPI')}
            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
              paymentMethod === 'UPI' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 bg-white/[0.02] hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-4">
              <Smartphone className={paymentMethod === 'UPI' ? 'text-indigo-500' : 'text-slate-400'} size={24} />
              <span className="font-bold uppercase text-sm tracking-wide">UPI (GPay / PhonePe / Paytm)</span>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'UPI' ? 'border-indigo-500' : 'border-slate-600'}`}>
              {paymentMethod === 'UPI' && <div className="w-2 h-2 bg-indigo-500 rounded-full" />}
            </div>
          </div>

          {/* Option 2: Cash */}
          <div 
            onClick={() => setPaymentMethod('CASH')}
            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
              paymentMethod === 'CASH' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 bg-white/[0.02] hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-4">
              <Wallet className={paymentMethod === 'CASH' ? 'text-indigo-500' : 'text-slate-400'} size={24} />
              <span className="font-bold uppercase text-sm tracking-wide">Cash on Delivery (To Driver)</span>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'CASH' ? 'border-indigo-500' : 'border-slate-600'}`}>
              {paymentMethod === 'CASH' && <div className="w-2 h-2 bg-indigo-500 rounded-full" />}
            </div>
          </div>

          {/* Option 3: Bank Transfer / Card */}
          <div 
            onClick={() => setPaymentMethod('BANK')}
            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
              paymentMethod === 'BANK' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 bg-white/[0.02] hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-4">
              <CreditCard className={paymentMethod === 'BANK' ? 'text-indigo-500' : 'text-slate-400'} size={24} />
              <span className="font-bold uppercase text-sm tracking-wide">Net Banking / Card Transfer</span>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'BANK' ? 'border-indigo-500' : 'border-slate-600'}`}>
              {paymentMethod === 'BANK' && <div className="w-2 h-2 bg-indigo-500 rounded-full" />}
            </div>
          </div>
        </div>

        {/* Dispatch API Action Button */}
        <button
          onClick={handleProcessPayment}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:opacity-50 text-white py-4 rounded-2xl font-black uppercase text-sm tracking-wider transition-all active:scale-[0.98] shadow-lg shadow-indigo-600/20"
        >
          {loading ? "Authorizing Security Node..." : `Authorize Payment • ₹${booking.fare}`}
        </button>

      </div>
    </div>
  );
};

export default Payment;