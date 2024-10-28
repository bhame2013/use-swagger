import { createContext, useRef, useContext } from 'react'

import { useStore } from 'zustand'
import { queryStore } from './store'

import { QueryStoreProps, QueryStoreState, QueryStoreType } from './interfaces'

export const QueryClientContext = createContext<QueryStoreType | null>(null)

function QueryClientSwaggerContextProvider({ children, ...props }:  React.PropsWithChildren<QueryStoreProps>) {
  const storeRef = useRef<QueryStoreType>()

  if (!storeRef.current) {
    storeRef.current = queryStore(props)
  }

  return (
    <QueryClientContext.Provider value={storeRef.current}>
      {children}
    </QueryClientContext.Provider>
  )
}

function useQueryClient<T>(selector: (state: QueryStoreState) => T): T {
  const store = useContext(QueryClientContext)
  if (!store) throw new Error('Missing QueryClientContext.Provider in the tree')
  return useStore(store, selector)
}

export { QueryClientSwaggerContextProvider, useQueryClient }



