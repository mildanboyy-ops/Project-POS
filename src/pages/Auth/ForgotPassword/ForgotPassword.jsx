import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaLockOpen } from "react-icons/fa";
import SpotlightCard from "../../../components/SpotlightCard";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-xl relative z-10">
        <motion.button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 font-bold uppercase tracking-widest text-[10px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <FaArrowLeft /> Kembali ke Login
        </motion.button>

        <SpotlightCard className="p-12 md:p-16 rounded-[48px] border-white/5">
          {!submitted ? (
            <div className="space-y-10">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-2xl text-indigo-500 mb-6 border border-indigo-500/20">
                  <FaLockOpen />
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter">Reset Password</h1>
                <p className="text-slate-500 font-medium">Kami akan mengirimkan instruksi pemulihan ke email Anda.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Email Terdaftar</label>
                  <div className="relative group">
                    <FaEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-[28px] py-6 pl-14 pr-8 text-white outline-none focus:border-indigo-500 transition-all text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-[28px] shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : "Kirim Tautan Pemulihan"}
                </button>
              </form>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-10 py-6"
            >
              <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-[32px] flex items-center justify-center mx-auto text-4xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
                <FaCheckCircle />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-white tracking-tight">Email Terkirim!</h2>
                <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                  Tautan pemulihan telah dikirim ke <strong className="text-white">{email}</strong>. Silakan periksa kotak masuk atau folder spam Anda.
                </p>
              </div>
              <button 
                onClick={() => navigate("/login")}
                className="w-full py-6 bg-white/5 border border-white/5 text-white font-black uppercase tracking-widest rounded-[28px] hover:bg-white/10 transition-all"
              >
                Kembali ke Login
              </button>
            </motion.div>
          )}
        </SpotlightCard>
      </div>
    </div>
  );
};

export default ForgotPassword;
