"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { useGetBook } from "@/react-query/book";

import PostForm from "../../_components/PostForm";

export default function NewPostClient() {
  const router = useRouter();
  const params = useSearchParams();
  const isbn = params.get("isbn");
  const { data: book, isLoading: isBookLoading } = useGetBook(isbn || "");
  const { user, isLoading } = useAuth();

  if (isLoading || isBookLoading) return <div>Loading...</div>;

  if (user === null) {
    router.push("/login");
    return null;
  }

  return <PostForm initBook={book} />;
}
