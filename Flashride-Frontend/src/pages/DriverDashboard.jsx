import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Car, MapPin, Navigation, LogOut, Wallet, Menu, Zap, Loader2, Info, Plus
} from "lucide-react";
import api from "../api/axiosConfig";

const DriverDashboard = () => {
  const [driver, setDriver] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [updatingLocation, setUpdatingLocation] = useState(false);
  
  // State for the List of all vehicles
  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(false);

  const navigate = useNavigate();

  // 1. Fetch Driver Data (Initial Load)
  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await api.get("/driver/finddriver");
        if (response.data.statuscode === 200) {
          setDriver(response.data.data);
        }
      } catch (err) {
        console.error("Auth failed:", err);
        navigate("/login");
      }
    };
    fetchDriverData();
  }, [navigate]);

  // 2. Fetch All Vehicles when switching to Fleet tab
  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);

    if (tab === "details") {
      setLoadingVehicles(true);
      try {
        const response = await api.get("/vehicle/all");
        if (response.data.statuscode === 200) {
          setVehicles(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch fleet", err);
      } finally {
        setLoadingVehicles(false);
      }
    }
  };

  const handleUpdateLocation = () => {
    if (!navigator.geolocation) return alert("GPS not supported");
    setUpdatingLocation(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const response = await api.put("/driver/updatedrivervehicleloc", null, {
          params: {
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          },
        });

        if (response.data.statuscode === 200) {
          alert("Location updated!");
          const refresh = await api.get("/driver/finddriver");
          setDriver(refresh.data.data);
        }
      } catch (err) {
        console.log(err);
        alert("Failed to update location");
      } finally {
        setUpdatingLocation(false);
      }
    });
  };

  if (!driver) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#060608] text-slate-200 flex">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0f0f12]/80 backdrop-blur-2xl border-r border-white/5 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-emerald-500 rounded-xl"><Zap size={24} className="text-black" /></div>
            <span className="text-2xl font-black text-white">Flash<span className="text-emerald-500">Ride</span></span>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem icon={<Navigation size={20} />} label="Overview" active={activeTab === "overview"} onClick={() => handleTabChange("overview")} />
            <NavItem icon={<Info size={20} />} label="My Fleet" active={activeTab === "details"} onClick={() => handleTabChange("details")} />
            <NavItem icon={<Plus size={20} />} label="Add Vehicle" onClick={() => navigate("/add-vehicle")} />
            <NavItem icon={<Wallet size={20} />} label="My Earnings" />
          </nav>

          <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="mt-auto flex items-center gap-3 p-4 text-slate-400 hover:text-red-400 rounded-2xl transition-all">
            <LogOut size={20} /> <span className="font-bold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-4 md:p-8">
        <header className="flex justify-between items-center mb-10">
          <button className="lg:hidden p-2 text-white bg-white/5 rounded-xl" onClick={() => setSidebarOpen(true)}><Menu size={24} /></button>
          <div>
            <h1 className="text-2xl font-bold text-white">Driver Portal</h1>
            <p className="text-slate-500 text-sm">Welcome back, {driver.name}</p>
          </div>
        </header>

        {activeTab === "overview" ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-900 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <span className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                    Primary Vehicle
                  </span>
                  <h2 className="text-4xl font-black text-white mt-4">{driver.vehicle?.name || "No Active Vehicle"}</h2>
                  <p className="text-indigo-200 mt-2 font-mono mb-6">{driver.vehicle?.vehicleNo || "Registration Pending"}</p>
                  <button onClick={handleUpdateLocation} disabled={updatingLocation || !driver.vehicle} className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-all">
                    {updatingLocation ? <Loader2 className="animate-spin" size={18} /> : <MapPin size={18} />}
                    Update GPS Location
                  </button>
                </div>
                <Car size={180} className="absolute -right-5 -bottom-5 text-white/10 rotate-12" />
              </div>
              
              <div className="bg-[#0f0f12] border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-center items-center gap-2">
                <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 mb-2"><Wallet size={32}/></div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Linked UPI</p>
                <h3 className="text-lg font-black text-white truncate w-full text-center">{driver.upiid}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatBox label="Base Rate" value={driver.vehicle ? `₹${driver.vehicle.pricePerKM}/km` : "₹0"} color="text-indigo-400" />
              <StatBox label="Vehicle Type" value={driver.vehicle?.type || "N/A"} color="text-emerald-400" />
              <StatBox label="Capacity" value={driver.vehicle?.capacity ? `${driver.vehicle.capacity} Seats` : "0 Seats"} color="text-blue-400" />
              <StatBox label="Avg Speed" value={driver.vehicle ? `${driver.vehicle.avgSpeed} km/h` : "0 km/h"} color="text-amber-400" />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-end mb-4 px-2">
                <div>
                    <h2 className="text-3xl font-black text-white">My Fleet</h2>
                    <p className="text-slate-500 text-sm">Managing {vehicles.length} registered vehicles</p>
                </div>
                <button onClick={() => navigate("/add-vehicle")} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all">
                    <Plus size={18} /> Add New
                </button>
            </div>

            {loadingVehicles ? (
              <div className="flex flex-col items-center py-20 gap-4">
                <Loader2 className="animate-spin text-emerald-500" size={40} />
                <p className="text-slate-500">Scanning database...</p>
              </div>
            ) : vehicles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {vehicles.map((v) => (
                  <div key={v.id} className="bg-[#0f0f12] border border-white/5 p-8 rounded-[2.5rem] hover:border-white/20 transition-all relative group overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                        <div className="flex gap-6 items-center">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-500">
                                <Car size={32} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-2xl font-black text-white">{v.name}</h3>
                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full">{v.availableStatus}</span>
                                </div>
                                <p className="text-slate-500 font-mono text-sm mt-1">{v.vehicleNo} • {v.type}</p>
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )} 
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${active ? "bg-emerald-500/10 text-emerald-500 border-l-4 border-emerald-500" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
    {icon} <span className="font-bold">{label}</span>
  </div>
);

const StatBox = ({ label, value, color }) => (
  <div className="bg-[#0f0f12] border border-white/5 p-6 rounded-3xl text-center">
    <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">{label}</p>
    <h3 className={`text-2xl font-black mt-2 ${color}`}>{value}</h3>
  </div>
);

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#060608]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium tracking-widest uppercase text-xs">Syncing Fleet...</p>
    </div>
  </div>
);

export default DriverDashboard;