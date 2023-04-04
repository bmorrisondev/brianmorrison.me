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

