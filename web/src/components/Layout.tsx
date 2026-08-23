import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold">🏠 找房配對助手</Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link to="/" className="hover:underline">物件總覽</Link>
            <Link to="/compare" className="hover:underline">比較</Link>
            <Link to="/viewings" className="hover:underline">看屋行程</Link>
            <Link to="/favorites" className="hover:underline">收藏</Link>
            <Link to="/messages" className="hover:underline">訊息</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">{children}</main>
      <footer className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">找房配對助手 · Sprint 1 · Mock 資料</footer>
    </div>
  )
}
