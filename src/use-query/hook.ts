import { useEffect, useState } from "react";

import { useQueryClient } from "./context";
import { FetcherParams, QueryOptions, QueryState } from "./interfaces";

export type useQueryProps<T> = {
  queryKey: any;
  queryFn: (params?: any) => T;
  onError?: (e: any) => void;
  onSuccess?: (data: T) => void;
  isMutation?: boolean;
} & QueryOptions;

export function useQuery<T>({
  onError,
  queryFn,
  onSuccess,
  interval,
  queryKey,
  isMutation,
  enableCache,
  enabled = true,
}: useQueryProps<T>) {
  const [useQueryIsReady, setUseQueryIsReady] = useState(false);

  const KEY = queryKey?.toString();

  const cache = useQueryClient((state) => state.cache?.[KEY]);
  const mutateQuery = useQueryClient((state) => state.mutate);
  const eventQueryClient = useQueryClient((state) => state.event);

  async function fetcher(params: FetcherParams & any) {
    try {

      if (enabled !== undefined && !enabled && !isMutation) {
        await mutateQuery(KEY, {
          data: null,
          isFetching: false,
          isLoading: false,
          error: null,
        });
        return;
      }

      const queryState = params?.get && params?.get()?.["cache"]?.[KEY];

      await mutateQuery(KEY, {
        isFetching: true,
        isLoading: queryState?.data ? false : true,
        error: null,
      });

      const response = await queryFn(params);

      await mutateQuery(KEY, {
        data: response,
        isFetching: false,
        isLoading: false,
        error: null,
      });

      onSuccess && onSuccess(response);

      return response;
    } catch (err) {
      onError && onError(err);
      await mutateQuery(KEY, {
        data: null,
        isFetching: false,
        isLoading: false,
        error: err,
      });

      return err;
    }
  }

  async function changeCache(data) {
    await mutateQuery(KEY, {
      data,
      error: null,
      isFetching: false,
      isLoading: false,
    });
  }

  const startQueryState = {
    data: null,
    error: null,
    isFetching: enabled ? true : false,
    isLoading: enabled ? true : false,
    mutate: fetcher,
    changeCache,
  };

  useEffect(() => {
    if (enabled) {
      if (cache && enableCache && !cache?.error) {
        return;
      }

      const query = mutateQuery(KEY, startQueryState as any);

      if (interval) {
        if (!cache?.mutate) setInterval(() => query?.mutate?.(), interval);
      } else {
        query?.mutate?.();
      }
    }

    setUseQueryIsReady(true);
  }, [KEY, enabled]);

  useEffect(() => {
    if (eventQueryClient?.includes("clearCache") && !cache && useQueryIsReady) {
      const query = mutateQuery(KEY, startQueryState as any);

      query?.mutate?.();
    }
  }, [eventQueryClient, cache]);

  return (
    cache
      ? {
          ...cache,
          mutate: cache?.mutate || startQueryState?.mutate,
          changeCache,
        }
      : startQueryState
  ) as Required<QueryState<Awaited<T>>>;
}
