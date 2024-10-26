"use client";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import searchBooks from "../actions/searchBooks";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import PaginationButtons from "../manage/posts/_components/PaginationButtons";
import Image from "next/image";

//author로 redirect하는 경우 나중에 searchPage가 아니라 authorPage를 만들어서 next에서 캐싱해놔도 될 듯z
// export default function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {

export default function Page() {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const query = searchParams.get("query");

  const { data } = useQuery({
    queryKey: ["search", query, page],
    queryFn: () => searchBooks(query, 10, page),
    select: (response) => {
      return { books: response?.documents, isLastPage: response?.meta.is_end };
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

  if (!query) return <div>no search</div>;

  return (
    <div className="px-10">
      <div className="space-y-4 min-h-[400px] flex justify-center items-center">
        {books && books.length > 0 ? (
          <ul>
            {books?.map((book: SearchedBook, i: number) => (
              <li key={i}>
                <div className="px-4 py-2 flex gap-4 mb-6">
                  <Link href={`/books/${book.isbn}`}>
                    <div className="w-[120px] h-[160px] cursor-pointer">
                      <Image
                        src={book.thumbnail}
                        alt={book.title}
                        width={120}
                        height={160}
                        className="overflow-hidden border object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex-1 flex flex-col gap-2">
                    <h3>
                      <Link href={`/books/${book.isbn}`} className="cursor-pointer hover:underline">
                        {book.title}
                      </Link>
                    </h3>
                    <p>
                      <Link
                        href={`/search?query=${book.authors[0]}`}
                        className="text-sm cursor-pointer hover:underline "
                      >
                        {book.authors[0]}
                      </Link>
                    </p>
                    <p className="text-sm">
                      {book.publisher} {dayjs(book.datetime).format("YYYY-MM-DD")}
                    </p>
                    <p className="text-sm line-clamp-3">{book.contents}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>검색된 결과가 없습니다.</p>
        )}
      </div>
      <div className="flex justify-center gap-10 mt-4">
        <button
          className={`px-4 py-2 bg-gray-200 ${page === 1 && "opacity-50"}`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          {"<"}
        </button>
        <button
          className={`px-4 py-2 bg-gray-200 ${isLastPage && "opacity-50"}`}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isLastPage}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
