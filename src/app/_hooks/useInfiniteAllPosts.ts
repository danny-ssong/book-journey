import { useInfiniteQuery } from "@tanstack/react-query";
import { PaginationResponse } from "@/types/pagination-response";
import { PostWithBook } from "@/types/post";
import { getPosts } from "../posts/_lib/post";

export function useInfiniteAllPosts(take = 10) {
  const { data, ...rest } = useInfiniteQuery<
    PaginationResponse<PostWithBook>,
    Error
  >({
    queryKey: ["all-posts"],
    queryFn: ({ pageParam }) => getPosts(take, pageParam as string),
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
    initialPageParam: undefined,
  });

  const posts = data?.pages.flatMap((page) => page.data) ?? [];
  return { posts, ...rest };
}
