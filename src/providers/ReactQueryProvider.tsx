'use client'

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { toast } from 'sonner'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        gcTime: 1000 * 60 * 10,
        staleTime: 1000 * 60 * 10,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (query.state.data !== undefined) {
          const errorMessage = query.meta?.errorMessage ?? '최신 데이터를 불러오지 못했습니다.'

          if (typeof errorMessage === 'string') {
            toast.error(errorMessage)
          }
        }
      },
    }),
  })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: 항상 새로운 query client를 만든다.
    return makeQueryClient()
  }

  // Browser: 이미 가지고 있지 않다면 새로운 query client를 만든다.
  // 이는 초기 렌더링 중에 React가 일시 중단(suspense)될 경우 새로운 client를 만들지 않도록 하기 위해서이다.
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
