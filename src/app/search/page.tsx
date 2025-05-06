"use client";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import PaginationButtons from "../_components/PaginationButtons";
import Image from "next/image";
import BookItem from "./_components/BookItem";
import PaginationButtonsForClient from "../_components/PaginationButtonsForClient";
import { searchBooks } from "../books/_lib/book";

//author로 redirect하는 경우 나중에 searchPage가 아니라 authorPage를 만들어서 next에서 캐싱해놔도 될 듯z
// export default function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {

export default function Page() {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const query = searchParams.get("query") || "";

  const { data } = useQuery({
    queryKey: ["search", query, page],
    queryFn: () => searchBooks(query, 10, page),
    select: (response) => {
      return {
        books: response?.documents,
        isLastPage: response?.meta.is_end ?? true,
      };
    },
  });

  const { books, isLastPage } = data ?? { books: [], isLastPage: true };

  useEffect(() => {
    if (!isLastPage) {
      queryClient.prefetchQuery({
        queryKey: ["search", query, page + 1],
        queryFn: () => searchBooks(query, 10, page + 1),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["search", query, page - 1],
        queryFn: () => searchBooks(query, 10, page - 1),
      });
    }
  }, [page, query, isLastPage, queryClient]);

  if (!query) return <div>검색어를 입력해주세요.</div>;

  return (
    <div className="px-10">
      <div className="min-h-[400px] space-y-4">
        <h1 className="pl-4 text-2xl font-semibold">검색 결과</h1>
        {books && books.length > 0 ? (
          <ul>
            {books?.map((book: SearchedBook) => (
              <li key={book.isbn}>
                <BookItem book={book} />
              </li>
            ))}
          </ul>
        ) : (
          <p>검색된 결과가 없습니다.</p>
        )}
      </div>
      <PaginationButtonsForClient
        page={page}
        isLastPage={isLastPage}
        onPageChange={setPage}
      />
    </div>
  );
}
