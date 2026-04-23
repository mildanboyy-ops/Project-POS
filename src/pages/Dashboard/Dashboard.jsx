import { FaHome, FaBox, FaShoppingCart, FaChartBar, FaCog, FaSignOutAlt } from "react-icons/fa"
import { FaBoxOpen, FaUsers } from "react-icons/fa"
import "./Dashboard.css"

export default function Dashboard() {
  return (
    <div className="layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>POS Kasir <span>Modern</span></h2>

        <Menu icon={<FaHome />} label="Home" active />
        <Menu icon={<FaChartBar />} label="Fitur" />
        <Menu icon={<FaBox />} label="Produk" />
        <Menu icon={<FaShoppingCart />} label="Penjualan" />
        <Menu icon={<FaChartBar />} label="Laporan" />
        <Menu icon={<FaCog />} label="Pengaturan" />

        <div className="logout">
          <FaSignOutAlt /> Logout
        </div>
      </div>

      {/* CONTENT */}
      <div className="content">

        {/* HEADER */}
        <div className="header">
          <div>
            <h1>Sistem Kasir Modern</h1>
            <p>Kelola penjualan dengan cepat, mudah, dan efisien</p>
          </div>

          <div className="date">21 Apr 2025</div>
        </div>

        {/* CARDS */}
        <div className="cards">
          <Card title="Total Penjualan" value="Rp 12.450.000" icon="💼" />
          <Card title="Transaksi" value="156" icon="🛒" />
          <Card title="Produk" value="128" icon="📦" />
          <Card title="Pelanggan" value="89" icon="👥" />
        </div>

        {/* TABLE */}
        <div className="grid">
          <div className="box">
            <h3>Penjualan Terakhir</h3>

            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Pelanggan</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <Row no="INV001" name="Budi" total="Rp 250.000" />
                <Row no="INV002" name="Siti" total="Rp 150.000" />
                <Row no="INV003" name="Andi" total="Rp 350.000" />
              </tbody>
            </table>
          </div>

          <div className="box">
            <h3>Produk Terlaris</h3>

            <Product name="Indomie" sold="38" />
            <Product name="Kopi Sachet" sold="32" />
            <Product name="Air Mineral" sold="45" />
          </div>
        </div>

      </div>
    </div>
  )
}

function Menu({ icon, label, active }) {
  return (
    <div className={`menu ${active ? "active" : ""}`}>
      {icon} {label}
    </div>
  )
}

function Card({ title, value, icon }) {
  return (
    <div className="card">
      <div className="icon">{icon}</div>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  )
}

function Row({ no, name, total }) {
  return (
    <tr>
      <td>{no}</td>
      <td>{name}</td>
      <td>{total}</td>
      <td><span className="status">Selesai</span></td>
    </tr>
  )
}

function Product({ name, sold }) {
  return (
    <div className="product">
      <span>{name}</span>
      <b>{sold}</b>
    </div>
  )
}