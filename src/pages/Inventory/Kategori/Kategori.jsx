import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import SpotlightCard from "../../../components/SpotlightCard";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaEdit, FaTimes, FaTags } from "react-icons/fa";

export default function Kategori() {
  const { categories, addCategory, updateCategory, deleteCategory, showToast } = useContext(AppContext);
  const [modal, setModal] = useState({ open: false, editing: null });
  const [form, setForm] = useState({ name: "", emoji: "📦" });

  const handleOpen = (cat = null) => {
    setModal({ open: true, editing: cat });
    setForm(cat ? { ...cat } : { name: "", emoji: "📦" });
  };

  const handleSave = () => {
    if (!form.name) return showToast("Nama kategori wajib diisi", "error");
    if (modal.editing) {
      updateCategory({ ...form, id: modal.editing.id });
      showToast("Kategori berhasil diperbarui");
    } else {
      addCategory(form);
      showToast("Kategori baru telah ditambahkan");
    }
    setModal({ open: false, editing: null });
  };

  return (
    <div className="animate-fade-in space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <h1 className="text-6xl font-black text-white tracking-tighter">Kategori Produk</h1>
          <p className="text-slate-500 font-medium text-lg">Kelola pengelompokan inventaris Anda agar lebih terorganisir.</p>
        </div>
        <button 
          onClick={() => handleOpen()}
          className="px-10 py-4 bg-indigo-600 rounded-[28px] text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all"
        >
          <FaPlus className="inline mr-3" /> Tambah Kategori
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        <AnimatePresence mode="popLayout">
          {categories.map((c, i) => (
            <motion.div 
              key={c.id} 
              layout 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <SpotlightCard className="p-10 text-center group relative overflow-hidden h-full flex flex-col items-center">
                <div className="w-24 h-24 rounded-[40px] bg-white/[0.03] border border-white/5 flex items-center justify-center text-5xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                  {c.emoji}
                </div>
                <h3 className="text-xl font-black text-white mb-10 tracking-tight">{c.name}</h3>
                
                <div className="mt-auto flex gap-4 w-full">
                  <button onClick={() => handleOpen(c)} className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-slate-500 hover:text-white flex justify-center items-center text-sm"><FaEdit /></button>
                  <button onClick={() => { if(window.confirm("Hapus?")) deleteCategory(c.id); showToast("Terhapus", "info"); }} className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-rose-500/10 transition-all text-slate-500 hover:text-rose-500 flex justify-center items-center text-sm"><FaTrash /></button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal.open && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setModal({ open: false, editing: null })} />
            <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }} className="relative w-full max-w-md glass-panel rounded-[48px] p-12 border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-12">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black text-white tracking-tighter">{modal.editing ? "Edit Kategori" : "Kategori Baru"}</h2>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[3px]">Pengaturan Label Inventaris</p>
                </div>
                <button onClick={() => setModal({ open: false, editing: null })} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all"><FaTimes /></button>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Nama Kategori</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Makanan, Minuman, dsb..." className="w-full bg-slate-900 border border-white/5 rounded-[24px] py-5 px-8 text-white outline-none focus:border-indigo-500 transition-all text-sm font-medium" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Emoji / Ikon</label>
                  <input value={form.emoji} onChange={e => setForm({...form, emoji: e.target.value})} className="w-full bg-slate-900 border border-white/5 rounded-[24px] py-5 px-8 text-white outline-none focus:border-indigo-500 transition-all text-sm font-medium" />
                </div>
                <button onClick={handleSave} className="w-full py-6 bg-indigo-600 rounded-[28px] text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-600/40 hover:scale-[1.02] active:scale-95 transition-all mt-4">
                  Simpan Kategori
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
