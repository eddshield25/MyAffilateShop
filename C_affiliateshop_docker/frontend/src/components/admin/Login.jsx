import React, { useState } from 'react'
import axios from 'axios'

export default function Login(){
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [msg, setMsg] = useState('')

  async function submit(e){
    e.preventDefault();
    try{
      const r = await axios.post('/api/admin/login', { email, password: pass })
      localStorage.setItem('admin_token', r.data.token)
      setMsg('Logged in')
      window.location.href = '/admin/editor'
    }catch(e){ setMsg('Login failed') }
  }

  return (
    <form onSubmit={submit} className="max-w-md p-6 bg-white rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">Admin Login</h3>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="block mb-3 w-full p-2 border rounded" />
      <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="password" type="password" className="block mb-3 w-full p-2 border rounded" />
      <button className="btn">Login</button>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </form>
  )
}
