"use client";

import { useRouter } from "next/navigation";

import BookSearchBar from "../book/BookSearchBar";

export default function MainBookSearchBar() {
  const router = useRouter();
  return (
    <BookSearchBar
      selectedBookTitle={undefined}
      onSelectBook={(book) => {
        if (book) {
          router.push(`/books/${book.isbn}`);
        }
      }}
      placeholder="책 제목, 작가를 검색하세요..."
    />
  );
}
