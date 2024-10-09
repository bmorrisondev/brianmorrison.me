export type SeriesEntry = {
  order?: number
  title?: string
  slug?: string
}

export type SeriesCollection = {
  name?: string
  icon?: any
  entries?: SeriesEntry[]
}

export type GuestbookEntry = {
  id: number
  userId: string
  name: string
  imageUrl: string
  message: string
  createdOn: Date
  isApproved?: boolean
}