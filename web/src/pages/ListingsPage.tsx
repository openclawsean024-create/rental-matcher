import { Link } from 'react-router-dom'
import { listListings, getFavorites, toggleFavorite } from '../lib/db'
import { useState } from 'react'

export default function ListingsPage() {
  const [, setTick] = useState(0)
  const listings = listListings()
  const favs = getFavorites()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">✨ 為你精準配對</h1>
      <p className="text-sm text-slate-500 mb-6">智慧配對 · 物件比較 · 預約看屋</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6" data-testid="match-list">
        {listings.map(l => (
          <div key={l.id} className="border border-slate-200 rounded p-4" data-testid={`listing-${l.id}`}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-medium">{l.title}</div>
                <div className="text-xs text-slate-500">{l.district}</div>
              </div>
              <button onClick={() => { toggleFavorite(l.id); setTick(t => t + 1) }}
                className={`text-sm ${favs.includes(l.id) ? 'text-orange-500' : 'text-slate-300'}`}
                data-testid={`fav-${l.id}`}>
                {favs.includes(l.id) ? '★' : '☆'}
              </button>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {l.tags.map(t => <span key={t} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{t}</span>)}
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-xs text-slate-500">{l.rooms} 房 / {l.baths} 衛 / {l.size} 坪</span>
              </div>
              <div className="font-bold text-orange-600">{l.price.toLocaleString()} /月</div>
            </div>
          </div>
        ))}
      </div>

      <Link to="/viewings" className="inline-block px-4 py-2 bg-orange-500 text-white rounded">
        📅 預約看屋
      </Link>
    </div>
  )
}
