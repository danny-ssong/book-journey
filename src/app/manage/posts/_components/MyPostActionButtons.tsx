"use client";

import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

import { useDeletePost } from "@/api/client/post.queries";

function MyPostActionButtons({ postId }: { postId: number }) {
  const deletePostMutation = useDeletePost(postId);

  const handleDelete = async () => {
    const confirmDelete = confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      deletePostMutation.mutate();
    }
  };

  return (
    // 데스크톱: 호버로만 표시, 모바일: 항상 표시
    <div className="flex gap-2 rounded opacity-100 transition-opacity duration-200 lg:opacity-0 lg:group-hover:opacity-100">
      <Button asChild size="sm">
        <Link href={`/posts/edit/${postId}`}>수정</Link>
      </Button>
      <Button variant="destructive" onClick={handleDelete} size="sm">
        삭제
      </Button>
    </div>
  );
}

export default MyPostActionButtons;
