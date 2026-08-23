export interface RentalListing {
  id: string
  title: string
  district: string   // 大安區 / 信義區 / 中山區
  price: number      // TWD/month
  rooms: number      // 房數
  baths: number      // 衛數
  size: number       // 坪
  tags: string[]
  agent: string
}

export interface Viewing {
  id: string
  listingId: string
  date: string
  time: string
  agent: string
  status: 'pending' | 'confirmed' | 'done'
}
