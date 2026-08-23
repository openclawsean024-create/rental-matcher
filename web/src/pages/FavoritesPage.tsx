import { listListings, getFavorites } from '../lib/db'

export default function FavoritesPage() {
  const favs = getFavorites()
  const listings = listListings().filter(l => favs.includes(l.id))
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">⭐ 收藏清單({listings.length})</h1>
      {listings.length === 0 && <div className="text-center text-slate-400 py-12">尚未收藏任何物件</div>}
      <div className="space-y-2" data-testid="favorites-list">
        {listings.map(l => (
          <div key={l.id} className="border border-slate-200 rounded p-3 flex items-center justify-between" data-testid={`fav-card-${l.id}`}>
            <div>
              <div className="font-medium">{l.title}</div>
              <div className="text-xs text-slate-500">{l.district} · {l.size} 坪 · {l.rooms} 房 {l.baths} 衛</div>
            </div>
            <div className="font-bold text-orange-600">{l.price.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
