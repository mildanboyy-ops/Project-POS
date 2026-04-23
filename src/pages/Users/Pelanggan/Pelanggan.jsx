import React, { useContext, useState, useMemo } from "react";
import { AppContext } from "../../../context/AppContext";
import SpotlightCard from "../../../components/SpotlightCard";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUserPlus, FaTrash, FaEdit, FaTimes, FaPhone, 
  FaMapMarkerAlt, FaSearch, FaUserCircle, FaStar
} from "react-icons/fa";

export default function Pelanggan() {
  const { customers, addCustomer, updateCustomer, deleteCustomer, showToast } = useContext(AppContext);
  const [modal, setModal] = useState({ open: false, editing: null });
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.phone.includes(searchTerm)
    );
  }, [customers, searchTerm]);

  const handleOpen = (cust = null) => {
    setModal({ open: true, editing: cust });
    setForm(cust ? { ...cust } : { name: "", phone: "", address: "" });
  };

  const handleSave = () => {
    if (!form.name || !form.phone) return showToast("Nama dan Telepon wajib diisi", "error");
    if (modal.editing) {
      updateCustomer({ ...form, id: modal.editing.id });
      showToast("Data pelanggan diperbarui");
    } else {
      addCustomer(form);
      showToast("Pelanggan baru ditambahkan");
    }
    setModal({ open: false, editing: null });
  };

  return (
    <div className="animate-fade-in space-y-10">
      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div className="space-y-1">
          <h1 className="text-6xl font-black text-white tracking-tighter">Database Pelanggan</h1>
          <p className="text-slate-500 font-medium">Bangun hubungan jangka panjang dengan pelanggan setia Anda.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="relative group">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Cari pelanggan..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/5 rounded-[24px] py-4 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-indigo-500/40 transition-all w-full md:w-64"
            />
          </div>
          <button onClick={() => handleOpen()} className="px-10 py-4 bg-indigo-600 rounded-[24px] text-white font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all">
            <FaUserPlus className="inline mr-3" /> Tambah Pelanggan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MiniStat icon={<FaUserCircle />} label="Total Pelanggan" value={customers.length} color="indigo" />
        <MiniStat icon={<FaStar />} label="Pelanggan Loyal" value={Math.floor(customers.length * 0.4)} color="cyan" />
        <MiniStat icon={<FaUserPlus />} label="Bulan Ini" value="+12" color="emerald" />
        <MiniStat icon={<FaPhone />} label="Active Contact" value={customers.length} color="purple" />
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredCustomers.map((c, i) => (
            <motion.div 
              key={c.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <SpotlightCard className="p-10 group relative overflow-hidden h-full flex flex-col">
                <div className="flex gap-6 items-center mb-10">
                  <div className="w-20 h-20 rounded-[32px] bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 shadow-2xl shadow-indigo-500/20">
                    <div className="w-full h-full rounded-[30px] bg-slate-900 flex items-center justify-center text-3xl font-black text-white">
                      {c.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors leading-tight">{c.name}</h3>
                    <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase mt-1 tracking-widest">
                      <FaPhone size={10} /> {c.phone}
                    </div>
                  </div>
                </div>

                <div className="flex-grow space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                    <FaMapMarkerAlt className="text-indigo-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      {c.address || "Belum ada informasi alamat yang tersimpan."}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase rounded-full tracking-widest">LOYAL MEMBER</span>
                    <span className="px-3 py-1 bg-white/5 text-slate-500 text-[9px] font-black uppercase rounded-full tracking-widest">REG NO: #{1000 + c.id}</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-10">
                  <button onClick={() => handleOpen(c)} className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all text-slate-400 hover:text-white flex justify-center items-center gap-2 text-xs font-black uppercase tracking-widest">
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => { if(window.confirm("Hapus pelanggan ini?")) deleteCustomer(c.id); showToast("Dihapus", "info"); }} className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-rose-500/10 transition-all text-slate-400 hover:text-rose-500 flex justify-center items-center gap-2 text-xs font-black uppercase tracking-widest">
                    <FaTrash /> Hapus
                  </button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredCustomers.length === 0 && (
          <div className="col-span-full py-32 text-center space-y-4 opacity-30">
             <FaUserCircle className="text-7xl mx-auto text-slate-700" />
             <p className="text-xl font-black text-slate-500 uppercase tracking-[8px]">Pelanggan Tidak Ditemukan</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal.open && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setModal({ open: false, editing: null })} />
            <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }} className="relative w-full max-w-lg glass-panel rounded-[48px] p-12 border border-white/10 shadow-2xl">
              <div className="flex justify-between items-center mb-12">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black text-white tracking-tighter">{modal.editing ? "Update Profile" : "Registrasi Baru"}</h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Informasi CRM Pelanggan</p>
                </div>
                <button onClick={() => setModal({ open: false, editing: null })} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all"><FaTimes /></button>
              </div>
              <div className="space-y-8">
                <InputGroup label="Nama Lengkap" value={form.name} onChange={v => setForm({...form, name: v})} placeholder="Masukkan nama pelanggan..." />
                <InputGroup label="Nomor Telepon / WhatsApp" value={form.phone} onChange={v => setForm({...form, phone: v})} placeholder="08xxxxxxxxx" />
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Alamat Domisili</label>
                  <textarea 
                    value={form.address} 
                    onChange={e => setForm({...form, address: e.target.value})} 
                    placeholder="Alamat lengkap pengiriman atau rumah..."
                    className="w-full bg-slate-900 border border-white/5 rounded-3xl py-5 px-8 text-white outline-none focus:border-indigo-500 transition-all h-32 no-scrollbar resize-none text-sm" 
                  />
                </div>
                <button onClick={handleSave} className="w-full py-6 bg-indigo-600 rounded-[28px] text-white font-black uppercase tracking-widest shadow-2xl shadow-indigo-600/40 hover:scale-[1.02] active:scale-95 transition-all mt-4">
                  Simpan Perubahan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const MiniStat = ({ icon, label, value, color }) => (
  <SpotlightCard className="p-8 flex items-center gap-6 group">
    <div className={`w-14 h-14 rounded-2xl bg-${color}-500/10 text-${color}-400 flex items-center justify-center text-2xl group-hover:bg-${color}-500 group-hover:text-white transition-all duration-500`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-black text-white tracking-tight">{value}</p>
    </div>
  </SpotlightCard>
);

const InputGroup = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">{label}</label>
    <input 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      placeholder={placeholder}
      className="w-full bg-slate-900 border border-white/5 rounded-[24px] py-5 px-8 text-white outline-none focus:border-indigo-500 transition-all text-sm" 
    />
  </div>
);
