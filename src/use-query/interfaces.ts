import { queryStore } from './store'

type QueryStoreProps<T = any> = {
  event?: string;
  cache?: { [key: string]: QueryState<T> }
}

export type FetcherParams =  { get?: () => QueryStoreState }

export type QueryState<T = any> = {
  data?: T
  isFetching?: boolean
  isLoading?: boolean
  mutate?: (params?: FetcherParams) => void
  error?: any
  changeCache?: (data: any) => void;
}

export type QueryOptions = {
  enableCache?: boolean
  interval?: number;
  enabled?: boolean;
  onError?: (err: any) => void;
}

interface QueryStoreState<T = any> extends QueryStoreProps {
  clearCache: () => void
  refetch: <E>(value?: string) => Promise<E | null>
  clearCacheBySubstring: (value: string) => void
  mutate: (key: string, value?: QueryState<T>) => QueryState<any>
}

type QueryStoreType = ReturnType<typeof queryStore>

export type { QueryStoreProps, QueryStoreState, QueryStoreType }
