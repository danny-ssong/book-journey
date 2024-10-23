"use client";
import React from "react";
import deletePost from "@/app/actions/deletePost";
import Link from "next/link";

function PostPreviewButtons({ postId }: { postId: number }) {
  const handleDelete = async () => {
    const boolean = confirm("정말로 삭제하시겠습니까?");

    if (boolean) await deletePost(postId);
  };

  return (
    <div className="flex gap-2 mr-2 opacity-0 group-hover:opacity-100">
      <Link href={`/posts/edit/${postId}`}>
        <div className="px-4 py-1 border-2">수정</div>
      </Link>
      <button onClick={handleDelete} className="px-4 py-1 border-2">
        삭제
      </button>
    </div>
  );
}

export default PostPreviewButtons;
