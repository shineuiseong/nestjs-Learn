export type InfinityPaginationResult<T> = Readonly<{
  data: T[]
  hasNextPage: boolean
}>
