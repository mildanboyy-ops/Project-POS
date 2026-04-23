import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import SpotlightCard from "../../../components/SpotlightCard";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaSearch, FaCalendarAlt, FaDownload, 
  FaEye, FaTrashAlt, FaShoppingBag, FaArrowRight, FaTimes
} from "react-icons/fa";

export default function History() {
  const { transactions, deleteTransaction, showToast } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [selectedTx, setSelectedTx] = useState(null);

  const filtered = transactions.filter(tx => 
    tx.id.toLowerCase().includes(search.toLowerCase())
  );

  const formatIDR = (val) => new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0
  }).format(val);

  return (
    <div className="animate-fade-in p-6 lg:p-10 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-2">Riwayat</h1>
          <p className="text-slate-500 font-medium">Jejak seluruh transaksi bisnis Anda.</p>
        </div>
        <div className="relative w-full md:w-80 group">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="text" placeholder="Cari ID Transaksi..." 
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-indigo-500/40 transition-all"
          />
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filtered.map((tx, idx) => (
            <motion.div key={tx.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <SpotlightCard className="p-6 flex flex-col md:flex-row justify-between items-center gap-6 group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <FaShoppingBag />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{tx.id}</h3>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                      {new Date(tx.date).toLocaleDateString()} • {new Date(tx.date).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <p className="text-2xl font-black text-white">{formatIDR(tx.total)}</p>
                    <span className="text-[9px] font-black text-emerald-500 uppercase bg-emerald-500/10 px-2 py-0.5 rounded-full">{tx.status}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedTx(tx)} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-all"><FaEye /></button>
                    <button onClick={() => { if(window.confirm("Hapus riwayat ini?")) deleteTransaction(tx.id); showToast("Dihapus", "info"); }} className="p-3 bg-white/5 rounded-xl hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-all"><FaTrashAlt /></button>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && <div className="py-20 text-center text-slate-500 font-bold uppercase tracking-[4px] opacity-20">No Records Found</div>}
      </div>

      <AnimatePresence>
        {selectedTx && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedTx(null)} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="relative w-full max-w-md glass-panel rounded-[40px] p-10 border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-white tracking-tighter">DETAIL ORDER</h2>
                <button onClick={() => setSelectedTx(null)} className="text-slate-500 hover:text-white"><FaTimes /></button>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                  {selectedTx.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-slate-400 font-bold">{item.qty}x <span className="text-white">{item.name}</span></span>
                      <span className="text-white font-black">{formatIDR(item.price * item.qty)}</span>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-white/10 flex justify-between text-xl font-black">
                    <span className="text-slate-500">TOTAL</span>
                    <span className="text-cyan-400">{formatIDR(selectedTx.total)}</span>
                  </div>
                </div>
                <button onClick={() => { showToast("Mencetak...", "info"); setSelectedTx(null); }} className="w-full py-5 bg-indigo-600 rounded-[24px] text-white font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all">
                  Cetak Ulang Struk
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
