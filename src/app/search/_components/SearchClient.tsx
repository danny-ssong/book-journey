"use client";

import { useSearchParams } from "next/navigation";
import BookItem from "./BookItem";
import PaginationButtonsForClient from "../../_components/PaginationButtonsForClient";
import { useSearchPagination } from "../_hooks/useSearchPagination";
import { Book } from "@/types/book";
import { useId } from "react";
import Heading from "@/app/_components/Heading";

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
