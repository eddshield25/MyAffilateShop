import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './components/ProductCard'
import AdminPanel from './components/AdminPanel'

export default function App(){
  const [products, setProducts] = useState([])
  const [q, setQ] = useState('')

  useEffect(()=>{ fetchProducts() }, [])

  async function fetchProducts(){
    try {
      const res = await axios.get(`/api/products?q=${encodeURIComponent(q)}`)
      setProducts(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Affiliate Shop</h1>
        <div className="flex gap-3">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" className="border rounded p-2" />
          <button onClick={fetchProducts} className="btn">Search</button>
          <a href="/admin" className="btn-secondary">Admin</a>
        </div>
      </header>

      <main className="p-6">
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p=> <ProductCard key={p._id} product={p} />)}
        </section>
      </main>

      <footer className="p-6 text-center text-sm text-slate-500">Built with ♥ for affiliate sellers</footer>

      <AdminPanel />
    </div>
  )
}
