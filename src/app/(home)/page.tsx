import { Metadata } from 'next'

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { getPosts } from '@/actions/posts'
import { postKeys } from '@/api/client/post.queries'

import RecentPostsSection from './_components/RecentPostsSection'

// 메인 피드는 60초 단위 ISR로 서빙. 서버에서 첫 페이지를 prefetch해
// HydrationBoundary로 클라이언트에 넘겨 SSR HTML에 책 표지가 포함되도록 한다.
export const revalidate = 60

export default async function HOME() {
  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery({
    queryKey: postKeys.infiniteAll(),
    queryFn: () => getPosts(10),
    initialPageParam: undefined,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecentPostsSection />
    </HydrationBoundary>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: `book-journey` }
}
