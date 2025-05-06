import { useInfiniteQuery } from "@tanstack/react-query";
import { PaginationResponse } from "@/types/pagination-response";
import { PostWithBook } from "@/types/post";
import { getPosts, getUserPosts } from "../posts/_lib/post";

export function useInfiniteUserPosts(userId: string, take = 10) {
  const { data, ...rest } = useInfiniteQuery<
    PaginationResponse<PostWithBook>,
    Error
  >({
    queryKey: ["user-posts", userId],
    queryFn: ({ pageParam }) => getUserPosts(take, userId, pageParam as string),
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: undefined,
  });

  const posts = data?.pages.flatMap((page) => page.data) ?? [];

  return { posts, ...rest };
}
