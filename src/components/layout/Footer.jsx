import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-12 pb-8 pt-10 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand & Mission */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">K</div>
            <h3 className="text-xl font-bold text-white">Kasirly <span className="text-cyan-400">POS</span></h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Solusi kasir modern yang dirancang untuk mempercepat pertumbuhan bisnis UMKM di Indonesia dengan teknologi cloud terdepan.
          </p>
          <div className="flex gap-4 pt-2">
            <SocialIcon icon={<FaTwitter />} />
            <SocialIcon icon={<FaInstagram />} />
            <SocialIcon icon={<FaLinkedin />} />
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Kontak Kami</h4>
          <ul className="space-y-3">
            <ContactLink icon={<FaMapMarkerAlt />} text="Jl. Teknologi Modern No. 88, Jakarta Selatan" />
            <ContactLink icon={<FaPhoneAlt />} text="+62 21 555 1234" />
            <ContactLink icon={<FaEnvelope />} text="support@kasirly.id" />
            <ContactLink icon={<FaGlobe />} text="www.kasirly.id" />
          </ul>
        </div>

        {/* Features Info */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Layanan</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Manajemen Inventaris</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Laporan Keuangan Real-time</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Sistem Loyalty Pelanggan</li>
            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Integrasi Pembayaran Digital</li>
          </ul>
        </div>

        {/* Developer / Company */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dikembangkan Oleh</h4>
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-sm font-bold text-white mb-1">Kasirly Tech Solution</p>
            <p className="text-xs text-slate-500 mb-3">Versi 2.0.4 - Premium Edition</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">K</div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase">Support ID</p>
                <p className="text-xs text-white">#KS-88273</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2026 Kasirly Indonesia. Hak Cipta Dilindungi Undang-Undang.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
        </div>
      </div>
    </footer>
  );
};

const ContactLink = ({ icon, text }) => (
  <li className="flex gap-3 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer">
    <span className="text-cyan-500 mt-0.5">{icon}</span>
    <span>{text}</span>
  </li>
);

const SocialIcon = ({ icon }) => (
  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">
    {icon}
  </div>
);

export default Footer;
