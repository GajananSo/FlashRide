import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import CustomerDashboard from './pages/CustomerDashboard';
import AvailableVehicles from './pages/AvailableVehicles'; 
import AddVehicle from './pages/AddVehicle'; 


import Login from './pages/Login';
import RegisterCustomer from './pages/RegisterCustomer';
import RegisterDriver from './pages/RegisterDriver';
import DriverDashboard from './pages/DriverDashboard';
import BookRide from './pages/RideBooking';
import RideHistory from './pages/RideHistory';
import Payment from './pages/Payment';

function App() {
  return (
    <Router>
      
      <div className="flex flex-col min-h-screen bg-[#0f172a]">
        <Header />

        <main className="flex-grow flex items-center justify-center p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterCustomer />} />
            <Route path="/register-driver" element={<RegisterDriver />} />
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/driver-dashboard" element={<DriverDashboard />} />
            <Route path="/available-vehicles" element={<AvailableVehicles />} />
            <Route path="/book-ride" element={<BookRide />} />

            <Route path="/ride-history" element={<RideHistory />} />
            <Route path="/add-vehicle" element={<AddVehicle />} />

            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
        
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;