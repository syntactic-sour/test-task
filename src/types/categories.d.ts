declare interface Category {
  [key: string]: unknown
  id: string | number
  name: string
  seoTitle: string
  enabled: boolean
  orderBy: number
  productIds: string[]
  parentId?: string | number
}

declare type CategoryItem = Category | Product

declare interface Categories extends PaginationAPI {
  items: CategoryItem[]
}
