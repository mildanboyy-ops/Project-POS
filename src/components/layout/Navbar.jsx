import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaSearch, FaUser, FaCog, FaSignOutAlt, FaChevronDown, FaBell, FaMoon, FaSun, FaWallet, FaSync, FaCalendarAlt, FaCommentAlt, FaQuestionCircle } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = ({ open, setOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [time, setTime] = useState(new Date());
  const { darkMode, setDarkMode, balance } = useContext(AppContext);
  const [activeIcon, setActiveIcon] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const greeting = hours < 12 ? "Selamat Pagi" : hours < 17 ? "Selamat Siang" : "Selamat Malam";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="navbar glass-panel rounded-2xl flex justify-between items-center px-6 py-4 shadow-xl">
      <div className="flex items-center gap-4">
        <button onClick={() => setOpen(!open)} className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
          <FaBars size={20} />
        </button>
        <div className="relative hidden md:block">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Cari apapun..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-900/50 border border-white/10 rounded-full py-2 pl-10 pr-12 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all w-64" 
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 pointer-events-none">
            <span className="text-[10px] text-slate-500 font-bold">⌘</span>
            <span className="text-[10px] text-slate-500 font-bold">K</span>
          </div>
          {searchQuery && (
            <div className="absolute top-full left-0 w-full mt-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl p-2 z-50">
              <p className="text-[10px] uppercase text-slate-500 font-bold px-2 py-1">Hasil Pencarian</p>
              <div className="text-sm text-slate-300 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                Mencari "{searchQuery}"...
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Clock & Greeting - Hidden on small mobile */}
        {/* NEW: Navigation Shortcuts */}
        <div className="hidden xl:flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
          <NavIcon 
            icon={<FaCalendarAlt />} 
            active={activeIcon === 'calendar'} 
            onClick={() => setActiveIcon('calendar')} 
            tooltip="Kalender"
          />
          <NavIcon 
            icon={<FaCommentAlt />} 
            active={activeIcon === 'chat'} 
            onClick={() => setActiveIcon('chat')} 
            tooltip="Pesan"
          />
          <NavIcon 
            icon={<FaQuestionCircle />} 
            active={activeIcon === 'support'} 
            onClick={() => setActiveIcon('support')} 
            tooltip="Bantuan"
          />
        </div>

        {/* Sync Status */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsSyncing(true);
            setTimeout(() => setIsSyncing(false), 2000);
          }}
          className={`relative p-2 rounded-lg transition-colors ${isSyncing ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          <FaSync className={isSyncing ? 'animate-spin' : ''} size={18} />
          {isSyncing && <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>}
        </motion.button>

        <div className="hidden lg:flex flex-col items-end">
          <p className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
            {time.toLocaleTimeString('id-ID', { hour12: false })}
          </p>
          <p className="text-sm text-slate-400">
            {greeting}, <span className="text-white font-medium">Admin</span>
          </p>
        </div>

        {/* Notification Bell */}
        <div className="relative group cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
          <FaBell className="text-slate-400 group-hover:text-white" size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-900"></span>
        </div>

        <div className="relative">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">Admin User</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
            <div className="w-11 h-11 rounded-2xl p-0.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 shadow-lg relative">
              <div className="w-full h-full rounded-[14px] overflow-hidden border-2 border-slate-900">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Fajar&backgroundColor=b6e3f4" 
                  alt="Admin" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-lg"></div>
            </div>
            <FaChevronDown size={12} className={`text-slate-500 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
          </div>

          <AnimatePresence>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 p-2"
                >
                  <div className="px-3 py-3 mb-2 bg-white/5 rounded-xl">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Saldo Tersedia</p>
                    <p className="text-lg font-bold text-white flex items-center gap-2">
                      <FaWallet className="text-cyan-400" />
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(balance)}
                    </p>
                  </div>

                  <DropdownItem icon={<FaUser />} label="Profil Saya" onClick={() => { setProfileOpen(false); navigate("/dashboard/pengaturan"); }} />
                  
                  {/* Theme Toggle Item */}
                  <div 
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer hover:bg-white/5 transition-colors text-slate-300"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{darkMode ? <FaSun className="text-amber-400" /> : <FaMoon className="text-indigo-400" />}</span>
                      <span className="text-sm font-medium">{darkMode ? "Mode Terang" : "Mode Gelap"}</span>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${darkMode ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                      <motion.div 
                        animate={{ x: darkMode ? 20 : 2 }}
                        initial={false}
                        className="absolute top-1 w-3 h-3 bg-white rounded-full"
                      />
                    </div>
                  </div>

                  <DropdownItem icon={<FaCog />} label="Pengaturan" onClick={() => { setProfileOpen(false); navigate("/dashboard/pengaturan"); }} />
                  <div className="h-px bg-white/5 my-2"></div>
                  <DropdownItem icon={<FaSignOutAlt />} label="Keluar" isDanger onClick={handleLogout} />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

const DropdownItem = ({ icon, label, onClick, isDanger }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
      isDanger ? 'text-rose-400 hover:bg-rose-500/10' : 'text-slate-300 hover:bg-white/5'
    }`}
  >
    <span className="text-sm">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const NavIcon = ({ icon, active, onClick, tooltip }) => (
  <motion.div 
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`relative group cursor-pointer p-2.5 rounded-xl transition-all duration-300 ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40' : 'text-slate-400 hover:text-white hover:bg-white/10'
    }`}
  >
    <span className="text-sm md:text-base">{icon}</span>
    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border border-white/10 pointer-events-none whitespace-nowrap z-50">
      {tooltip}
    </div>
  </motion.div>
);

export default Navbar;
