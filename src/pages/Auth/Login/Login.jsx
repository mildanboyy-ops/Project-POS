import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaUser, FaGoogle, FaGithub } from "react-icons/fa"
import { motion } from "framer-motion"
import "./Login.css"

const Login = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) navigate("/dashboard")
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    setTimeout(() => {
      if (isRegister) {
        // Mock register logic
        if (name && email && password) {
          localStorage.setItem("token", "dummy_token")
          navigate("/dashboard")
        } else {
          setError("Harap isi semua bidang")
        }
      } else {
        // Mock login logic
        if (email === "admin@gmail.com" && password === "12345") {
          localStorage.setItem("token", "dummy_token")
          navigate("/dashboard")
        } else {
          setError("Email atau password salah")
        }
      }
      setLoading(false)
    }, 1200)
  }

  const handleSocialLogin = (platform) => {
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem("token", `social_${platform}_token`)
      navigate("/dashboard")
    }, 1000)
  }

  return (
    <div className="login-page">
      {/* Animated Background Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      {/* Back to Landing */}
      <motion.button
        onClick={() => navigate("/")}
        className="login-back-btn"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FaArrowLeft /> Kembali ke Beranda
      </motion.button>

      <div className="login-wrapper">

        {/* LEFT BRANDING */}
        <motion.div
          className="login-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="brand-icon">
            <div className="brand-icon-inner">K</div>
          </div>

          <span className="brand-badge">🚀 Modern POS System</span>

          <h1 className="brand-title">
            Kasir<span>ly</span>
          </h1>

          <p className="brand-desc">
            Smart POS for Modern Business. Kelola penjualan, pantau stok,
            dan tingkatkan performa bisnismu dengan sistem yang cepat,
            modern, dan mudah digunakan.
          </p>

          <div className="brand-stats">
            <div className="stat-item">
              <span className="stat-value">10K+</span>
              <span className="stat-label">Pengguna</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT LOGIN FORM */}
        <motion.div
          className="login-right"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="login-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="login-title">{isRegister ? "Buat Akun Baru 🚀" : "Welcome Back 👋"}</h2>
            <p className="login-subtitle">
              {isRegister 
                ? "Daftar untuk memulai menggunakan Kasirly" 
                : "Masuk untuk melanjutkan ke dashboard"}
            </p>

            {error && (
              <motion.div
                className="login-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>⚠️</span> {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} autoComplete="off">

              {isRegister && (
                <>
                  <label className="input-label">Nama Lengkap</label>
                  <div className="input-field">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      placeholder=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>
                </>
              )}

              <label className="input-label">Email</label>
              <div className="input-field">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="flex-between">
                <label className="input-label">Password</label>
                {!isRegister && (
                  <button type="button" onClick={() => navigate("/forgot-password")} className="forgot-password-link">Lupa Password?</button>
                )}
              </div>
              <div className="input-field">
                <FaLock className="input-icon" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <motion.button
                type="submit"
                className="login-btn"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? <div className="spinner"></div> : (isRegister ? "Daftar Sekarang" : "Masuk")}
              </motion.button>

            </form>

            <div className="social-login-container">
              <div className="divider">
                <span>atau lanjutkan dengan</span>
              </div>
              <div className="social-buttons">
                <button type="button" onClick={() => handleSocialLogin('google')} className="social-btn google-btn">
                  <FaGoogle /> Google
                </button>
                <button type="button" onClick={() => handleSocialLogin('github')} className="social-btn github-btn">
                  <FaGithub /> GitHub
                </button>
              </div>
            </div>

            <div className="toggle-register">
              <p>
                {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
                <button 
                  type="button" 
                  className="toggle-register-btn"
                  onClick={() => {
                    setIsRegister(!isRegister)
                    setError("")
                  }}
                >
                  {isRegister ? "Masuk di sini" : "Daftar sekarang"}
                </button>
              </p>
            </div>

            {!isRegister && (
              <p className="login-footer">
                Demo: <strong>admin@gmail.com</strong> / <strong>12345</strong>
              </p>
            )}
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}

export default Login