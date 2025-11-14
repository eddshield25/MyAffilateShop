import React from 'react'

export default function ProductCard({ product }){
  return (
    <article className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
      <div className="h-48 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
        {product.images && product.images[0] ? (
          <img src={product.images[0]} alt={product.title} className="object-contain h-full" />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>
      <h3 className="mt-3 font-semibold">{product.title}</h3>
      <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-bold">{product.price ? `${product.currency} ${product.price}` : 'Price on link'}</div>
        <a className="px-3 py-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white rounded-md text-sm" href={product.affiliateLink} target="_blank" rel="noreferrer">Buy</a>
      </div>
      <div className="mt-2 flex gap-2 flex-wrap">
        {product.tags && product.tags.map(t=> <span key={t} className="text-xs bg-slate-100 px-2 py-1 rounded">{t}</span>)}
      </div>
    </article>
  )
}
