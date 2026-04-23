import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const initialProducts = [
  { id: 1, name: "Indomie Goreng", price: 3500, stock: 120, category: "Makanan", emoji: "🍜" },
  { id: 2, name: "Air Mineral 600ml", price: 3000, stock: 200, category: "Minuman", emoji: "💧" },
  { id: 3, name: "Kopi Hitam", price: 8000, stock: 15, category: "Minuman", emoji: "☕" },
  { id: 4, name: "Keripik Kentang", price: 8000, stock: 60, category: "Snack", emoji: "🥔" },
  { id: 5, name: "Ayam Geprek", price: 18000, stock: 40, category: "Makanan", emoji: "🍗" },
  { id: 6, name: "Jus Alpukat", price: 10000, stock: 90, category: "Minuman", emoji: "🥤" },
  { id: 7, name: "Roti Bakar", price: 12000, stock: 25, category: "Snack", emoji: "🍞" },
  { id: 8, name: "Es Teh Manis", price: 5000, stock: 150, category: "Minuman", emoji: "🍹" },
  { id: 9, name: "Sate Ayam", price: 25000, stock: 30, category: "Makanan", emoji: "🍢" },
];

const initialCategories = [
  { id: 1, name: "Makanan", emoji: "🍽️" },
  { id: 2, name: "Minuman", emoji: "🥤" },
  { id: 3, name: "Snack", emoji: "🍿" },
  { id: 4, name: "Lainnya", emoji: "📦" },
];

const initialCustomers = [
  { id: 1, name: "Budi Santoso", phone: "08123456789", address: "Jl. Merdeka No. 10" },
  { id: 2, name: "Siti Rahma", phone: "08234567890", address: "Jl. Sudirman No. 5" },
  { id: 3, name: "Andi Wijaya", phone: "08345678901", address: "Jl. Gatot Subroto No. 2" },
];

const initialDiscounts = [
  { id: 1, code: "PROMOUMKM", value: "10%", type: "Persentase", status: "Aktif", expiry: "2026-12-31" },
  { id: 2, code: "HEMAT5K", value: "5000", type: "Potongan", status: "Aktif", expiry: "2026-06-30" },
];

// Generate some mock transactions for the reports
const initialTransactions = [
  { id: "TRX-1001", total: 45000, date: new Date(Date.now() - 3600000 * 2).toISOString(), items: [{ name: "Ayam Geprek", qty: 2, price: 18000 }, { name: "Es Teh", qty: 2, price: 4500 }], status: "Selesai" },
  { id: "TRX-1002", total: 12000, date: new Date(Date.now() - 3600000 * 5).toISOString(), items: [{ name: "Roti Bakar", qty: 1, price: 12000 }], status: "Selesai" },
  { id: "TRX-1003", total: 85000, date: new Date(Date.now() - 86400000 * 1).toISOString(), items: [{ name: "Sate Ayam", qty: 3, price: 25000 }, { name: "Jus Alpukat", qty: 1, price: 10000 }], status: "Selesai" },
  { id: "TRX-1004", total: 35000, date: new Date(Date.now() - 86400000 * 2).toISOString(), items: [{ name: "Indomie", qty: 5, price: 7000 }], status: "Selesai" },
  { id: "TRX-1005", total: 150000, date: new Date(Date.now() - 86400000 * 3).toISOString(), items: [{ name: "Paket Keluarga", qty: 1, price: 150000 }], status: "Selesai" },
  { id: "TRX-1006", total: 24000, date: new Date(Date.now() - 86400000 * 4).toISOString(), items: [{ name: "Kopi Hitam", qty: 3, price: 8000 }], status: "Selesai" },
];

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem("kasirly_products")) || initialProducts);
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem("kasirly_transactions")) || initialTransactions);
  const [customers, setCustomers] = useState(() => JSON.parse(localStorage.getItem("kasirly_customers")) || initialCustomers);
  const [categories, setCategories] = useState(() => JSON.parse(localStorage.getItem("kasirly_categories")) || initialCategories);
  const [discounts, setDiscounts] = useState(() => JSON.parse(localStorage.getItem("kasirly_discounts")) || initialDiscounts);
  const [balance, setBalance] = useState(() => Number(localStorage.getItem("kasirly_balance")) || 2500000);
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("kasirly_theme")) ?? true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    localStorage.setItem("kasirly_products", JSON.stringify(products));
    localStorage.setItem("kasirly_transactions", JSON.stringify(transactions));
    localStorage.setItem("kasirly_customers", JSON.stringify(customers));
    localStorage.setItem("kasirly_categories", JSON.stringify(categories));
    localStorage.setItem("kasirly_discounts", JSON.stringify(discounts));
    localStorage.setItem("kasirly_balance", balance.toString());
    localStorage.setItem("kasirly_theme", JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [products, transactions, customers, categories, discounts, balance, darkMode]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
  };

  const add = (setter, item) => setter(prev => [{ ...item, id: Date.now() }, ...prev]);
  const update = (setter, item) => setter(prev => prev.map(i => i.id === item.id ? item : i));
  const remove = (setter, id) => setter(prev => prev.filter(i => i.id !== id));

  const addTransaction = (cart, total) => {
    setProducts(prev => prev.map(p => {
      const item = cart.find(c => c.id === p.id);
      return item ? { ...p, stock: p.stock - item.qty } : p;
    }));
    const tx = { id: `TRX-${Date.now()}`, items: cart, total, date: new Date().toISOString(), status: "Selesai" };
    setTransactions(prev => [tx, ...prev]);
    setBalance(prev => prev + total);
  };

  return (
    <AppContext.Provider value={{
      products, addProduct: (p) => add(setProducts, p), updateProduct: (p) => update(setProducts, p), deleteProduct: (id) => remove(setProducts, id),
      categories, addCategory: (c) => add(setCategories, c), updateCategory: (c) => update(setCategories, c), deleteCategory: (id) => remove(setCategories, id),
      customers, addCustomer: (c) => add(setCustomers, c), updateCustomer: (c) => update(setCustomers, c), deleteCustomer: (id) => remove(setCustomers, id),
      discounts, addDiscount: (d) => add(setDiscounts, d), updateDiscount: (d) => update(setDiscounts, d), deleteDiscount: (id) => remove(setDiscounts, id),
      transactions, addTransaction, deleteTransaction: (id) => remove(setTransactions, id),
      balance, withdrawFunds: (amt) => { if(amt > balance) return false; setBalance(prev => prev - amt); return true; },
      darkMode, setDarkMode, notifications, showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};
