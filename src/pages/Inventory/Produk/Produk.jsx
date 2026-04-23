import React, { useContext, useState, useMemo } from "react";
import { AppContext } from "../../../context/AppContext";
import SpotlightCard from "../../../components/SpotlightCard";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPlus, FaSearch, FaFilter, FaTrash, 
  FaEdit, FaEllipsisV, FaFileExport, FaSortAmountDown
} from "react-icons/fa";

const Produk = () => {
  const { products, addProduct, deleteProduct, updateProduct, categories, showToast } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", price: 0, stock: 0, category: "Makanan", emoji: "📦" });

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = filterCategory === "Semua" || p.category === filterCategory;
      return matchSearch && matchCategory;
    });
  }, [products, search, filterCategory]);

  const handleOpenAdd = () => {
    setFormData({ name: "", price: 0, stock: 0, category: categories[0]?.name || "Makanan", emoji: "📦" });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setFormData({ ...p });
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) return showToast("Nama dan Harga wajib diisi", "error");
    
    if (editingProduct) {
      updateProduct({ ...formData, id: editingProduct.id });
      showToast("Produk berhasil diperbarui", "success");
    } else {
      addProduct(formData);
      showToast("Produk baru ditambahkan", "success");
    }
    setIsAddModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="animate-fade-in p-4 lg:p-8 space-y-8">

      <SpotlightCard className="p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" placeholder="Cari nama produk..." 
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="w-full md:w-48 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300">
          <option value="Semua">Semua Kategori</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </SpotlightCard>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((p) => (
            <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SpotlightCard className="p-6 relative h-full">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl">{p.emoji}</div>
                  <div className="flex-grow space-y-1">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest">{p.category}</span>
                    <h3 className="text-lg font-bold text-white">{p.name}</h3>
                    <p className="text-xl font-black text-white">Rp {p.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${p.stock <= 10 ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                    STOK: {p.stock}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenEdit(p)} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-indigo-400 transition-all"><FaEdit /></button>
                    <button onClick={() => { if(window.confirm("Hapus?")) deleteProduct(p.id); showToast("Hapus sukses", "info"); }} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-rose-500 transition-all"><FaTrash /></button>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {(isAddModalOpen || editingProduct) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }}></div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-lg glass-panel rounded-[32px] p-8 border border-white/10">
              <h2 className="text-2xl font-black text-white mb-8">{editingProduct ? "Edit Produk" : "Tambah Produk"}</h2>
              <div className="space-y-6">
                <InputGroup label="Nama" value={formData.name} onChange={v => setFormData({...formData, name: v})} />
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Harga" type="number" value={formData.price} onChange={v => setFormData({...formData, price: Number(v)})} />
                  <InputGroup label="Stok" type="number" value={formData.stock} onChange={v => setFormData({...formData, stock: Number(v)})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kategori</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white outline-none">
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={() => { setIsAddModalOpen(false); setEditingProduct(null); }} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-slate-400 font-bold">Batal</button>
                  <button onClick={handleSave} className="flex-1 py-4 bg-indigo-600 rounded-2xl text-white font-bold">Simpan</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InputGroup = ({ label, type = "text", value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-slate-500 uppercase">{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-all" />
  </div>
);

export default Produk;