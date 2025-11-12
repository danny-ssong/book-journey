"use client";

import { useSearchParams } from "next/navigation";
import { useId } from "react";

import Heading from "@/components/common/Heading";
import PaginationButtonsForClient from "@/components/common/PaginationButtonsForClient";

import { Book } from "@/types/book";

import { useSearchPagination } from "../_hooks/useSearchPagination";
import BookItem from "./BookItem";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const { page, setPage, books, isLastPage } = useSearchPagination(query);

  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <div className="min-h-[400px] space-y-4">
        <Heading id={headingId} variant="h1" text={"검색 결과"} />
        {books?.length > 0 ? (
          <ul>
            {books.map((book: Book) => (
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
    </section>
  );
}
