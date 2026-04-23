import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import SpotlightCard from "../../../components/SpotlightCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaTag, FaPlus, FaTrash, FaEdit, FaTimes } from "react-icons/fa";

export default function Discounts() {
  const { discounts, addDiscount, updateDiscount, deleteDiscount, showToast } = useContext(AppContext);
  const [modal, setModal] = useState({ open: false, editing: null });
  const [form, setForm] = useState({ code: "", value: "", type: "Persentase", status: "Aktif", expiry: "" });

  const handleOpen = (disc = null) => {
    setModal({ open: true, editing: disc });
    setForm(disc ? { ...disc } : { code: "", value: "", type: "Persentase", status: "Aktif", expiry: "" });
  };

  const handleSave = () => {
    if (!form.code || !form.value) return showToast("Kode dan Nilai wajib diisi", "error");
    if (modal.editing) {
      updateDiscount({ ...form, id: modal.editing.id });
      showToast("Kupon diperbarui");
    } else {
      addDiscount(form);
      showToast("Kupon baru berhasil dibuat");
    }
    setModal({ open: false, editing: null });
  };

  return (
    <div className="animate-fade-in p-6 lg:p-10 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-2">Diskon</h1>
          <p className="text-slate-500 font-medium">Promo & kupon untuk memikat pelanggan.</p>
        </div>
        <button onClick={() => handleOpen()} className="px-8 py-4 bg-indigo-600 rounded-[24px] text-white font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all">
          <FaPlus className="inline mr-2" /> Buat Kupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {discounts.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: i * 0.05 }}>
              <SpotlightCard className="p-8 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 px-4 py-1 text-[9px] font-black uppercase tracking-widest ${d.status === 'Aktif' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                  {d.status}
                </div>
                <div className="flex gap-4 items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center text-xl">
                    <FaTag />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">{d.code}</h3>
                    <p className="text-xs text-slate-500 font-bold">{d.type}</p>
                  </div>
                </div>
                <div className="text-3xl font-black text-white mb-8">
                  {d.value}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleOpen(d)} className="flex-1 py-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white flex justify-center"><FaEdit /></button>
                  <button onClick={() => { if(window.confirm("Hapus?")) deleteDiscount(d.id); showToast("Dihapus", "info"); }} className="flex-1 py-3 bg-white/5 rounded-2xl hover:bg-rose-500/10 transition-colors text-slate-400 hover:text-rose-500 flex justify-center"><FaTrash /></button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {modal.open && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setModal({ open: false, editing: null })} />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-sm glass-panel rounded-[40px] p-10 border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{modal.editing ? "Edit Kupon" : "Kupon Baru"}</h2>
                <button onClick={() => setModal({ open: false, editing: null })} className="text-slate-500 hover:text-white"><FaTimes /></button>
              </div>
              <div className="space-y-6">
                <InputGroup label="Kode Promo" value={form.code} onChange={v => setForm({...form, code: v})} />
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Nilai" value={form.value} onChange={v => setForm({...form, value: v})} />
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Tipe</label>
                    <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full bg-slate-800 border border-white/5 rounded-2xl py-4 px-4 text-white outline-none text-xs">
                      <option>Persentase</option>
                      <option>Potongan</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full bg-slate-800 border border-white/5 rounded-2xl py-4 px-4 text-white outline-none text-xs">
                    <option>Aktif</option>
                    <option>Non-aktif</option>
                  </select>
                </div>
                <button onClick={handleSave} className="w-full py-5 bg-indigo-600 rounded-[24px] text-white font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all">
                  Simpan Kupon
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const InputGroup = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">{label}</label>
    <input value={value} onChange={e => onChange(e.target.value)} className="w-full bg-slate-800 border border-white/5 rounded-2xl py-4 px-6 text-white outline-none focus:border-indigo-500 transition-all" />
  </div>
);
