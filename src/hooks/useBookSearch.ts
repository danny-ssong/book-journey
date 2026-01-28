"use client";

import { useEffect, useState } from "react";

import { useSearchBooks } from "@/api/client/book.queries";
import { SearchedBook } from "@/types/book";

export default function useBookSearch(debounceMs: number = 500) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { data, isLoading, error } = useSearchBooks(
    debouncedQuery,
    5,
    1,
    debouncedQuery.length >= 2,
  );

  // debounce 처리
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [query, debounceMs]);

  const books: SearchedBook[] = data?.documents || [];
  const isDebouncing = query !== debouncedQuery;

  return {
    query,
    setQuery,
    books,
    isLoading,
    error,
    isDebouncing,
  };
}
