import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBook, searchBooks } from "@/api/book";

export function useGetBook(isbn: string) {
  return useQuery({
    queryKey: ["book", isbn],
    queryFn: () => getBook(isbn),
    enabled: !!isbn,
  });
}

export function useSearchBooks(
  query: string,
  take: number = 10,
  page: number,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["search-books", query, take, page],
    queryFn: () => searchBooks(query, take, page),
    enabled,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  });
}

export function usePrefetchSearchBooks() {
  const queryClient = useQueryClient();

  return (query: string, take: number = 10, page: number) => {
    return queryClient.prefetchQuery({
      queryKey: ["search-books", query, take, page],
      queryFn: () => searchBooks(query, take, page),
    });
  };
}
