import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExclamationTriangle, FaCheckCircle, FaBoxes } from "react-icons/fa";
import { AppContext } from "../../../context/AppContext";
import SpotlightCard from "../../../components/SpotlightCard";
import ShinyText from "../../../components/ShinyText";

const Stok = () => {
  const navigate = useNavigate();
  const { products } = useContext(AppContext);

  const lowStock = products.filter(p => p.stock <= 10);
  const normalStock = products.filter(p => p.stock > 10 && p.stock <= 50);
  const highStock = products.filter(p => p.stock > 50);

  return (
    <div className="animate-fade-in space-y-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div className="space-y-1">
          <h1 className="text-6xl font-black text-white tracking-tighter">Monitoring Stok</h1>
          <p className="text-slate-500 font-medium text-lg">Pantau ketersediaan inventaris Anda secara real-time.</p>
        </div>
        <button onClick={() => navigate("/dashboard")} className="px-8 py-4 bg-white/5 border border-white/5 rounded-3xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all flex items-center gap-3">
          <FaArrowLeft /> Kembali ke Dashboard
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StockStat icon={<FaExclamationTriangle />} label="Stok Rendah" value={lowStock.length} color="rose" meta="≤ 10 unit" />
        <StockStat icon={<FaBoxes />} label="Stok Normal" value={normalStock.length} color="amber" meta="11 - 50 unit" />
        <StockStat icon={<FaCheckCircle />} label="Stok Aman" value={highStock.length} color="emerald" meta="> 50 unit" />
      </div>

      {/* Stock Table */}
      <SpotlightCard className="p-10 border-white/5">
        <h3 className="text-2xl font-black text-white mb-10 tracking-tight flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xl">
             <FaBoxes />
          </div>
          Detail Inventaris
        </h3>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-[3px]">
                <th className="pb-6 px-4">Produk</th>
                <th className="pb-6 px-4">Kategori</th>
                <th className="pb-6 px-4">Stok Saat Ini</th>
                <th className="pb-6 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => (
                <motion.tr 
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{p.emoji}</span>
                      <span className="text-white font-black tracking-tight">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full">{p.category}</span>
                  </td>
                  <td className="py-6 px-4">
                    <span className="text-xl font-black text-white">{p.stock} <span className="text-[10px] text-slate-500 ml-1">UNIT</span></span>
                  </td>
                  <td className="py-6 px-4">
                    <span className={`px-4 py-1.5 rounded-2xl text-[9px] font-black uppercase tracking-widest border ${
                      p.stock <= 10 
                        ? "bg-rose-500/10 text-rose-500 border-rose-500/20" 
                        : p.stock <= 50
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}>
                      {p.stock <= 10 ? "Kritis" : p.stock <= 50 ? "Perlu Re-stock" : "Tersedia"}
                    </span>
                  </td>
                </motion.tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan="4" className="py-20 text-center text-slate-500 font-black uppercase tracking-[4px] opacity-30">Belum ada data produk</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </SpotlightCard>
    </div>
  );
};

const StockStat = ({ icon, label, value, color, meta }) => (
  <SpotlightCard className="p-10 group" spotlightColor={`rgba(${color === 'rose' ? '244,63,94' : color === 'amber' ? '245,158,11' : '16,185,129'}, 0.1)`}>
    <div className="flex justify-between items-start mb-8">
      <div className={`w-16 h-16 rounded-[24px] bg-${color}-500/10 text-${color}-500 flex items-center justify-center text-2xl border border-${color}-500/20 shadow-2xl shadow-${color}-500/10 group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{meta}</span>
    </div>
    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[4px] mb-2">{label}</p>
    <h2 className={`text-4xl font-black text-white tracking-tighter`}>{value} <span className={`text-sm text-${color}-500`}>Item</span></h2>
  </SpotlightCard>
);

export default Stok;
