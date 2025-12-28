"use client";

import { useParams } from "next/navigation";

import ErrorAlert from "@/components/common/ErrorAlert";
import Loading from "@/components/common/Loading";

import { useGetPost } from "@/react-query/post";

import PostViewer from "@/app/posts/_components/PostViewer";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isPending, isError, error } = useGetPost(id);

  if (isPending) return <Loading loadingText="게시글을 불러오는 중입니다..." />;

  if (isError) {
    return (
      <ErrorAlert
        title="게시글을 불러오는 중에 에러가 발생했습니다."
        description={error.message}
      />
    );
  }

  return <PostViewer post={data} />;
}
