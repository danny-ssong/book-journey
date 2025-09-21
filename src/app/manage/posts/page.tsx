"use client";

import ExpandedPostPreviewForManage from "./_components/ExapndedPostPreviewForManage";
import { Fragment, useState } from "react";
import CompactPostPreviewForManage from "./_components/CompactPostPreview";
import { Button } from "@/components/ui/button";
import { useInfinitePosts } from "@/app/_hooks/useInfinitePosts";
import InfiniteScroll from "@/app/_components/InfiniteScroll";

export default function ManagePostsPage() {
  const { posts, isLoading, error, fetchNextPage, hasNextPage } =
    useInfinitePosts({ type: "my" });
  const [showExpanded, setShowExpanded] = useState<boolean>(true);

  return (
    <div className="w-full">
      <header className="flex items-center justify-between px-4">
        <h1 className="mb-5 text-xl">글 관리</h1>
        <div className="flex">
          <Button
            className={`p-2 ${showExpanded && "bg-secondary"}`}
            onClick={() => {
              setShowExpanded(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="#5f6368"
              className="h-6 w-6"
            >
              <path d="M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z" />
            </svg>
          </Button>
          <Button
            className={`p-2 ${!showExpanded && "bg-secondary"}`}
            onClick={() => {
              setShowExpanded(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z" />
            </svg>
          </Button>
        </div>
      </header>
      <InfiniteScroll
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
      >
        <div>
          <ul className="min-h-[500px] border">
            {posts.map((post) => (
              <Fragment key={post.id}>
                {showExpanded ? (
                  <ExpandedPostPreviewForManage post={post} isOwner />
                ) : (
                  <CompactPostPreviewForManage post={post} isOwner />
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      </InfiniteScroll>
    </div>
  );
}
