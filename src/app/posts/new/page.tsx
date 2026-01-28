"use client";

import { useSearchParams } from "next/navigation";

import Loading from "@/components/common/Loading";

import { useGetBook } from "@/api/client/book.queries";

import PostForm from "../_components/PostForm";

export default function NewPostPage() {
  const params = useSearchParams();
  const isbn = params.get("isbn");
  const { data: book, isLoading: isBookLoading } = useGetBook(isbn || "");

  if (isBookLoading) return <Loading />;

  return <PostForm initBook={book} />;
}
