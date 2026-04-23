import React, { useState, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { AppContext } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);
  const { notifications } = useContext(AppContext);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen text-slate-200 relative">
      {/* Background Interactive Glow */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          background: `radial-gradient(1000px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79, 70, 229, 0.1), transparent 40%)`
        }}
      />
      
      <Sidebar open={open} setOpen={setOpen} />
      
      <div className={`main-content ${!open ? "sidebar-closed" : ""} relative z-10`}>
        <div className="px-6 py-4 sticky top-0 z-[60] bg-transparent backdrop-blur-sm">
           <Navbar open={open} setOpen={setOpen} />
        </div>
        
        <main className="page-container flex-grow">
          <Outlet />
        </main>
      </div>

      <NotificationDisplay notifications={notifications} />
    </div>
  );
}

const NotificationDisplay = ({ notifications }) => (
  <div className="fixed bottom-8 right-8 z-[200] flex flex-col gap-3 pointer-events-none">
    <AnimatePresence>
      {notifications.map(({ id, type, message }) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.9 }}
          className={`pointer-events-auto flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-3xl border ${
            type === "success" ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" :
            type === "error" ? "bg-rose-500/20 border-rose-500/30 text-rose-400" :
            "bg-blue-500/20 border-blue-500/30 text-blue-400"
          }`}
        >
          {type === "success" ? <FaCheckCircle className="text-lg" /> : 
           type === "error" ? <FaExclamationCircle className="text-lg" /> : 
           <FaInfoCircle className="text-lg" />}
          <span className="font-bold text-xs uppercase tracking-[2px]">{message}</span>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);
