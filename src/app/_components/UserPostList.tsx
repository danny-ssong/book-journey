"use client";

import React from "react";
import { useInfiniteUserPosts } from "../_hooks/useInfiniteUserPosts";
import InfiniteScroll from "./InfiniteScroll";
import PostList from "./PostList";

export default function UserPostList({ userId }: { userId: string }) {
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteUserPosts(userId);

  return (
    <InfiniteScroll
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={isFetchingNextPage}
    >
      <PostList posts={posts} />
    </InfiniteScroll>
  );
}
