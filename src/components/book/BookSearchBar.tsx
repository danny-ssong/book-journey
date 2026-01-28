"use client";

import { useEffect, useRef, useState } from "react";

import Loading from "@/components/common/Loading";
import BookThumbnail from "@/components/post/BookThumbnail";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import useBookSearch from "@/hooks/useBookSearch";
import { cn } from "@/lib/utils";
import { SearchedBook } from "@/types/book";

type Props = {
  selectedBookTitle?: string;
  onSelectBook: (book: SearchedBook | null) => void;
  onSearchQuery?: (query: string) => void;
  placeholder?: string;
  className?: string;
};

export default function BookSearchBar({
  selectedBookTitle,
  onSelectBook,
  onSearchQuery,
  placeholder = "책 제목을 검색하세요...",
  className = "",
}: Props) {
  const { query, setQuery, books, isLoading, isDebouncing } = useBookSearch();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    onSelectBook(null);
    if (value.length >= 1) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelectBook = (book: SearchedBook) => {
    onSelectBook(book);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.length >= 2) {
      onSearchQuery?.(query);
      setIsOpen(false);
    }
  };

  const showLoading = isDebouncing || isLoading;
  const showResults = query.length >= 2 && !showLoading;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <Command
        className="overflow-visible rounded-lg border shadow-md"
        shouldFilter={false}
      >
        <CommandInput
          placeholder={placeholder}
          value={selectedBookTitle ?? query}
          onValueChange={handleInputChange}
          onFocus={() => query.length >= 1 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label="책 검색 입력창"
        />
        {isOpen && (
          <div role="status" aria-label="책 검색 결과">
            <CommandList className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95">
            {query.length < 2 && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                검색어를 2자 이상 입력해주세요.
              </div>
            )}

            {showLoading && <Loading text="검색 중..." variant="inline" />}

            {showResults && books.length === 0 && (
              <CommandEmpty>검색된 책이 없습니다.</CommandEmpty>
            )}

            {showResults && books.length > 0 && (
              <CommandGroup heading="검색 결과">
                {books.map((book: SearchedBook) => (
                  <CommandItem
                    key={book.isbn}
                    value={book.isbn}
                    onSelect={() => handleSelectBook(book)}
                    className="cursor-pointer gap-3 p-2"
                  >
                    <BookThumbnail
                      title={book.title}
                      thumbnailUrl={book.thumbnailUrl}
                      width={40}
                      height={56}
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate font-medium">{book.title}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {book.author.name}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
}
