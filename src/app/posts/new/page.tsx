"use client";
import { useState, useEffect } from "react";
import PostForm from "../_components/PostForm";
import { searchBooks } from "@/app/books/_lib/book";
import { useSearchParams } from "next/navigation";
import { Book } from "@/types/book";

export default function NewPostPage() {
  const [initBook, setInitBook] = useState<Book | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const params = useSearchParams();
  const isbn = params.get("isbn");

  useEffect(() => {
    if (!isbn) {
      setIsLoading(false);
      return;
    }

    const fetchInitBook = async () => {
      try {
        const response = await searchBooks(isbn, 1, 1);
        const initBook =
          response?.documents && response?.documents?.length > 0
            ? response.documents[0]
            : undefined;
        setInitBook(initBook);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitBook();
  }, [isbn]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return <PostForm initBook={initBook} />;
}
