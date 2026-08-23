import { useState } from 'react'
import { listViewings, getListing, confirmViewing, addViewing } from '../lib/db'

export default function ViewingsPage() {
  const [, setTick] = useState(0)
  const viewings = listViewings()

  function quickAdd() {
    addViewing('l1', '2026-05-30', '15:00', '劉立君')
    setTick(t => t + 1)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📅 看屋行程</h1>
      <div className="space-y-2 mb-4" data-testid="viewings-list">
        {viewings.map(v => {
          const listing = getListing(v.listingId)
          return (
            <div key={v.id} className="border border-slate-200 rounded p-3 flex items-center justify-between" data-testid={`viewing-${v.id}`}>
              <div>
                <div className="font-medium text-sm">{listing?.title ?? v.listingId}</div>
                <div className="text-xs text-slate-500">{v.date} {v.time} · {v.agent}</div>
              </div>
              <button onClick={() => { confirmViewing(v.id); setTick(t => t + 1) }}
                disabled={v.status === 'confirmed'}
                className={`text-xs px-3 py-1 rounded ${v.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}
                data-testid={`confirm-${v.id}`}>
                {v.status === 'confirmed' ? '✓ 已確認' : '確認看屋'}
              </button>
            </div>
          )
        })}
      </div>
      <button onClick={quickAdd} className="w-full px-3 py-2 bg-orange-500 text-white rounded text-sm" data-testid="add-viewing">
        + 新增看屋行程(mock)
      </button>
    </div>
  )
}
