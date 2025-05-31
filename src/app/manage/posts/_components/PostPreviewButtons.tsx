"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/app/posts/_lib/post";
import clsx from "clsx";

function PostActionButtons({ postId }: { postId: number }) {
  const queryClient = useQueryClient();
  const [showButtons, setShowButtons] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDelete = async () => {
    const confirmDelete = confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      const result = await deletePost(postId);
      if (result) queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    }
  };

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowButtons(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} onClick={() => setShowButtons((prev) => !prev)}>
      <div
        className={clsx(
          "z-10 mt-2 flex gap-2 rounded",
          "transition-opacity duration-200",
          {
            "pointer-events-auto opacity-100": showButtons,
            "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100":
              !showButtons,
          },
        )}
      >
        <Button asChild>
          <Link href={`/posts/edit/${postId}`}>수정</Link>
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          삭제
        </Button>
      </div>
    </div>
  );
}

export default PostActionButtons;
