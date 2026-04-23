import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import SpotlightCard from "../../../components/SpotlightCard";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUser, FaBell, FaShieldAlt, FaDatabase, 
  FaMoon, FaSun, FaDownload, FaUpload, FaTrash, 
  FaPalette, FaGlobe, FaChevronRight, FaStore, FaServer, FaLink, FaKey, FaEdit
} from "react-icons/fa";

export default function Pengaturan() {
  const { darkMode, setDarkMode, showToast, products, transactions, categories, customers } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("Profil Bisnis");
  const [isTestingApi, setIsTestingApi] = useState(false);

  const handleBackup = () => {
    const data = { products, transactions, categories, customers, backupDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kasirly_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast("Database berhasil diekspor");
  };

  const handleTestApi = () => {
    setIsTestingApi(true);
    setTimeout(() => {
      setIsTestingApi(false);
      showToast("Koneksi API Berhasil (Simulasi)", "success");
    }, 2000);
  };

  const tabs = [
    { id: "Profil Bisnis", icon: <FaStore />, desc: "Informasi toko & identitas" },
    { id: "Tampilan", icon: <FaPalette />, desc: "Tema & antarmuka" },
    { id: "Integrasi API", icon: <FaServer />, desc: "Konfigurasi backend" },
    { id: "Data & Keamanan", icon: <FaDatabase />, desc: "Backup & proteksi data" },
  ];

  return (
    <div className="animate-fade-in space-y-10">
      <div className="space-y-1">
        <h1 className="text-6xl font-black text-white tracking-tighter">Pengaturan Sistem</h1>
        <p className="text-slate-500 font-medium text-lg">Konfigurasikan Kasirly sesuai kebutuhan operasional Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Tabs */}
        <div className="md:col-span-4 xl:col-span-3 space-y-4">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-5 p-6 rounded-[32px] transition-all duration-500 group relative overflow-hidden ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30' 
                  : 'bg-white/[0.02] border border-white/5 text-slate-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-white/5 group-hover:scale-110'
              }`}>
                {tab.icon}
              </div>
              <div className="text-left">
                <p className="font-black text-sm uppercase tracking-widest">{tab.id}</p>
                <p className={`text-[10px] font-bold ${activeTab === tab.id ? 'text-indigo-200' : 'text-slate-600'}`}>{tab.desc}</p>
              </div>
              <FaChevronRight className={`ml-auto transition-transform ${activeTab === tab.id ? 'rotate-90' : 'opacity-20'}`} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-8 xl:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <SpotlightCard className="p-12 min-h-[600px] flex flex-col">
                {activeTab === "Profil Bisnis" && (
                  <div className="space-y-10">
                    <div className="flex items-center gap-10 border-b border-white/5 pb-10">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-[40px] bg-gradient-to-tr from-indigo-600 to-cyan-500 p-1 shadow-2xl">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Fajar" className="w-full h-full rounded-[38px] bg-slate-900" alt="Avatar" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 rounded-2xl border-4 border-slate-900 flex items-center justify-center text-white text-xs cursor-pointer hover:scale-110 transition-all">
                          <FaEdit />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Admin Master</h2>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[3px] mt-1">Super Administrator</p>
                        <div className="flex gap-4 mt-6">
                           <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-black rounded-full border border-emerald-500/20">VERIFIED BUSINESS</span>
                           <span className="px-3 py-1 bg-white/5 text-slate-500 text-[9px] font-black rounded-full border border-white/5">PLAN: PRO</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputGroup label="Nama Toko / Bisnis" value="Kasirly Digital Store" />
                      <InputGroup label="Email Operasional" value="mildanboyy@gmail.com" />
                      <InputGroup label="Nomor WhatsApp" value="087892096389" />
                      <InputGroup label="Lokasi Cabang" value="Jakarta Selatan, Indonesia" />
                    </div>
                    <div className="pt-10">
                      <button onClick={() => showToast("Pengaturan profil disimpan")} className="px-12 py-5 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-3xl shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all">
                        Update Informasi
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "Tampilan" && (
                  <div className="space-y-12">
                    <SettingRow 
                      title="Mode Gelap (Dark Mode)" 
                      desc="Gunakan antarmuka gelap untuk mengurangi kelelahan mata."
                      action={
                        <button 
                          onClick={() => setDarkMode(!darkMode)}
                          className={`w-20 h-10 rounded-full relative transition-all duration-500 ${darkMode ? 'bg-indigo-600' : 'bg-slate-700'}`}
                        >
                          <motion.div 
                            animate={{ x: darkMode ? 44 : 4 }}
                            className="absolute top-1 w-8 h-8 bg-white rounded-full flex items-center justify-center text-slate-900"
                          >
                            {darkMode ? <FaMoon size={14} /> : <FaSun size={14} />}
                          </motion.div>
                        </button>
                      }
                    />
                    <SettingRow 
                      title="Animasi UI Premium" 
                      desc="Aktifkan transisi halus dan efek visual di seluruh aplikasi."
                      action={<div className="w-16 h-8 bg-emerald-500/20 border border-emerald-500/30 rounded-full relative"><div className="absolute right-1 top-1 w-6 h-6 bg-emerald-400 rounded-full"></div></div>}
                    />
                    <SettingRow 
                      title="Bahasa Sistem" 
                      desc="Pilih bahasa yang digunakan untuk antarmuka pengguna."
                      action={<div className="px-6 py-3 bg-white/5 border border-white/5 rounded-2xl text-xs font-black text-white flex items-center gap-3"><FaGlobe className="text-cyan-400" /> INDONESIA</div>}
                    />
                  </div>
                )}

                {activeTab === "Integrasi API" && (
                  <div className="space-y-10">
                    <div className="flex items-center gap-4 p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-[32px]">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl">
                         <FaServer />
                      </div>
                      <div>
                        <h4 className="text-white font-black text-lg">Mode Pengembang</h4>
                        <p className="text-slate-500 text-xs font-medium">Hubungkan aplikasi Kasirly ke Backend API kustom Anda.</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
                            <FaLink className="text-indigo-500" /> API Base URL
                          </label>
                          <input 
                            placeholder="https://api.bisnisanda.com/v1"
                            className="w-full bg-slate-900 border border-white/5 rounded-[24px] py-5 px-8 text-white outline-none focus:border-indigo-500 transition-all text-sm font-medium" 
                          />
                          <p className="text-[9px] text-slate-600 ml-4">*Pastikan endpoint API mengizinkan CORS dari domain ini.</p>
                       </div>

                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
                            <FaKey className="text-cyan-500" /> API Secret / Token
                          </label>
                          <input 
                            type="password"
                            placeholder="Bearer your_secret_token_here"
                            className="w-full bg-slate-900 border border-white/5 rounded-[24px] py-5 px-8 text-white outline-none focus:border-indigo-500 transition-all text-sm font-medium" 
                          />
                       </div>

                       <div className="flex gap-4 pt-6">
                          <button 
                            onClick={handleTestApi}
                            disabled={isTestingApi}
                            className={`flex-1 py-5 rounded-[24px] font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 ${
                              isTestingApi ? 'bg-white/5 text-slate-500' : 'bg-white/5 text-white hover:bg-white/10'
                            }`}
                          >
                            {isTestingApi ? "Menghubungkan..." : "Cek Koneksi API"}
                          </button>
                          <button onClick={() => showToast("Konfigurasi API disimpan")} className="flex-1 py-5 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs rounded-[24px] shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all">
                            Simpan Endpoint
                          </button>
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === "Data & Keamanan" && (
                  <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[40px] space-y-6 group hover:border-indigo-500/40 transition-all">
                        <div className="w-16 h-16 rounded-3xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center text-3xl"><FaDownload /></div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-black text-white tracking-tight">Ekspor Database</h4>
                          <p className="text-sm text-slate-500 font-medium">Backup seluruh data transaksi dan inventaris dalam format JSON.</p>
                        </div>
                        <button onClick={handleBackup} className="w-full py-4 bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-indigo-600 hover:text-white transition-all">
                          Mulai Backup
                        </button>
                      </div>
                      <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[40px] space-y-6 group hover:border-cyan-500/40 transition-all">
                        <div className="w-16 h-16 rounded-3xl bg-cyan-600/10 text-cyan-400 flex items-center justify-center text-3xl"><FaUpload /></div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-black text-white tracking-tight">Impor Database</h4>
                          <p className="text-sm text-slate-500 font-medium">Pulihkan data dari file backup sebelumnya secara instan.</p>
                        </div>
                        <button onClick={() => showToast("Fungsi impor sedang dikembangkan", "info")} className="w-full py-4 bg-cyan-600/10 border border-cyan-600/20 text-cyan-400 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-cyan-600 hover:text-white transition-all">
                          Unggah Backup
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const SettingRow = ({ title, desc, action }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:bg-white/[0.04] transition-all">
    <div className="space-y-2">
      <h4 className="text-xl font-black text-white tracking-tight">{title}</h4>
      <p className="text-sm text-slate-500 font-medium">{desc}</p>
    </div>
    <div className="flex-shrink-0">
      {action}
    </div>
  </div>
);

const InputGroup = ({ label, value }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">{label}</label>
    <input 
      defaultValue={value} 
      className="w-full bg-slate-900 border border-white/5 rounded-[24px] py-5 px-8 text-white outline-none focus:border-indigo-500 transition-all text-sm font-medium" 
    />
  </div>
);
