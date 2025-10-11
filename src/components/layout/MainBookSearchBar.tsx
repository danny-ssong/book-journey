"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import BookSearchBar from "../book/BookSearchBar";

export default function MainBookSearchBar() {
  const router = useRouter();
  const [selectedBookTitle, setSelectedBookTitle] = useState<
    string | undefined
  >(undefined);

  return (
    <BookSearchBar
      selectedBookTitle={selectedBookTitle}
      onSelectBook={(book) => {
        if (book) router.push(`/books/${book.isbn}`);

        setSelectedBookTitle(book?.title ?? undefined);
      }}
      placeholder="책 제목, 작가를 검색하세요..."
    />
  );
}
