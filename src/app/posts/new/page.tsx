"use client";
import { useState } from "react";
import PostForm from "../_components/PostForm";
import BookSearchInput from "../_components/BookSearchInput";

export default function Page() {
  const [selectedBook, setSelectedBook] = useState<SearchedBook | undefined>(undefined);
  return (
    <main className="w-[800px] px-4 flex flex-col gap-5">
      <BookSearchInput selectedBook={selectedBook} onSelectBook={setSelectedBook} />
      <PostForm book={selectedBook} />
    </main>
  );
}
