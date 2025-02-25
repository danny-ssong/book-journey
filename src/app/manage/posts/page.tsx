"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import ExpandedPostPreviewForManage from "./_components/ExapndedPostPreviewForManage";
import PaginationButtonsForClient from "@/app/_components/PaginationButtonsForClient";
import { useEffect, useState } from "react";
import CompactPostPreviewForManage from "./_components/CompactPostPreview";
import getPosts from "@/app/actions/getPosts";
import getUserOnClient from "@/app/_lib/getUserOnClient";
import { Button } from "@/components/ui/button";
import useUserOnClient from "@/app/_hooks/useCurrentUser";

export default function ManagePostsPage() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showExpanded, setShowExpanded] = useState<boolean>(true);
  const size = showExpanded ? 5 : 8;

  const user = useUserOnClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["userOwnPosts", currentPage, size],
    queryFn: () => {
      if (!user?.id) throw new Error("User not found");
      return getPosts(size, currentPage, user.id, true);
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (!data?.isLastPage && user?.id) {
      queryClient.prefetchQuery({
        queryKey: ["userOwnPosts", currentPage + 1, size],
        queryFn: () => getPosts(size, currentPage + 1, user?.id, true),
      });
    }
  }, [currentPage, queryClient, size, data, user]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다</div>;
  }

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
      <div>
        <ul className="min-h-[500px] border">
          {data?.posts.map((post) =>
            showExpanded ? (
              <ExpandedPostPreviewForManage key={post.id} post={post} isOwner />
            ) : (
              <CompactPostPreviewForManage key={post.id} post={post} isOwner />
            ),
          )}
        </ul>
        <PaginationButtonsForClient
          page={currentPage}
          isLastPage={data?.isLastPage ?? false}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
