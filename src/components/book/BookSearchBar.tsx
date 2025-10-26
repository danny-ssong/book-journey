import { useEffect, useId, useRef, useState } from "react";

import BookThumbnail from "@/components/post/BookThumbnail";
import SearchIcon from "@/components/ui/search-icon";

import useBookSearch from "@/hooks/useBookSearch";
import { SearchedBook } from "@/types/book";

type Props = {
  selectedBookTitle?: string;
  onSelectBook: (book: SearchedBook | null) => void;
  onSearchQuery?: (query: string) => void;
  placeholder?: string;
};

export default function BookSearchBar({
  selectedBookTitle,
  onSelectBook,
  onSearchQuery,
  placeholder = "책 제목을 검색하세요...",
}: Props) {
  const { query, setQuery, books, isLoading, isDebouncing } = useBookSearch();
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 책 검색 창 이외의 부분 클릭 시 드랍다운 닫기
  useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      if (inputRef.current?.contains(event.target as Node)) return;
      setIsShowDropDown(false);
    };

    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [setIsShowDropDown]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
    onSelectBook(null);
  };

  const handleSelectBook = (book: SearchedBook) => {
    onSelectBook(book);
    setIsShowDropDown(false);
  };

  const handleInputFocus = () => {
    setIsShowDropDown(true);
  };

  return (
    <div className="relative">
      <div className="relative flex w-[360px] items-center">
        <input
          tabIndex={0}
          ref={inputRef}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none"
          type="text"
          aria-label="책 검색 입력창"
          onChange={handleSearchInputChange}
          value={selectedBookTitle ?? query}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearchQuery?.(query);
              setIsShowDropDown(false);
            }
          }}
        />
        <SearchIcon className="absolute right-2" />
      </div>
      {isShowDropDown && (
        <div className="absolute">
          {query.length < 2 ? (
            <p className="p-2">검색어를 2자 이상 입력해주세요.</p>
          ) : isDebouncing || isLoading ? (
            <p className="p-2">검색중...</p>
          ) : books.length === 0 ? (
            <p className="p-2">검색된 책이 없습니다.</p>
          ) : (
            <ul
              className="w-fit max-w-[600px] bg-background"
              aria-label="책 검색 결과"
            >
              {books.map((book: SearchedBook) => (
                <li
                  tabIndex={0}
                  key={book.isbn}
                  className="flex cursor-pointer items-center gap-4 px-2 py-2 hover:bg-secondary"
                  onClick={() => handleSelectBook(book)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSelectBook(book);
                  }}
                >
                  <BookThumbnail
                    title={book.title}
                    thumbnailUrl={book.thumbnailUrl}
                    width={48}
                    height={64}
                  />
                  <p className="truncate">{book.title}</p>
                  <p className="truncate text-nowrap text-muted-foreground">
                    {book.author.name}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
