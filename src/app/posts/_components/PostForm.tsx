"use client";
import React, { useState } from "react";
import PostFormContent from "../_components/PostFormContent";
import BookSearchInput from "../_components/BookSearchInput";
import { Post } from "@/app/_models/supabaseTypes";

function PostForm({
  initPost,
  initBook,
}: {
  initPost?: Post;
  initBook?: SearchedBook;
}) {
  const [selectedBook, setSelectedBook] = useState<SearchedBook | undefined>(
    initBook,
  );

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
