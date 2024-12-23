import { createStore } from "zustand";
import { QueryStoreProps, QueryStoreState } from "./interfaces";

export const queryStore = (_?: Partial<QueryStoreProps>) => {
  return createStore<QueryStoreState>()((set, get) => ({
    cache: {},
    event: "",
    clearCache: () => {
      set((state) => ({
        ...state,
        event: "clearCache" + String(Math.random()),
        cache: Object.keys(state?.cache || {}).reduce(
          (reducer, key) => ({ ...reducer, [key]: null }),
          {}
        ),
      }));
    },
    clearCacheBySubstring: (value: string) => {
      set((state) => {
        const newCache = Object.keys(state.cache || {}).reduce(
          (acc: any, key: any) => {
            if (!key.includes(value)) {
              acc[key] = state.cache?.[key];
            }
            return acc;
          },
          {} as typeof state.cache
        );

        return { ...state, cache: newCache };
      });
    },
    refetch: async <E = any>(value?: string) => {
      if (!value) {
        return null;
      }

      const store = get();
      const cache = store.cache;

      if (cache?.[value] && cache[value].mutate) {
        await cache[value].mutate({ get });

        return get()?.["cache"]?.[value]?.data as E;
      }

      return null;
    },
    mutate: (key, queryState) => {
      const cache = get().cache;

      const newCache = {
        ...cache,
        [key]: {
          ...cache?.[key],
          ...queryState,
          mutate: (cache?.[key] || queryState)?.mutate
            ? () => ((cache?.[key] || queryState) as any)?.mutate({ get })
            : undefined,
        },
      };

      set((state) => ({ ...state, cache: newCache }));

      return newCache[key];
    },
  }));
};
