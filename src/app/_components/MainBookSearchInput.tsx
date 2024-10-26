"use client";
import { use, useEffect, useRef, useState } from "react";
import searchBooks from "@/app/actions/searchBooks";
import { useRouter, useSearchParams } from "next/navigation";

export default function MainBookSearchInput() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [searchedBooks, setSearchedBooks] = useState<SearchedBook[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchQuery(query);
      setShowDropDown(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
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
    <div>
      <form
        onSubmit={handleSearchBook}
        className="w-[400px] h-10 flex justify-between items-center bg-white pl-4 pr-2 rounded-full border focus-within:ring-1  focus-within:ring-black"
      >
        <input
          ref={inputRef}
          className="w-[360px] h-full focus:outline-none"
          type="text"
          onChange={handleSearchInputChange}
          value={searchQuery}
          onFocus={handleInputFocus}
        />
        <svg
          width="24"
          height="24"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          onClick={handleSearchBook}
          className="cursor-pointer"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
      </form>
      <ul className="absolute bg-white min-w-[400px] max-w-[600px]">
        {showDropDown &&
          searchedBooks?.map((book: SearchedBook) => (
            <li
              key={book.isbn}
              className="px-4 py-2 cursor-pointer flex justify-between gap-4"
              onClick={() => handleSelectBook(book)}
            >
              <span className="w-16 h-16 truncate">
                <img src={book.thumbnail} alt={book.title} />
              </span>
              <p className="text-nowrap truncate max-w-[350px]">{book.title}</p>
              <p className="text-nowrap truncate max-w-[350px]">{book.authors[0]}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
