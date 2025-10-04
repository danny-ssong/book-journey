"use client";

import { useState, useEffect } from "react";
import { usePrefetchSearchBooks, useSearchBooks } from "@/react-query/book";

export function useSearchPagination(query: string) {
  const { data } = useSearchBooks(query, 10, 1);
  const prefetchSearchBooks = usePrefetchSearchBooks();

  const [page, setPage] = useState(1);

  const books = data?.documents || [];
  const isLastPage = data?.meta?.is_end || true;

  useEffect(() => {
    if (!query || isLastPage) return;
    prefetchSearchBooks(query, 10, page + 1);
  }, [page, query, isLastPage, prefetchSearchBooks]);

  return {
    page,
    setPage,
    books,
    isLastPage,
  };
}
