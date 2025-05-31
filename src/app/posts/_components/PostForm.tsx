"use client";
import React, { useState } from "react";
import PostFormContent from "../_components/PostFormContent";
import BookSearchInput from "../_components/BookSearchInput";
import { Post } from "@/types/post";
import { useBeforeunload } from "../_hooks/useBeforeunload";
import { Book } from "@/types/book";

export default function PostForm({
  initPost,
  initBook,
}: {
  initPost?: Post;
  initBook?: Book;
}) {
  useBeforeunload();
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(initBook);

  return (
    <div className="flex h-full flex-col">
      <BookSearchInput
        selectedBook={selectedBook}
        onSelectBook={setSelectedBook}
      />
      <div className="mt-2 flex-1">
        <PostFormContent book={selectedBook} initPost={initPost} />
      </div>
    </div>
  );
}
