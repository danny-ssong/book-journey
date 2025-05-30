import { useEffect, useRef } from "react";
import useBookSearch from "@/app/_hooks/useBookSearch";
import SearchIcon from "@/components/ui/search-icon";
import { useRouter } from "next/navigation";
import { Book } from "@/types/book";
type Props = {
  selectedBook?: Book;
  onSelectBook: (book: Book | undefined) => void;
  placeholder?: string;
  enableNavigateToBookDetailPage?: boolean;
};

export default function BookSearchInput({
  selectedBook,
  onSelectBook,
  placeholder = "책 제목을 검색하세요...",
  enableNavigateToBookDetailPage = false,
}: Props) {
  const {
    searchQuery,
    setSearchQuery,
    showingDropDown,
    openDropDown,
    closeDropDown,
    searchedBooks,
  } = useBookSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  //책 검색 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleWindowClick = (event: MouseEvent) => {
      if (inputRef.current?.contains(event.target as Node)) return;
      closeDropDown();
    };

    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [closeDropDown]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSelectBook(undefined);
  };

  const handleSelectBook = (book: Book) => {
    onSelectBook(book);
    closeDropDown();
  };

  const handleInputFocus = () => {
    openDropDown();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enableNavigateToBookDetailPage) {
      closeDropDown();
      router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="relative">
      <form
        className="relative flex items-center gap-2"
        onSubmit={handleSearchSubmit}
      >
        <input
          ref={inputRef}
          className="h-full w-full rounded-lg border px-4 py-1 focus:outline-none sm:w-[360px] sm:py-2"
          type="text"
          onChange={handleSearchInputChange}
          value={selectedBook ? selectedBook.title : searchQuery}
          onFocus={handleInputFocus}
          placeholder={placeholder}
        />
        <div className="absolute right-2 hidden sm:block">
          <SearchIcon />
        </div>
      </form>
      {showingDropDown && searchedBooks.length > 0 && (
        <ul className="absolute w-80 bg-background sm:w-fit sm:max-w-[600px]">
          {searchedBooks.map((book: Book) => (
            <li
              key={book.isbn}
              className="flex cursor-pointer items-center gap-4 px-4 py-2 hover:bg-secondary"
              onClick={() => handleSelectBook(book)}
            >
              <figure className="sm:h-18 h-16 w-12 shrink-0 sm:w-12">
                <img
                  src={book.thumbnailUrl}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="flex flex-1 flex-col truncate sm:flex-row sm:items-center sm:gap-4">
                <p className="truncate">{book.title}</p>
                <p className="truncate text-nowrap text-sm text-muted-foreground sm:text-base">
                  {book.author.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
