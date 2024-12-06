import { useEffect, useState} from 'react'

import { useQueryClient } from './context'
import { FetcherParams, QueryOptions, QueryState } from './interfaces'

export type useQueryProps<T> = {
  queryKey: any
  queryFn: (params?: any) => T
} & QueryOptions

export function useQuery<T>({ enabled = true, queryKey, queryFn, interval, enableCache, onError }: useQueryProps<T>) {
  const [useQueryIsReady, setUseQueryIsReady] = useState(false);

  const KEY = queryKey?.toString()

  const cache = useQueryClient((state) => state.cache[KEY])
  const mutateQuery = useQueryClient((state) => state.mutate)
  const eventQueryClient = useQueryClient((state) => state.event)

  async function fetcher({ get }: FetcherParams) {
    try {
      if (enabled !== undefined && !enabled) {
        await mutateQuery(KEY, { data: null, isFetching: false, isLoading: false, error: null })
        return
      }

      const queryState = get && get()['cache'][KEY]

      await mutateQuery(KEY, {
        isFetching: true,
        isLoading: queryState?.data ? false : true,
        error: null,
      })

      const response = await queryFn()

      await mutateQuery(KEY, { data: response, isFetching: false, isLoading: false, error: null })

      return response
    } catch (err) {
      onError && onError(err)
      await mutateQuery(KEY, { data: null, isFetching: false, isLoading: false, error: err })

      return err
    }
  }

  async function changeCache(data) {
    await mutateQuery(KEY, { data, error: null, isFetching: false, isLoading: false })
  }

  const startQueryState = {
    data: null,
    error: null,
    isFetching: enabled ? true : false,
    isLoading: enabled ? true : false,
    mutate: fetcher,
    changeCache,
  }

  useEffect(() => {

    if (enabled) {
      if (cache && enableCache && !cache?.error) {
        return
      }

      const query = mutateQuery(KEY, startQueryState)

      if (interval) {
        if (!cache?.mutate) setInterval(() => query.mutate(), interval)
      } else {
        query.mutate()
      }
    }

    setUseQueryIsReady(true)
  }, [KEY, enabled])

  useEffect(() => {
    if (eventQueryClient?.includes("clearCache") && !cache && useQueryIsReady) {
     const query = mutateQuery(KEY, startQueryState)

      query.mutate()
    }
  }, [eventQueryClient, cache])

  return (cache ? { ...cache, mutate: cache?.mutate || startQueryState?.mutate, changeCache } : startQueryState) as Required<QueryState<Awaited<T>>>
}
