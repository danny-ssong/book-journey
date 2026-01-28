import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";

import { getMyPosts, getPosts, getUserPosts } from "@/api/client/post";
import { postKeys } from "@/api/client/post.queries";
import { PaginationResponse } from "@/types/pagination-response";
import { PostWithBook } from "@/types/post";

type Props =
  | { type: "all"; take?: number }
  | { type: "my"; take?: number }
  | { type: "user"; take?: number; userId: string };

/**
 * @description 포스트 infiniteQuery로 조회하는 훅,
 * @param type
 *
 * all: 모든 포스트(비공개 포스트 제외)
 *
 * my: 내 포스트(비공개 포스트 포함)
 *
 * user: 사용자 포스트(비공개 포스트 제외)
 * @param userId optional: type이 'user'일 때 사용
 */
export function useInfinitePosts(props: Props) {
  const { type, take = 10 } = props;

  const getQueryKey = () => {
    if (type === "all") return postKeys.infiniteAll();
    if (type === "my") return postKeys.infiniteMy();
    if (type === "user") return postKeys.infiniteUser(props.userId);
    throw new Error(`Invalid type: ${type}`);
  };

  const queryFn = (context: QueryFunctionContext) => {
    const cursor = context.pageParam as string | undefined;
    if (type === "all") return getPosts(take, cursor);
    if (type === "my") return getMyPosts(take, cursor);
    if (type === "user") return getUserPosts(take, props.userId, cursor);
    throw new Error(`Invalid type: ${type}`);
  };

  const { data, ...rest } = useInfiniteQuery<
    PaginationResponse<PostWithBook>,
    Error
  >({
    queryKey: getQueryKey(),
    queryFn: queryFn,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: undefined,
  });

  const posts = data?.pages.flatMap((page) => page.data) ?? [];
  return { posts, ...rest };
}
