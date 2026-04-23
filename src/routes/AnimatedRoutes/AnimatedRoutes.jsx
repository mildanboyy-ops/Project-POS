import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import Landing from "../../pages/Dashboard/LandingPage/LandingPage"
import Produk from "../../pages/Inventory/Produk/Produk"
import Login from "../../pages/Auth/Login/Login"
import ForgotPassword from "../../pages/Auth/ForgotPassword/ForgotPassword"
import Kasir from "../../pages/Transactions/Kasir/Kasir"
import PublicLanding from "../../pages/Public/PublicLanding/PublicLanding"
import Laporan from "../../pages/Reports/Laporan/Laporan"
import Pelanggan from "../../pages/Users/Pelanggan/Pelanggan"
import Kategori from "../../pages/Inventory/Kategori/Kategori"
import Stok from "../../pages/Inventory/Stok/Stok"
import History from "../../pages/Transactions/History/History"
import Discounts from "../../pages/Inventory/Discounts/Discounts"
import Pengaturan from "../../pages/Settings/Pengaturan/Pengaturan"
import DashboardLayout from "../../components/layout/DashboardLayout"
import NotFound from "../../pages/NotFound"

const pageAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
}

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token")
  return token ? children : <Navigate to="/login" />
}

export default function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* AUTH */}
        <Route path="/login" element={<motion.div {...pageAnimation}><Login /></motion.div>} />
        <Route path="/forgot-password" element={<motion.div {...pageAnimation}><ForgotPassword /></motion.div>} />

        {/* PUBLIC LANDING */}
        <Route path="/" element={<motion.div {...pageAnimation}><PublicLanding /></motion.div>} />

        {/* DASHBOARD ROUTES */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Landing />} />
          <Route path="produk" element={<Produk />} />
          <Route path="penjualan" element={<Kasir />} />
          <Route path="laporan" element={<Laporan />} />
          <Route path="pelanggan" element={<Pelanggan />} />
          <Route path="kategori" element={<Kategori />} />
          <Route path="stok" element={<Stok />} />
          <Route path="riwayat" element={<History />} />
          <Route path="diskon" element={<Discounts />} />
          <Route path="pengaturan" element={<Pengaturan />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}