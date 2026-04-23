import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FaPlus, FaShoppingCart, FaWallet, FaChevronRight, FaArrowUp
} from "react-icons/fa";
import { AppContext } from "../../../context/AppContext";
import SpotlightCard from "../../../components/SpotlightCard";
import ShinyText from "../../../components/ShinyText";

const Landing = () => {
  const { products, transactions, balance, withdrawFunds } = useContext(AppContext);
  const navigate = useNavigate();

  const totalSales = useMemo(() => transactions.reduce((s, t) => s + t.total, 0), [transactions]);
  const lowStockProducts = useMemo(() => products.filter(p => p.stock <= 10), [products]);

  const formatIDR = (val) => new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0
  }).format(val);

  return (
    <div className="animate-fade-in space-y-12 p-2 lg:p-4">
      {/* ═══════ HEADER ═══════ */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-2">
          <h1 className="text-7xl font-black text-white tracking-tighter leading-none">
            <ShinyText text="Kasirly" speed={3} /> <span className="text-slate-800">Pro</span>
          </h1>
          <p className="text-slate-500 font-medium text-xl max-w-md tracking-tight">
            Ringkasan performa bisnis Anda hari ini.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate("/dashboard/penjualan")}
            className="px-10 py-5 bg-indigo-600 text-white font-black uppercase tracking-widest text-[11px] rounded-[32px] shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <FaShoppingCart /> Buka Kasir
          </button>
        </div>
      </div>

      {/* ═══════ MAIN STATS ═══════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatWidget label="Total Penjualan" value={formatIDR(totalSales)} trend="+12.5%" color="indigo" />
        <StatWidget label="Saldo Tersedia" value={formatIDR(balance)} trend="Siap Tarik" color="cyan" />
        <StatWidget label="Produk Aktif" value={products.length} trend="Inventory" color="emerald" />
        <StatWidget label="Total Transaksi" value={transactions.length} trend="Bulan Ini" color="amber" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* ═══════ CHART AREA ═══════ */}
        <div className="xl:col-span-8 space-y-10">
          <SpotlightCard className="p-12 border-white/5 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-16">
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-white tracking-tight">Grafik Penjualan</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Aktivitas 7 Hari Terakhir</p>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Updates</span>
              </div>
            </div>
            
            <div className="flex items-end justify-between h-80 gap-6 px-4">
              {[35, 60, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-6 group/bar">
                  <div className="relative w-full">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                      className="w-full bg-gradient-to-t from-indigo-600/5 via-indigo-600/20 to-indigo-500 rounded-[20px] group-hover/bar:shadow-[0_0_40px_rgba(79,70,229,0.2)] transition-all duration-500"
                    />
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-white text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black pointer-events-none">
                      {h}%
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-600 font-black uppercase tracking-tighter">H-{7-i}</span>
                </div>
              ))}
            </div>
          </SpotlightCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Quick Actions Removed - Icons cleaned */}
            <SpotlightCard className="p-10 border-white/5 bg-indigo-600/5 group">
               <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-2xl shadow-indigo-600/30">
                    <FaWallet />
                  </div>
                  <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-400 text-[9px] font-black rounded-full border border-indigo-500/10 uppercase tracking-widest">Payout</span>
               </div>
               <h3 className="text-xl font-black text-white mb-2 tracking-tight">Tarik Saldo</h3>
               <p className="text-slate-500 text-sm font-medium mb-8">Pindahkan saldo penjualan ke rekening Anda secara instan.</p>
               <button 
                 onClick={() => {
                   const amt = window.prompt("Nominal Penarikan (IDR):");
                   if (amt) withdrawFunds(Number(amt));
                 }}
                 className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
               >
                 Proses Penarikan
               </button>
            </SpotlightCard>

            <SpotlightCard className="p-10 border-white/5 group">
               <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-600 flex items-center justify-center text-white text-2xl shadow-2xl shadow-emerald-600/30">
                    <FaPlus />
                  </div>
                  <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-[9px] font-black rounded-full border border-emerald-500/10 uppercase tracking-widest">Inventory</span>
               </div>
               <h3 className="text-xl font-black text-white mb-2 tracking-tight">Tambah Produk</h3>
               <p className="text-slate-500 text-sm font-medium mb-8">Input stok produk baru ke dalam sistem inventaris Kasirly.</p>
               <button 
                 onClick={() => navigate("/dashboard/produk")}
                 className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
               >
                 Buka Inventaris
               </button>
            </SpotlightCard>
          </div>
        </div>

        {/* ═══════ ACTIVITY FEED ═══════ */}
        <div className="xl:col-span-4 space-y-10">
          <SpotlightCard className="p-10 border-white/5 h-full">
            <div className="flex justify-between items-center mb-12">
               <div className="space-y-1">
                <h3 className="text-2xl font-black text-white tracking-tight">Aktivitas</h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[3px]">Terbaru</p>
              </div>
              <button onClick={() => navigate("/dashboard/riwayat")} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all">
                <FaChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-8 relative">
              {/* Vertical line connector */}
              <div className="absolute left-[19px] top-4 bottom-4 w-px bg-white/5"></div>

              {transactions.slice(0, 5).map((tx, idx) => (
                <div key={tx.id} className="relative flex items-start gap-6 group">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border-4 border-[#020617] flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform"></div>
                  </div>
                  <div className="flex-grow space-y-1 pt-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-black text-white tracking-tight">{tx.id}</p>
                      <span className="text-[9px] font-black text-emerald-400 uppercase">+{formatIDR(tx.total)}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      {new Date(tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {tx.items.length} Item
                    </p>
                  </div>
                </div>
              ))}

              {lowStockProducts.length > 0 && (
                <div className="pt-8 mt-8 border-t border-white/5">
                  <p className="text-[10px] font-black text-rose-500 uppercase tracking-[3px] mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span> Stok Kritis
                  </p>
                  <div className="space-y-4">
                    {lowStockProducts.slice(0, 3).map(p => (
                      <div key={p.id} className="flex justify-between items-center p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{p.emoji}</span>
                          <span className="text-xs font-bold text-white truncate w-24">{p.name}</span>
                        </div>
                        <span className="text-[10px] font-black text-rose-500">{p.stock} Unit</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
};

const StatWidget = ({ label, value, trend, color }) => {
  const colorMap = {
    indigo: "text-indigo-400",
    cyan: "text-cyan-400",
    emerald: "text-emerald-400",
    amber: "text-amber-400"
  };
  return (
    <SpotlightCard className="p-10 border-white/5 bg-white/[0.02] group">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[3px] mb-10 group-hover:text-white transition-colors">{label}</p>
      <div className="space-y-2">
        <h2 className={`text-3xl font-black ${colorMap[color]} tracking-tighter`}>{value}</h2>
        <div className="flex items-center gap-2">
          <FaArrowUp className="text-[8px] text-emerald-500" />
          <span className="text-[10px] font-bold text-slate-500 tracking-tight">{trend}</span>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default Landing;