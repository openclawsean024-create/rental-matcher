import { listListings } from '../lib/db'

export default function ComparePage() {
  const listings = listListings()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">⚖️ 物件比較</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" data-testid="compare-table">
          <thead className="border-b">
            <tr><th className="text-left py-2">物件</th>{listings.map(l => <th key={l.id} className="text-left py-2">{l.title}</th>)}</tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="py-2">區域</td>{listings.map(l => <td key={l.id}>{l.district}</td>)}</tr>
            <tr className="border-b"><td className="py-2">月租</td>{listings.map(l => <td key={l.id} className="font-bold">{l.price.toLocaleString()}</td>)}</tr>
            <tr className="border-b"><td className="py-2">房 / 衛</td>{listings.map(l => <td key={l.id}>{l.rooms} / {l.baths}</td>)}</tr>
            <tr className="border-b"><td className="py-2">坪數</td>{listings.map(l => <td key={l.id}>{l.size}</td>)}</tr>
            <tr className="border-b"><td className="py-2">標籤</td>{listings.map(l => <td key={l.id}>{l.tags.join('、')}</td>)}</tr>
            <tr><td className="py-2">業務</td>{listings.map(l => <td key={l.id}>{l.agent}</td>)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
