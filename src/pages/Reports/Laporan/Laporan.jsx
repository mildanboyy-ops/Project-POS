import React, { useContext, useMemo } from "react";
import { AppContext } from "../../../context/AppContext";
import SpotlightCard from "../../../components/SpotlightCard";
import { motion } from "framer-motion";
import { 
  FaChartLine, FaShoppingBag, 
  FaUsers, FaArrowUp, FaFilePdf, FaFileExcel, FaChartPie
} from "react-icons/fa";

export default function Laporan() {
  const { transactions, products } = useContext(AppContext);

  const totalRevenue = useMemo(() => transactions.reduce((sum, tx) => sum + tx.total, 0), [transactions]);
  const totalOrders = transactions.length;
  const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const formatIDR = (val) => new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0
  }).format(val);

  return (
    <div className="animate-fade-in space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-5xl font-black text-white tracking-tighter">Laporan Bisnis</h1>
          <p className="text-slate-500 font-medium">Data real-time untuk pengambilan keputusan yang lebih baik.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/5 rounded-3xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">
            <FaFilePdf className="text-rose-500" /> Export PDF
          </button>
          <button className="flex items-center gap-3 px-8 py-4 bg-indigo-600 rounded-3xl text-white font-black uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all">
            <FaFileExcel className="text-emerald-300" /> Export Excel
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard label="Total Pendapatan" val={formatIDR(totalRevenue)} color="text-cyan-400" icon={<FaChartLine />} grow="+18.4%" />
        <StatCard label="Total Transaksi" val={totalOrders} color="text-indigo-400" icon={<FaShoppingBag />} grow="+12.5%" />
        <StatCard label="Rata-rata Keranjang" val={formatIDR(avgOrder)} color="text-emerald-400" icon={<FaChartPie />} grow="+5.2%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Chart */}
        <div className="lg:col-span-2">
          <SpotlightCard className="p-10 h-full">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-2xl font-black text-white tracking-tight">Tren Mingguan</h3>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Revenue</span>
              </div>
            </div>
            <div className="flex items-end justify-between h-80 gap-6 px-4">
              {[45, 65, 35, 95, 75, 85, 55].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-6 group">
                  <div className="relative w-full">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className="w-full bg-gradient-to-t from-indigo-600/10 via-indigo-600/30 to-indigo-500 rounded-2xl group-hover:brightness-125 transition-all duration-500 shadow-[0_0_20px_rgba(79,70,229,0.1)]"
                    />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-white text-[9px] font-black py-1 px-2 rounded-lg">
                      {h}%
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-600 font-black uppercase tracking-tighter">{['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'][i]}</span>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>

        {/* Top Products */}
        <SpotlightCard className="p-10">
          <h3 className="text-2xl font-black text-white mb-10 tracking-tight">Produk Terlaris</h3>
          <div className="space-y-10">
            {products.slice(0, 5).map((p, i) => (
              <div key={p.id} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">{p.category}</p>
                    <p className="text-sm font-black text-white">{p.name}</p>
                  </div>
                  <span className="text-xs font-black text-slate-500">{100 - i * 15}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${100 - i * 15}%` }} 
                    className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-full" 
                  />
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}

const StatCard = ({ label, val, color, icon, grow }) => (
  <SpotlightCard className="p-10 flex flex-col justify-between h-full group hover:border-indigo-500/30 transition-all duration-500">
    <div className="flex justify-between items-start mb-10">
      <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/5 flex items-center justify-center text-3xl text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-2xl group-hover:shadow-indigo-600/40 transition-all duration-500">
        {icon}
      </div>
      <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-2xl border border-emerald-500/20">
        <FaArrowUp /> {grow}
      </div>
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[4px] mb-3">{label}</p>
      <h2 className={`text-4xl font-black ${color} tracking-tighter leading-none`}>{val}</h2>
    </div>
  </SpotlightCard>
);
