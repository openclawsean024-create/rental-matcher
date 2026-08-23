import type { RentalListing, Viewing } from './types'
const KEY = 'rental-matcher:db'
const FAV_KEY = 'rental-matcher:favorites'
interface DBSchema { listings: RentalListing[]; viewings: Viewing[] }
function read(): DBSchema {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) { const p = JSON.parse(raw); if (Array.isArray(p.listings)) return p }
  } catch {}
  return { listings: [], viewings: [] }
}
function write(db: DBSchema) { try { localStorage.setItem(KEY, JSON.stringify(db)) } catch {} }
function readFav(): string[] {
  try { const r = localStorage.getItem(FAV_KEY); return r ? JSON.parse(r) : [] } catch { return [] }
}
function writeFav(ids: string[]) { try { localStorage.setItem(FAV_KEY, JSON.stringify(ids)) } catch {} }

export function seedDemoData() {
  const db = read()
  if (db.listings.length > 0) return
  db.listings = [
    { id: 'l1', title: '大安區海華豪景宅', district: '大安區', price: 4980, rooms: 2, baths: 2, size: 39.8, tags: ['地段好', '散步美食探索'], agent: '劉立君' },
    { id: 'l2', title: '信義 101 景觀宅', district: '信義區', price: 3680, rooms: 2, baths: 2, size: 26.4, tags: ['挑地段', '高樓層'], agent: '黃仁祐' },
    { id: 'l3', title: '中山質感英寓', district: '中山區', price: 2650, rooms: 2, baths: 2, size: 22.1, tags: ['設計感', '英倫風'], agent: '陳雅婷' },
  ]
  db.viewings = [
    { id: 'v1', listingId: 'l1', date: '2026-05-24', time: '10:30', agent: '劉立君', status: 'pending' },
    { id: 'v2', listingId: 'l2', date: '2026-05-24', time: '14:00', agent: '黃仁祐', status: 'pending' },
    { id: 'v3', listingId: 'l3', date: '2026-05-24', time: '16:30', agent: '陳雅婷', status: 'pending' },
  ]
  write(db)
}

export function getDB(): DBSchema { return read() }
export function listListings(): RentalListing[] { return read().listings }
export function getListing(id: string): RentalListing | undefined { return read().listings.find(l => l.id === id) }
export function listViewings(): Viewing[] { return read().viewings }

export function getFavorites(): string[] { return readFav() }
export function toggleFavorite(id: string) {
  const fav = readFav()
  const next = fav.includes(id) ? fav.filter(x => x !== id) : [...fav, id]
  writeFav(next)
}
export function isFavorite(id: string): boolean { return readFav().includes(id) }

export function addViewing(listingId: string, date: string, time: string, agent: string) {
  const db = read()
  db.viewings.push({ id: 'v' + Date.now(), listingId, date, time, agent, status: 'pending' })
  write(db)
}
export function confirmViewing(id: string) {
  const db = read()
  const v = db.viewings.find(x => x.id === id)
  if (v) { v.status = 'confirmed'; write(db) }
}
