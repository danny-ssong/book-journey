export interface PaginationResponse<T> {
  data: T[];
  nextCursor: number;
  count: number;
}
