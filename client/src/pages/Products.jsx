import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false) })
      .catch(() => { setError('Failed to load products'); setLoading(false) })
  }, [])

  if (loading) return <div className="page"><p>Loading products...</p></div>
  if (error)   return <div className="page"><p>{error}</p></div>

  return (
    <div className="page">
      <h1>Shop Products</h1>
      {products.length === 0 ? (
        <p>No products yet, check back soon!</p>
      ) : (
        <div className="card-grid">
          {products.map(p => (
            <div className="card" key={p._id}>
              <h2>{p.name}</h2>
              <p>{p.description}</p>
              <p className="price">${p.price}</p>
              <span className={`badge ${p.inStock ? 'in-stock' : 'out-stock'}`}>
                {p.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products
