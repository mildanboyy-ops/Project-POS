import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHome,
  FaChartBar,
  FaBox,
  FaShoppingCart,
  FaSignOutAlt,
  FaUsers,
  FaTags,
  FaBoxes,
  FaCog,
  FaHistory,
  FaPercent
} from "react-icons/fa";

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { section: "Menu Utama", items: [
      { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
      { icon: <FaShoppingCart />, label: "Penjualan", path: "/dashboard/penjualan" },
      { icon: <FaHistory />, label: "Riwayat", path: "/dashboard/riwayat" },
      { icon: <FaChartBar />, label: "Laporan", path: "/dashboard/laporan" },
    ]},
    { section: "Inventaris", items: [
      { icon: <FaBox />, label: "Produk", path: "/dashboard/produk" },
      { icon: <FaTags />, label: "Kategori", path: "/dashboard/kategori" },
      { icon: <FaBoxes />, label: "Stok", path: "/dashboard/stok" },
      { icon: <FaPercent />, label: "Diskon", path: "/dashboard/diskon" },
    ]},
    { section: "Lainnya", items: [
      { icon: <FaUsers />, label: "Pelanggan", path: "/dashboard/pelanggan" },
      { icon: <FaCog />, label: "Pengaturan", path: "/dashboard/pengaturan" },
    ]}
  ];

  return (
    <motion.div
      className={`sidebar ${open ? "open" : ""}`}
      initial={{ x: -280 }}
      animate={{ x: open ? 0 : -280 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="flex items-center gap-4 mb-14 px-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-black text-white text-2xl shadow-2xl shadow-indigo-500/40">
          K
        </div>
        <h2 className="text-3xl font-black tracking-tighter text-white">Kasir<span className="text-cyan-400">ly</span></h2>
      </div>

      <nav className="flex flex-col gap-1.5 flex-grow overflow-y-auto no-scrollbar">
        {menuItems.map((group, idx) => (
          <React.Fragment key={idx}>
            <p className="text-[10px] uppercase text-slate-500 font-black tracking-[3px] px-4 mt-8 mb-4">{group.section}</p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <SidebarItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  active={location.pathname === item.path || (item.path === "/dashboard" && location.pathname === "/dashboard/")}
                  onClick={() => navigate(item.path)}
                />
              ))}
            </div>
          </React.Fragment>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/5">
        <SidebarItem icon={<FaSignOutAlt />} label="Logout" isDanger onClick={handleLogout} />
      </div>
    </motion.div>
  );
};

const SidebarItem = ({ icon, label, active, onClick, isDanger }) => {
  return (
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-500 group relative overflow-hidden ${
        active 
          ? "bg-indigo-600 text-white shadow-[0_10px_30px_rgba(79,70,229,0.4)]" 
          : isDanger
            ? "hover:bg-rose-500/10 text-rose-500"
            : "text-slate-500 hover:text-white hover:bg-white/5"
      }`}
    >
      {active && (
        <motion.div 
          layoutId="glow"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"
        />
      )}
      <span className={`text-xl transition-transform duration-500 group-hover:scale-110 relative z-10 ${active ? 'text-white' : ''}`}>{icon}</span>
      <span className="font-bold text-sm tracking-tight relative z-10">{label}</span>
      {active && (
        <motion.div 
          layoutId="active-indicator" 
          className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_15px_white] relative z-10" 
        />
      )}
    </motion.div>
  );
};

export default Sidebar;
