"use client";

import { useId, useState } from "react";

import Heading from "@/components/common/Heading";
import InfiniteScroll from "@/components/common/InfiniteScroll";

import { useInfinitePosts } from "@/hooks/useInfinitePosts";

import MyPostCardCompact from "./_components/MyPostCardCompact";
import MyPostCardExpanded from "./_components/MyPostCardExpanded";
import ViewToggleButtons from "./_components/ViewToggleButtons";

export default function ManagePostsPage() {
  const { posts, isLoading, fetchNextPage, hasNextPage } = useInfinitePosts({
    type: "my",
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const headerId = useId();

  return (
    <section aria-labelledby={headerId}>
      <header className="mb-5 flex items-center justify-between px-4">
        <Heading text="글 관리" id={headerId} variant="h1" />
        <ViewToggleButtons
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </header>
      <InfiniteScroll
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
      >
        <ul className="min-h-[500px]">
          {posts.map((post) => (
            <li key={post.id}>
              {isExpanded ? (
                <MyPostCardExpanded post={post} />
              ) : (
                <MyPostCardCompact post={post} />
              )}
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </section>
  );
}
