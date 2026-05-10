"use client";

import { useState } from "react";

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
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";

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

  const handleInputChange = (value: string) => {
    setQuery(value);
    onSelectBook(null);
    setIsOpen(value.length >= 1);
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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverAnchor className={cn(className)}>
        <Command shouldFilter={false} className="rounded-lg border shadow-md">
          <CommandInput
            placeholder={placeholder}
            value={selectedBookTitle ?? query}
            onValueChange={handleInputChange}
            onFocus={() => query.length >= 1 && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            aria-label="책 검색 입력창"
          />
          <PopoverContent
            className="w-[360px] p-0"
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <CommandList>
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
                        className="w-10 h-14"
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate font-medium">
                          {book.title}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {book.author.name}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </PopoverContent>
        </Command>
      </PopoverAnchor>
    </Popover>
  );
}
