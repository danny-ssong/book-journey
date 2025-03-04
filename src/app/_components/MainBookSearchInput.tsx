"use client";
import { use, useEffect, useRef, useState } from "react";
import searchBooks from "@/app/actions/searchBooks";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { createPortal } from "react-dom";

export default function MainBookSearchInput() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [searchedBooks, setSearchedBooks] = useState<SearchedBook[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchQuery(query);
      setShowDropDown(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else {
      setSearchQuery("");
    }
  }, [searchParams]);

  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowDropDown(false);
      }
    };
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleSearchBook = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${searchQuery}`);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (query.length < 2) {
      setShowDropDown(false);
      setSearchedBooks([]);
      return;
    }

    timeoutRef.current = window.setTimeout(async () => {
      const response = await searchBooks(query, 5);
      const books = response?.documents;
      setSearchedBooks(books || []);
      setShowDropDown(true);
    }, 500);
  };

  const handleSelectBook = (book: SearchedBook) => {
    router.push(`/books/${book.isbn}`);
  };

  const handleInputFocus = () => {
    setShowDropDown(true);
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSearchBook}
        className="flex h-10 w-[400px] items-center justify-between rounded-lg border pl-4 pr-2 focus-within:ring-1 focus-within:ring-black"
      >
        <input
          ref={inputRef}
          className="h-full w-[360px] focus:outline-none"
          type="text"
          onChange={handleSearchInputChange}
          value={searchQuery}
          onFocus={handleInputFocus}
          placeholder="책 제목, 작가를 검색하세요..."
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          onClick={handleSearchBook}
          className="h-6 w-6 cursor-pointer"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
      </form>

      {isMounted &&
        showDropDown &&
        searchedBooks.length > 0 &&
        createPortal(
          <div
            className="pointer-events-none fixed inset-0 z-40 bg-transparent"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="pointer-events-auto absolute z-50"
              style={{
                top: inputRef.current
                  ? inputRef.current.getBoundingClientRect().bottom +
                    window.scrollY
                  : 0,
                left: inputRef.current
                  ? inputRef.current.getBoundingClientRect().left +
                    window.scrollX -
                    20
                  : 0,
                width: "500px",
              }}
            >
              <ul className="mt-1 min-w-[400px] max-w-[600px] rounded-md border bg-background shadow-lg">
                {searchedBooks?.map((book: SearchedBook) => (
                  <li
                    key={book.isbn}
                    className="flex cursor-pointer justify-between gap-4 border-b px-4 py-2 hover:bg-secondary"
                    onClick={() => handleSelectBook(book)}
                  >
                    <span className="h-18 w-12 truncate">
                      <Image
                        src={book.thumbnail}
                        alt={book.title}
                        width={48}
                        height={64}
                      />
                    </span>
                    <p className="max-w-[350px] truncate text-nowrap">
                      {book.title}
                    </p>
                    <p className="max-w-[350px] truncate text-nowrap">
                      {book.authors[0]}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
