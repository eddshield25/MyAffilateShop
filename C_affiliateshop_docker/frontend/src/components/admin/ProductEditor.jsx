import React, { useState } from 'react'
import axios from 'axios'

export default function ProductEditor(){
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [images, setImages] = useState('')
  const [price, setPrice] = useState('')
  const [msg, setMsg] = useState('')

  async function submit(e){
    e.preventDefault();
    try{
      const token = localStorage.getItem('admin_token')
      await axios.post('/api/products', {
        title, affiliateLink: link, images: images.split('|').map(s=>s.trim()), price: parseFloat(price)
      }, { headers: { Authorization: `Bearer ${token}` } })
      setMsg('Product saved')
    }catch(e){ setMsg('Error saving') }
  }

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold">Add Product</h3>
      <form onSubmit={submit} className="mt-4 max-w-lg bg-white p-4 rounded shadow">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="block mb-3 p-2 border rounded w-full" />
        <input value={link} onChange={e=>setLink(e.target.value)} placeholder="Affiliate link" className="block mb-3 p-2 border rounded w-full" />
        <input value={images} onChange={e=>setImages(e.target.value)} placeholder="Image URL(s) pipe-separated" className="block mb-3 p-2 border rounded w-full" />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" className="block mb-3 p-2 border rounded w-full" />
        <button className="btn">Save</button>
        {msg && <p className="mt-3">{msg}</p>}
      </form>
    </div>
  )
}
