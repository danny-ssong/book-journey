"use client";
import React, { useState } from "react";
import PostFormContent from "../_components/PostFormContent";
import BookSearchInput from "../_components/BookSearchInput";
import { Post } from "@/app/_types/supabaseTypes";

function PostForm({ initPost, initBook }: { initPost?: Post; initBook?: SearchedBook }) {
  const [selectedBook, setSelectedBook] = useState<SearchedBook | undefined>(initBook);

  return (
    <>
      <BookSearchInput selectedBook={selectedBook} onSelectBook={setSelectedBook} />
      <PostFormContent book={selectedBook} initPost={initPost} />
    </>
  );
}

export default PostForm;
