import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaTwitter, FaInstagram, FaLinkedin,
  FaArrowRight, FaCheckCircle, FaGlobe, FaShieldAlt, FaChartPie, FaBolt, FaBoxOpen, FaUsers,
  FaShoppingCart, FaWallet, FaHistory
} from "react-icons/fa";
import ShinyText from "../../../components/ShinyText";
import SpotlightCard from "../../../components/SpotlightCard";
import "./PublicLanding.css";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" }
  })
};

const PublicLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="public-landing">
      {/* ═══════ NAVBAR ═══════ */}
      <nav className="public-nav">
        <div className="brand">
          <div className="brand-logo">K</div>
          <h2>Kasir<span>ly</span></h2>
        </div>
        <div className="nav-links hidden md:flex">
          <a href="#features">Fitur</a>
          <a href="#testimonials">Layanan</a>
          <a href="#contact">Kontak</a>
        </div>
        <button className="nav-login-btn" onClick={() => navigate("/login")}>
          Masuk
        </button>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="hero-section overflow-hidden min-h-screen flex flex-col justify-center py-20 px-4">
        <div className="hero-blob blob-a"></div>
        <div className="hero-blob blob-b"></div>

        <motion.div
          className="hero-content relative z-10 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <motion.div className="flex items-center gap-3 mx-auto w-fit mb-10 px-6 py-2 bg-white/5 border border-white/5 rounded-full" variants={fadeUp} custom={0}>
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[3px]">The Next Gen POS for UMKM</span>
          </motion.div>

          <motion.h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.9] mb-10" variants={fadeUp} custom={1}>
            Business <br />
            <ShinyText text="Simplified." speed={3} />
          </motion.h1>

          <motion.p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium tracking-tight mb-16" variants={fadeUp} custom={2}>
            Beralih dari pembukuan manual ke era digital. Pantau stok, analisis penjualan, dan kelola pelanggan dalam satu dashboard premium yang dirancang untuk kecepatan.
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-6" variants={fadeUp} custom={3}>
            <button
              className="px-12 py-6 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs rounded-[32px] shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
              onClick={() => navigate("/login")}
            >
              Mulai Sekarang <FaArrowRight />
            </button>
            <button
              className="px-12 py-6 bg-white/5 border border-white/5 text-white font-black uppercase tracking-widest text-xs rounded-[32px] hover:bg-white/10 transition-all"
              onClick={() => navigate("/login")}
            >
              Lihat Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Real Dynamic Dashboard Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-32 w-full max-w-6xl mx-auto px-4"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-[60px] blur-3xl opacity-10"></div>
            <div className="relative bg-[#020617] border border-white/10 rounded-[48px] overflow-hidden shadow-2xl">
              {/* Window Controls */}
              <div className="h-12 bg-white/[0.03] flex items-center px-8 gap-3 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                </div>
                <div className="flex-grow text-center">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-[4px] ml-[-40px]">kasirly-dashboard.v1</span>
                </div>
              </div>
              
              {/* Mock Dashboard Content */}
              <div className="p-8 md:p-12 flex gap-10">
                {/* Mock Sidebar */}
                <div className="hidden lg:block w-48 space-y-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 mb-10"></div>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-3 rounded-full ${i === 1 ? 'bg-white/20 w-32' : 'bg-white/5 w-24'}`}></div>
                  ))}
                </div>
                
                {/* Mock Main Content */}
                <div className="flex-grow space-y-10">
                   <div className="flex justify-between items-end">
                      <div className="space-y-3">
                        <div className="w-24 h-2 bg-indigo-500/20 rounded-full"></div>
                        <div className="w-48 h-8 bg-white/10 rounded-2xl"></div>
                      </div>
                      <div className="w-32 h-10 bg-indigo-600/20 border border-indigo-600/20 rounded-2xl"></div>
                   </div>
                   
                   {/* Mock Stats */}
                   <div className="grid grid-cols-3 gap-6">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                           <div className="w-8 h-8 bg-white/5 rounded-xl"></div>
                           <div className="space-y-2">
                              <div className="w-12 h-2 bg-slate-700 rounded-full"></div>
                              <div className="w-24 h-4 bg-white/10 rounded-full"></div>
                           </div>
                        </div>
                      ))}
                   </div>
                   
                   {/* Mock Chart & Activity */}
                   <div className="grid grid-cols-2 gap-10">
                      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] h-64 flex items-end justify-between gap-3 px-10 pb-10">
                        {[40, 70, 45, 90, 60, 85].map((h, i) => (
                          <div key={i} className="flex-1 bg-indigo-600/20 rounded-t-xl" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-6">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-white/5"></div>
                             <div className="flex-grow space-y-2">
                                <div className="w-24 h-2 bg-white/10 rounded-full"></div>
                                <div className="w-16 h-1.5 bg-slate-800 rounded-full"></div>
                             </div>
                             <div className="w-12 h-3 bg-emerald-500/10 rounded-full"></div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
              
              {/* Overlay Gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60 pointer-events-none"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════ TRUST BAR ═══════ */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <TrustItem label="Users" value="10K+" />
          <TrustItem label="Volume" value="Rp 50B+" />
          <TrustItem label="Uptime" value="99.9%" />
          <TrustItem label="Review" value="4.9/5" />
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section id="features" className="py-40 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24">
          <div className="space-y-4">
            <span className="text-cyan-400 font-black text-xs uppercase tracking-[4px]">Core Capabilities</span>
            <h2 className="text-6xl font-black text-white tracking-tighter leading-tight">Fitur Esensial <br /> Tanpa Ribet.</h2>
          </div>
          <p className="text-slate-500 max-w-md font-medium text-lg tracking-tight">Kami menghilangkan kompleksitas yang tidak perlu, menyisakan fitur yang benar-benar membantu bisnis Anda berkembang.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard icon={<FaBolt />} title="Kasir Kilat" desc="Sistem POS tercepat yang pernah ada. Melayani pelanggan tanpa jeda." />
          <FeatureCard icon={<FaChartPie />} title="Laporan Akurat" desc="Data transaksi tersaji dalam visual yang mudah dipahami setiap harinya." />
          <FeatureCard icon={<FaBoxOpen />} title="Stok Cerdas" desc="Manajemen inventaris otomatis dengan notifikasi stok kritis real-time." />
          <FeatureCard icon={<FaUsers />} title="CRM Terintegrasi" desc="Kelola database pelanggan untuk meningkatkan loyalitas dan penjualan kembali." />
          <FeatureCard icon={<FaShieldAlt />} title="Keamanan Cloud" desc="Seluruh data tersimpan aman di server cloud terenkripsi tingkat tinggi." />
          <FeatureCard icon={<FaGlobe />} title="Multi Cabang" desc="Kelola banyak toko dalam satu akun administrator secara terpusat." />
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer id="contact" className="py-32 px-8 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-5 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-white text-2xl shadow-2xl shadow-indigo-600/30">K</div>
              <h2 className="text-4xl font-black text-white tracking-tighter leading-none">Kasirly <span className="text-slate-700">POS</span></h2>
            </div>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-md">
              Membangun masa depan UMKM Indonesia melalui teknologi Point of Sale yang modern, cepat, dan mudah digunakan.
            </p>
            <div className="flex gap-6">
              <SocialIcon icon={<FaTwitter />} />
              <SocialIcon icon={<FaInstagram />} />
              <SocialIcon icon={<FaLinkedin />} />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-white font-black uppercase tracking-[3px] text-xs">Hubungi Kami</h4>
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">WhatsApp</p>
                <p className="text-white font-bold">087892096389</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Email</p>
                <p className="text-white font-bold">mildanboyy@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <SpotlightCard className="p-10 border-white/5 bg-white/[0.02]">
               <h4 className="text-white font-black text-xl mb-4 tracking-tight">Stay Connected</h4>
               <p className="text-slate-500 text-sm mb-8 font-medium">Dapatkan tips bisnis dan update fitur terbaru Kasirly.</p>
               <div className="flex gap-4">
                  <input placeholder="Email Anda" className="bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white flex-grow outline-none focus:border-indigo-500 transition-all" />
                  <button className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/20"><FaArrowRight /></button>
               </div>
            </SpotlightCard>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[10px] font-black text-slate-700 uppercase tracking-[5px]">© 2026 Kasirly Indonesia. All Rights Reserved.</p>
          <div className="flex gap-12">
            <a href="#" className="text-[10px] font-black text-slate-700 uppercase tracking-widest hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-black text-slate-700 uppercase tracking-widest hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const TrustItem = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-6xl font-black text-white tracking-tighter leading-none">{value}</p>
    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[4px]">{label}</p>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <SpotlightCard className="p-12 space-y-10 group border-white/5 bg-white/[0.02]">
    <div className="w-16 h-16 rounded-[24px] bg-indigo-600/10 text-indigo-400 flex items-center justify-center text-2xl border border-indigo-600/10 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-700 shadow-2xl group-hover:shadow-indigo-600/40">
      {icon}
    </div>
    <div className="space-y-3">
      <h3 className="text-2xl font-black text-white tracking-tight">{title}</h3>
      <p className="text-slate-500 text-base font-medium leading-relaxed tracking-tight">{desc}</p>
    </div>
  </SpotlightCard>
);

const SocialIcon = ({ icon }) => (
  <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer shadow-xl">
    {icon}
  </div>
);

export default PublicLanding;
