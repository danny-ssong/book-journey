"use client";

import { useState, useEffect } from "react";
import PostForm from "@/app/posts/_components/PostForm";
import { searchBooks } from "@/api/book";
import { useRouter, useSearchParams } from "next/navigation";
import { Book } from "@/types/book";
import { useAuth } from "@/app/_hooks/useAuth";

export default function NewPostClient() {
  const [initBook, setInitBook] = useState<Book | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const params = useSearchParams();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const isbn = params.get("isbn");

    if (!user) {
      router.push("/login");
      return;
    }

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
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return <PostForm initBook={initBook} />;
}
