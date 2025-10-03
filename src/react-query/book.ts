import { searchBooks } from "@/api/book";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useSearchBooks(query: string, take: number = 10, page: number) {
  return useQuery({
    queryKey: ["search-books", query, take, page],
    queryFn: () => searchBooks(query, take, page),
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
