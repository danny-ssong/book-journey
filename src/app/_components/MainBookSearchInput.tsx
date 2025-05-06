"use client";
import { useRouter } from "next/navigation";
import BookSearchInput from "@/app/posts/_components/BookSearchInput";

export default function MainBookSearchInput() {
  const router = useRouter();
  return (
    <BookSearchInput
      onSelectBook={(book) => {
        if (book) {
          router.push(`/books/${book.isbn}`);
        }
      }}
      placeholder="책 제목, 작가를 검색하세요..."
      enableNavigateToBookDetailPage
    />
  );
}
