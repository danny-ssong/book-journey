"use client";

import { useQuery } from "@tanstack/react-query";
import ExapndedPostPreviewForManage from "./_components/PostPreviewForManage";
import PaginationForClient from "@/app/search/_components/Pagination";
import { useEffect, useState } from "react";
import CompactPostPreviewForManage from "./_components/CompactPostPreview";
import getPosts from "@/app/actions/getPosts";
import { User } from "@supabase/supabase-js";
import getUserOnClient from "@/app/_lib/getUserOnClient";

export default function ManagePostsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showExpanded, setShowExpanded] = useState<boolean>(true);
  const size = 10;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const user = await getUserOnClient();
      setUser(user);
    }
    getUser();
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["userOwnPosts", currentPage],
    queryFn: () => getPosts(size, currentPage, user?.id, true),
    enabled: !!user,
  });

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다</div>;
  }

  return (
    <div className="mt-5 w-[800px]">
      <header className="flex justify-between items-center px-4">
        <h1 className="mb-5 text-xl ">글 관리</h1>
        <div className="flex ">
          <button
            className={`hover:bg-slate-300 p-1 ${!showExpanded && "bg-slate-200"}`}
            onClick={() => setShowExpanded(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z" />
            </svg>
          </button>
          <button
            className={`hover:bg-slate-300 p-1 ${showExpanded && "bg-slate-200"}`}
            onClick={() => setShowExpanded(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z" />
            </svg>
          </button>
        </div>
      </header>
      <div>
        <ul className="min-h-[500px] bg-white border">
          {data?.posts.map((post) =>
            showExpanded ? (
              <ExapndedPostPreviewForManage key={post.id} post={post} isOwner />
            ) : (
              <CompactPostPreviewForManage key={post.id} post={post} isOwner />
            )
          )}
        </ul>
        <PaginationForClient
          page={currentPage}
          isLastPage={data?.isLastPage ?? false}
          onPageChange={(page: number) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
}
