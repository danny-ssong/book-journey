"use client";

import { notFound, useParams } from "next/navigation";

import { useGetPost } from "@/react-query/post";

import PostForm from "../../_components/PostForm";

export default function PostEditPage() {
  const params = useParams();
  const { data, isLoading } = useGetPost(params.postId as string);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return notFound();

  return <PostForm initBook={data.book} initPost={data} />;
}
