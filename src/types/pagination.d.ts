declare interface PaginationAPIPartial {
  offset: number
  limit: number
}

declare interface PaginationAPI extends PaginationAPIPartial {
  total: number
  count: number
}
