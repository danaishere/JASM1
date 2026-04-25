import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL

function Patterns() {
  const [patterns, setPatterns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API}/api/patterns`)
      .then(res => res.json())
      .then(data => { setPatterns(data); setLoading(false) })
      .catch(() => { setError('Failed to load patterns'); setLoading(false) })
  }, [])

  if (loading) return <div className="page"><p>Loading patterns...</p></div>
  if (error)   return <div className="page"><p>{error}</p></div>

  return (
    <div className="page">
      <h1>Crochet Patterns</h1>
      {patterns.length === 0 ? (
        <p>No patterns yet — check back soon!</p>
      ) : (
        <div className="card-grid">
          {patterns.map(p => (
            <div className="card" key={p._id}>
              <h2>{p.name}</h2>
              <p>{p.description}</p>
              <span className="badge">{p.difficulty}</span>
              <p>{p.isFree ? '🆓 Free' : `$${p.price}`}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Patterns
