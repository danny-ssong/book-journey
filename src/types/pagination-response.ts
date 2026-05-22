export interface PaginationResponse<T> {
  data: T[]
  nextCursor: number | null
  count: number
}
