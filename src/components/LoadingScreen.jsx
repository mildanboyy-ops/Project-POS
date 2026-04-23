import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#020617] flex items-center justify-center z-[9999] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-24 h-24 rounded-[32px] bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-5xl font-black text-white shadow-[0_0_50px_rgba(79,70,229,0.4)] mb-10"
        >
          K
        </motion.div>
        
        <div className="space-y-4 text-center">
           <motion.h2 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
             className="text-2xl font-black text-white tracking-[8px] uppercase"
           >
             Kasirly <span className="text-cyan-400">Pro</span>
           </motion.h2>
           
           <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500"
              />
           </div>
           
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.5 }}
             transition={{ delay: 1 }}
             className="text-[10px] text-white font-bold uppercase tracking-[4px]"
           >
             Initializing System...
           </motion.p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
