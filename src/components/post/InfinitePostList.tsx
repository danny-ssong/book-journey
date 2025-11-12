"use client";

import { useInfinitePosts } from "@/hooks/useInfinitePosts";

import InfiniteScroll from "../common/InfiniteScroll";
import PostCardList from "./PostCardList";

type Props =
  | { type: "all"; take?: number }
  | { type: "my"; take?: number }
  | { type: "user"; take?: number; userId: string };

export default function InfinitePostList(props: Props) {
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts(props);

  return (
    <InfiniteScroll
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={isFetchingNextPage}
    >
      <PostCardList posts={posts} />
    </InfiniteScroll>
  );
}
