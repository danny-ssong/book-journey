import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBook, searchBooks } from "@/api/client/book";

export const bookKeys = {
  all: ["book"] as const,
  details: () => [...bookKeys.all, "detail"] as const,
  detail: (isbn: string) => [...bookKeys.details(), isbn] as const,
  searches: () => [...bookKeys.all, "search"] as const,
  search: (query: string, take: number, page: number) =>
    [...bookKeys.searches(), { query, take, page }] as const,
};

export function useGetBook(isbn: string) {
  return useQuery({
    queryKey: bookKeys.detail(isbn),
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
    queryKey: bookKeys.search(query, take, page),
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
      queryKey: bookKeys.search(query, take, page),
      queryFn: () => searchBooks(query, take, page),
    });
  };
}
