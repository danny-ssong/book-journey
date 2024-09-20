"use client";
import React, { useState } from "react";
import BookSearchInput from "../posts/_components/BookSearchInput";

function BookSearchArea() {
  const [selectedBook, setSelectedBook] = useState("");

  return (
    <BookSearchInput
      onSelectBook={setSelectedBook}
      onSearchBook={undefined}
      selectedBook={selectedBook}
    />
  );
}

export default BookSearchArea;
