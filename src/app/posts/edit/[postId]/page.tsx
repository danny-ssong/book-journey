"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getPost } from "@/api/post";
import { PostWithBook } from "@/types/post";

import PostForm from "../../_components/PostForm";

export default function PostEditPage() {
  const params = useParams();
  const [postWithBook, setPostWithBook] = useState<PostWithBook | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postId = params?.postId as string;
        if (!postId) {
          // router.push("/404");
          return;
        }

        const postData = await getPost(postId);
        if (!postData) {
          // router.push("/404");
          console.log("postData not found");
          return;
        }

        setPostWithBook(postData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.postId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!postWithBook) return <div>접근 불가 페이지입니다.</div>;

  return <PostForm initBook={postWithBook.book} initPost={postWithBook} />;
}
