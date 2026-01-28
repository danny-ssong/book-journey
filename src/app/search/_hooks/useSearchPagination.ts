"use client";

import { useEffect, useState } from "react";

import { usePrefetchSearchBooks, useSearchBooks } from "@/api/client/book.queries";

export function useSearchPagination(query: string) {
  const [page, setPage] = useState(1);
  const { data } = useSearchBooks(query, 10, page);
  const prefetchSearchBooks = usePrefetchSearchBooks();

  const books = data?.documents || [];
  const isLastPage = data?.meta?.is_end ?? true;

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
