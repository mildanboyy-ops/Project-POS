import { useContext, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FaSearch, FaPlus, FaMinus, FaShoppingBag, FaPrint, 
  FaCalculator, FaMoneyBillWave, FaFilter, FaTimes, FaCheckCircle
} from "react-icons/fa"
import { AppContext } from "../../../context/AppContext"
import SpotlightCard from "../../../components/SpotlightCard"

export default function Kasir() {
  const { products, categories, addTransaction, showToast } = useContext(AppContext)
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState("")
  const [activeCat, setActiveCat] = useState("Semua")
  const [showReceipt, setShowReceipt] = useState(false)
  const [lastOrder, setLastOrder] = useState(null)
  const [receivedAmount, setReceivedAmount] = useState(0)

  const filtered = useMemo(() => 
    products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchCat = activeCat === "Semua" || p.category === activeCat
      return matchSearch && matchCat
    }),
    [products, search, activeCat]
  )

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart])
  const changeAmount = receivedAmount > total ? receivedAmount - total : 0

  const updateCart = (product, delta) => {
    const item = cart.find(c => c.id === product.id)
    if (item) {
      const newQty = item.qty + delta
      if (newQty <= 0) return setCart(cart.filter(c => c.id !== product.id))
      if (newQty > product.stock) return showToast("Stok tidak cukup!", "error")
      setCart(cart.map(c => c.id === product.id ? { ...c, qty: newQty } : c))
    } else if (delta > 0) {
      if (product.stock <= 0) return showToast("Stok habis!", "error")
      setCart([...cart, { ...product, qty: 1 }])
      showToast(`${product.name} ditambahkan`, "success")
    }
  }

  const formatIDR = (n) => new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0
  }).format(n)

  const handleCheckout = () => {
    if (!cart.length) return
    if (receivedAmount < total) return showToast("Pembayaran kurang!", "error")
    
    const order = { items: [...cart], total, date: new Date(), received: receivedAmount, change: changeAmount }
    addTransaction(cart, total)
    setLastOrder(order)
    setCart([])
    setReceivedAmount(0)
    setShowReceipt(true)
    showToast("Transaksi Berhasil!", "success")
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-160px)]">
      {/* ═══════ LEFT: PRODUCTS ═══════ */}
      <div className="flex-grow space-y-6 md:space-y-8 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Terminal Kasir</h1>
            <p className="text-sm md:text-base text-slate-500 font-medium">Pilih produk dan layani pelanggan dengan cepat.</p>
          </div>
          <div className="relative w-full md:w-80 group">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              type="text" placeholder="Cari nama produk..." 
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 md:py-4 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-indigo-500/40 transition-all" 
            />
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-2">
          {["Semua", ...categories.map(c => c.name)].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-6 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCat === cat ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pr-2">
          {filtered.map(p => (
            <motion.div key={p.id} whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
              <SpotlightCard className="p-4 md:p-8 cursor-pointer border-white/5 bg-white/[0.03] group relative overflow-hidden" onClick={() => updateCart(p, 1)}>
                <div className="text-3xl md:text-5xl mb-4 md:mb-6 text-center group-hover:scale-110 transition-transform">{p.emoji}</div>
                <div className="space-y-1 md:space-y-2">
                  <span className="text-[8px] md:text-[9px] font-black text-indigo-400 uppercase tracking-[1px] md:tracking-[2px]">{p.category}</span>
                  <h3 className="font-bold text-white text-sm md:text-base truncate">{p.name}</h3>
                  <p className="text-cyan-400 font-black text-base md:text-lg">{formatIDR(p.price)}</p>
                </div>
                <div className="mt-4 md:mt-6 flex justify-between items-center">
                  <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${p.stock < 10 ? 'text-rose-500' : 'text-slate-600'}`}>Stok: {p.stock}</span>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-indigo-600 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-indigo-600/30">
                    <FaPlus size={10} />
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══════ RIGHT: CART ═══════ */}
      <div className="w-full lg:w-[450px] flex flex-col gap-8">
        <SpotlightCard className="p-6 md:p-10 flex flex-col h-full border-white/5 lg:sticky lg:top-24">
          <div className="flex justify-between items-center mb-6 md:mb-10">
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-3 md:gap-4">
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-base md:text-lg"><FaShoppingBag /></div>
               Pesanan
            </h2>
            <span className="text-[9px] md:text-[10px] font-black text-slate-500 bg-white/5 px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-white/5 uppercase tracking-widest">{cart.length} Item</span>
          </div>

          <div className="flex-grow space-y-6 overflow-y-auto max-h-[400px] no-scrollbar pr-2 mb-10">
            <AnimatePresence mode="popLayout">
              {cart.map(item => (
                <motion.div 
                  key={item.id} 
                  layout 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-4 md:gap-6 p-4 md:p-5 bg-white/[0.02] rounded-2xl md:rounded-3xl border border-white/5 group"
                >
                  <div className="text-2xl md:text-3xl grayscale group-hover:grayscale-0 transition-all">{item.emoji}</div>
                  <div className="flex-grow space-y-0.5 md:space-y-1">
                    <p className="text-xs md:text-sm font-black text-white leading-tight">{item.name}</p>
                    <p className="text-[10px] md:text-xs text-indigo-400 font-bold">{formatIDR(item.price)}</p>
                  </div>
                  <div className="flex items-center bg-slate-900 rounded-xl md:rounded-2xl p-1 md:p-1.5 border border-white/5">
                    <button onClick={() => updateCart(item, -1)} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-slate-500 hover:text-white transition-colors"><FaMinus size={8} /></button>
                    <span className="px-2 md:px-4 text-xs md:text-sm font-black text-white tracking-tighter">{item.qty}</span>
                    <button onClick={() => updateCart(item, 1)} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-slate-500 hover:text-white transition-colors"><FaPlus size={8} /></button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {!cart.length && (
              <div className="py-20 text-center space-y-4 opacity-20">
                <FaCalculator className="text-5xl mx-auto text-slate-600" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[4px]">Keranjang Kosong</p>
              </div>
            )}
          </div>

          <div className="space-y-8 pt-8 border-t border-white/5">
            <div className="flex justify-between items-end">
              <span className="text-[9px] md:text-[10px] font-black text-slate-600 uppercase tracking-[3px] md:tracking-[4px]">Subtotal</span>
              <span className="text-3xl md:text-4xl font-black text-cyan-400 tracking-tighter">{formatIDR(total)}</span>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Pembayaran Tunai</label>
              <div className="relative group">
                <FaMoneyBillWave className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:scale-110 transition-transform" />
                <input 
                  type="number" 
                  value={receivedAmount || ""} 
                  onChange={e => setReceivedAmount(Number(e.target.value))}
                  placeholder="0"
                  className="w-full bg-slate-900 border border-white/5 rounded-2xl md:rounded-3xl py-4 md:py-6 pl-14 pr-8 text-white font-black text-xl md:text-2xl focus:border-emerald-500 outline-none transition-all placeholder:text-slate-800"
                />
              </div>
              {receivedAmount >= total && total > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl">
                  <span className="text-[10px] font-black text-emerald-500/60 uppercase tracking-widest">Kembalian</span>
                  <span className="text-xl font-black text-emerald-400">{formatIDR(changeAmount)}</span>
                </motion.div>
              )}
            </div>

            <button 
              disabled={!cart.length || receivedAmount < total} 
              onClick={handleCheckout}
              className="w-full py-6 bg-indigo-600 rounded-[32px] text-white font-black uppercase tracking-[3px] shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 disabled:opacity-20 transition-all text-xs"
            >
              Proses Transaksi
            </button>
          </div>
        </SpotlightCard>
      </div>

      {/* STRUK MODAL */}
      <AnimatePresence>
        {showReceipt && lastOrder && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setShowReceipt(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 40 }} 
              className="relative bg-white text-slate-900 w-full max-w-sm rounded-[48px] p-12 shadow-2xl overflow-hidden"
            >
              <div className="text-center space-y-2 mb-10">
                <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-black mx-auto mb-4 shadow-xl shadow-indigo-600/20">K</div>
                <h3 className="text-2xl font-black tracking-tighter text-indigo-600 uppercase">Kasirly <span className="text-slate-900">POS</span></h3>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[3px]">Bukti Pembayaran Digital</p>
              </div>

              <div className="space-y-4 mb-10 border-y-2 border-dashed border-slate-100 py-8">
                {lastOrder.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between items-center font-mono text-xs">
                    <span className="font-bold">{i.qty}x <span className="text-slate-400">@</span> {i.name}</span>
                    <span className="font-black text-slate-900">{formatIDR(i.price * i.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-10">
                <div className="flex justify-between text-2xl font-black tracking-tighter">
                  <span className="text-slate-400">TOTAL</span>
                  <span>{formatIDR(lastOrder.total)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Diterima</span>
                  <span>{formatIDR(lastOrder.received)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-emerald-600 uppercase tracking-widest">
                  <span>Kembali</span>
                  <span>{formatIDR(lastOrder.change)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-slate-900/20 hover:scale-105 transition-all">
                  <FaPrint /> Cetak Struk
                </button>
                <button onClick={() => setShowReceipt(false)} className="w-full py-4 bg-white border border-slate-100 text-slate-400 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors">
                  Tutup
                </button>
              </div>

              <div className="mt-10 text-center">
                 <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[4px]">Terima Kasih Atas Kunjungan Anda</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}