import "./ProductGrid.css"

const ProductGrid = ({ products, addToCart }) => {
  return (
    <div className="product-grid">
      {products.map(p => (
        <div
          key={p.id}
          className="product-card"
          onClick={() => addToCart(p)}
        >
          <h3>{p.name}</h3>
          <p>Rp {p.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductGrid