"use client";
import React, { useState } from "react";
import PostFormContent from "../_components/PostFormContent";
import BookSearchInput from "../_components/BookSearchInput";
import { Post } from "@/types/post";
import { useBeforeunload } from "../_hooks/useBeforeunload";
import { Book } from "@/types/book";

function PostForm({
  initPost,
  initBook,
}: {
  initPost?: Post;
  initBook?: Book;
}) {
  useBeforeunload();

  const [selectedBook, setSelectedBook] = useState<Book | undefined>(initBook);

  return (
    <div className="flex h-full w-[800px] flex-col">
      <BookSearchInput
        selectedBook={selectedBook}
        onSelectBook={setSelectedBook}
      />
      <div className="flex-1">
        <PostFormContent book={selectedBook} initPost={initPost} />
      </div>
    </div>
  );
}

export default PostForm;
