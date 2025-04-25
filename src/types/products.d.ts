declare interface ProductImage {
  id: string
  image160pxUrl: string
  image400pxUrl: string
  image800pxUrl: string
  image1500pxUrl: string
}

declare interface Product {
  [key: string]: unknown
  id: string | number
  media?: {
    images?: ProductImage[]
  }
  price: number
}

declare interface Products extends PaginationAPI {
  items: Product[]
}
