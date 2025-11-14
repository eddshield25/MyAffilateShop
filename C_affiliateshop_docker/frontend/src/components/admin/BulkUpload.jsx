import React, { useState } from 'react'
import axios from 'axios'

export default function BulkUpload(){
  const [url, setUrl] = useState('')
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState('')

  async function submitUrl(e){
    e.preventDefault();
    try{
      const token = localStorage.getItem('admin_token')
      const res = await axios.post('/api/products/bulk-from-csv-url', { url }, { headers: { Authorization: `Bearer ${token}` } })
      setMsg(`Imported: ${res.data.imported}`)
    }catch(e){ setMsg('Import failed') }
  }

  async function submitFile(e){
    e.preventDefault();
    try{
      const token = localStorage.getItem('admin_token')
      const fd = new FormData();
      fd.append('file', file)
      const res = await axios.post('/api/products/bulk-upload-csv', fd, { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` } })
      setMsg(`Imported: ${res.data.imported}`)
    }catch(e){ setMsg('Import failed') }
  }

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold">Bulk Upload</h3>

      <form onSubmit={submitUrl} className="mt-4 bg-white p-4 rounded shadow max-w-lg">
        <label className="block mb-2">Google Sheets CSV URL (Publish the sheet as CSV)</label>
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://docs.google.com/.../pub?output=csv" className="w-full p-2 border rounded mb-3" />
        <button className="btn">Import from URL</button>
      </form>

      <form onSubmit={submitFile} className="mt-4 bg-white p-4 rounded shadow max-w-lg">
        <label className="block mb-2">Or upload CSV file</label>
        <input type="file" accept=".csv" onChange={e=>setFile(e.target.files[0])} className="mb-3" />
        <button className="btn">Upload CSV</button>
      </form>

      {msg && <p className="mt-3">{msg}</p>}
    </div>
  )
}
