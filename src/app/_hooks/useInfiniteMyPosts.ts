import { useInfiniteQuery } from "@tanstack/react-query";
import { PaginationResponse } from "@/types/pagination-response";
import { PostWithBook } from "@/types/post";
import { getMyPosts } from "../posts/_lib/post";

export function useInfiniteMyPosts(take = 10) {
  const { data, ...rest } = useInfiniteQuery<
    PaginationResponse<PostWithBook>,
    Error
  >({
    queryKey: ["my-posts"],
    queryFn: ({ pageParam }) =>
      getMyPosts(take, pageParam as string | undefined),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: undefined,
  });

  const posts = data?.pages.flatMap((page) => page.data) ?? [];
  return { posts, ...rest };
}
