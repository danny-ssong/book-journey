"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useGetBook } from "@/react-query/book";
import { useGetMe } from "@/react-query/me";

import PostForm from "../../_components/PostForm";

export default function NewPostClient() {
  const router = useRouter();
  const params = useSearchParams();
  const isbn = params.get("isbn");
  const { data: book, isLoading: isBookLoading } = useGetBook(isbn || "");
  const { data: me, isLoading, isError: isMeError } = useGetMe();

  if (isLoading || isBookLoading) return <div>Loading...</div>;

  if (isMeError) {
    router.push("/login");
    return null;
  }

  return <PostForm initBook={book} />;
}
