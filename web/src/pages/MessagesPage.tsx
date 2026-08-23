export default function MessagesPage() {
  const msgs = [
    { id: 'm1', from: '劉立君', preview: '看屋時間方便嗎?', time: '10:32' },
    { id: 'm2', from: '黃仁祐', preview: '附家具的方案已寄', time: '昨日' },
  ]
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">💬 我的訊息</h1>
      <div className="space-y-2" data-testid="messages-list">
        {msgs.map(m => (
          <div key={m.id} className="border border-slate-200 rounded p-3" data-testid={`msg-${m.id}`}>
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">{m.from}</span>
              <span className="text-xs text-slate-400">{m.time}</span>
            </div>
            <div className="text-xs text-slate-600 mt-1">{m.preview}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
