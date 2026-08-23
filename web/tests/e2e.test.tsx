import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'
import { listListings, listViewings, getFavorites, toggleFavorite, isFavorite, addViewing, confirmViewing, seedDemoData, getDB } from '../src/lib/db'

function renderAt(p: string) { return render(<MemoryRouter initialEntries={[p]}><App /></MemoryRouter>) }

beforeEach(async () => {
  localStorage.clear()
  seedDemoData()
})

describe('Sprint 1 E2E - 找房配對助手', () => {
  it('總覽列出 3 個物件', () => {
    renderAt('/')
    expect(screen.getByTestId('match-list').children.length).toBe(3)
  })

  it('物件預載 3 筆', () => {
    expect(listListings().length).toBe(3)
  })

  it('看屋行程預載 3 個', () => {
    expect(listViewings().length).toBe(3)
  })

  it('收藏功能', () => {
    expect(getFavorites().length).toBe(0)
    toggleFavorite('l1')
    expect(isFavorite('l1')).toBe(true)
    toggleFavorite('l1')
    expect(isFavorite('l1')).toBe(false)
  })

  it('比較頁顯示 3 欄', () => {
    renderAt('/compare')
    const headers = screen.getByTestId('compare-table').querySelectorAll('th')
    expect(headers.length).toBe(4)
  })

  it('看屋行程頁可確認', () => {
    const v = listViewings()[0]
    confirmViewing(v.id)
    expect(getDB().viewings.find(x => x.id === v.id)!.status).toBe('confirmed')
  })

  it('新增看屋行程', () => {
    const before = listViewings().length
    addViewing('l2', '2026-06-15', '11:00', '黃仁祐')
    expect(listViewings().length).toBe(before + 1)
  })

  it('收藏頁面空狀態(未收藏時)', () => {
    renderAt('/favorites')
    const list = screen.getByTestId('favorites-list')
    expect(list.children.length).toBe(0)
  })

  it('收藏後收藏頁顯示物件', () => {
    toggleFavorite('l2')
    renderAt('/favorites')
    expect(screen.getByTestId('favorites-list').children.length).toBe(1)
  })

  it('訊息頁有 2 則對話', () => {
    renderAt('/messages')
    expect(screen.getByTestId('messages-list').children.length).toBe(2)
  })

  it('看屋頁行程預載 3 筆', () => {
    renderAt('/viewings')
    expect(screen.getByTestId('viewings-list').children.length).toBe(3)
  })
})
