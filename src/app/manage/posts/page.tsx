"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import ExpandedPostPreviewForManage from "./_components/ExapndedPostPreviewForManage";
import PaginationButtonsForClient from "@/app/_components/PaginationButtonsForClient";
import { Fragment, useEffect, useState } from "react";
import CompactPostPreviewForManage from "./_components/CompactPostPreview";
import getUserOnClient from "@/app/_lib/getUserOnClient";
import { Button } from "@/components/ui/button";
import useUserOnClient from "@/app/_hooks/useCurrentUser";
import { useInfiniteMyPosts } from "@/app/_hooks/useInfiniteMyPosts";
import InfiniteScroll from "@/app/_components/InfiniteScroll";

export default function ManagePostsPage() {
  const { posts, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteMyPosts(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showExpanded, setShowExpanded] = useState<boolean>(true);
  const size = showExpanded ? 5 : 8;

  return (
    <div>
      <header className="flex items-center justify-between px-4">
        <h1 className="mb-5 text-xl">글 관리</h1>
        <div className="flex">
          <Button
            className={`p-2 ${showExpanded && "bg-secondary"}`}
            onClick={() => {
              setShowExpanded(false);
              setCurrentPage(1);
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
              setCurrentPage(1);
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
