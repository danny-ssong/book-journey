import { use, useEffect, useState } from "react";
import searchBooks from "@/app/actions/searchBooks";

type Props = {
  selectedBook: any;
  onSelectBook: (book: any) => void;
  onSearchBook?: (query: string) => void;
};

export default function BookSearchInput({ selectedBook, onSelectBook, onSearchBook = undefined }: Props) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [searchedBooks, setSearchedBooks] = useState<SearchedBook[]>([]);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setShowDropDown(false);
      return;
    }
    setShowDropDown(true);
    const searchBookListHandler = setTimeout(async () => {
      const object = await searchBooks(searchQuery, 5);
      const books = object.documents?.map((document: SearchedBook) => document);

      setSearchedBooks(books);
    }, 1000);

    return () => {
      clearTimeout(searchBookListHandler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleWindowClick = () => setShowDropDown(false);

    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleSearchBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!!onSearchBook) {
      onSearchBook(searchQuery);
    }
  };

  const handleSelectBook = (book: SearchedBook) => {
    setShowDropDown(false);
    onSelectBook(book);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSelectBook(null);
  };

  return (
    <div>
      <form
        onSubmit={handleSearchBook}
        className="w-[400px] h-10 flex justify-between items-center bg-slate-200 pl-4 pr-2 rounded-full"
      >
        <input
          className="w-[360px] h-full"
          type="text"
          onChange={handleSearchInputChange}
          value={selectedBook ? selectedBook.title : searchQuery}
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
              <span className="text-nowrap truncate max-w-[350px]">{book.title}</span>
              <span className="text-nowrap truncate max-w-[350px]">{book.authors[0]}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
