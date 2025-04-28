declare interface Category {
  [key: string]: unknown
  id: string | number
  name: string
  seoTitle: string
  enabled: boolean
  orderBy: number
  productIds: string[]
  parentId?: string | number
  thumbnail?: string
  imageUrl?: string
  alt?: string
}

declare type CategoryItem = Category

declare interface Categories extends PaginationAPI {
  items: CategoryItem[]
}
