"use client";

import { notFound, useParams } from "next/navigation";

import Loading from "@/components/common/Loading";

import { useGetPost } from "@/api/client/post.queries";

import PostForm from "../../_components/PostForm";

export default function PostEditPage() {
  const params = useParams();
  const { data, isLoading } = useGetPost(params.postId as string);

  if (isLoading) return <Loading text="게시글을 불러오는 중..." />;
  if (!data) return notFound();

  return <PostForm initBook={data.book} initPost={data} />;
}
