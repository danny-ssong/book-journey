"use client";
import InfiniteScroll from "@/app/_components/InfiniteScroll";
import PostList from "@/app/_components/PostList";
import { useInfiniteAllPosts } from "@/app/_hooks/useInfiniteAllPosts";

export default function AllPostList() {
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteAllPosts();

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
