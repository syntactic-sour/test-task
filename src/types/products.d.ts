declare interface Product {
  [key: string]: unknown
  id: string | number
}

declare interface Products extends PaginationAPI {
  items: Product[]
}
