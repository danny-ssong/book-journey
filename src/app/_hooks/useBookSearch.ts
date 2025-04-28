"use client";
import { useEffect, useRef, useState } from "react";
import searchBooks from "../actions/searchBooks";

export default function useBookSearch(debounceMs: number = 500) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showingDropDown, setShowingDropDown] = useState<boolean>(false);
  const [searchedBooks, setSearchedBooks] = useState<SearchedBook[]>([]);
  const timeoutRef = useRef<number | null>(null);
  const ignoreRef = useRef(false);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setShowingDropDown(false);
      setSearchedBooks([]);
      return;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    ignoreRef.current = false;

    timeoutRef.current = window.setTimeout(async () => {
      const response = await searchBooks(searchQuery, 5);
      const books = response?.documents || [];
      setSearchedBooks(books);
      if (!ignoreRef.current) setShowingDropDown(true);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchQuery, debounceMs]);

  const closeDropDown = () => {
    setShowingDropDown(false);
    ignoreRef.current = true;
  };

  const openDropDown = () => {
    setShowingDropDown(true);
  };

  return {
    searchQuery,
    setSearchQuery,
    showingDropDown,
    openDropDown,
    closeDropDown,
    searchedBooks,
  };
}
