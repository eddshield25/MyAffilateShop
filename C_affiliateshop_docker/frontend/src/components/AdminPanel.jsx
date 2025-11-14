import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './admin/Login'
import ProductEditor from './admin/ProductEditor'
import BulkUpload from './admin/BulkUpload'

export default function AdminPanel(){
  return (
    <Routes>
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/editor" element={<ProductEditor />} />
      <Route path="/admin/bulk" element={<BulkUpload />} />
    </Routes>
  )
}

function AdminHome(){
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Admin</h2>
      <div className="mt-4 flex gap-3">
        <Link to="/admin/login" className="btn">Login</Link>
        <Link to="/admin/editor" className="btn-secondary">Product Editor</Link>
        <Link to="/admin/bulk" className="btn">Bulk Upload</Link>
      </div>
      <p className="mt-6 text-sm text-slate-500">Tip: publish a Google Sheet as CSV and use the bulk upload by URL to import products quickly.</p>
    </div>
  )
}
