import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SpotlightCard from "../components/SpotlightCard";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <SpotlightCard className="max-w-lg p-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-8"
        >
          <h1 className="text-9xl font-black text-indigo-500/20 absolute -top-10 left-1/2 -translate-x-1/2 select-none">404</h1>
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-4">Opps! Halaman Hilang</h2>
            <p className="text-slate-500">Halaman yang Anda cari tidak ditemukan atau telah dipindahkan ke dimensi lain.</p>
          </div>
          <button 
            onClick={() => navigate("/")}
            className="px-10 py-4 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 transition-all"
          >
            Kembali ke Beranda
          </button>
        </motion.div>
      </SpotlightCard>
    </div>
  );
};

export default NotFound;
