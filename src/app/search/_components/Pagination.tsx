interface PaginationProps {
  page: number;
  isLastPage: boolean;
  onPageChange: (page: number) => void;
}

export default function PaginationForClient({ page, isLastPage, onPageChange }: PaginationProps) {
  return (
    <nav className="flex justify-center gap-10 mt-4" aria-label="페이지 네비게이션">
      <button
        className={`px-4 py-2 bg-gray-200 ${page === 1 && "opacity-50"}`}
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        aria-label="이전 페이지"
      >
        {"<"}
      </button>
      <button
        className={`px-4 py-2 bg-gray-200 ${isLastPage && "opacity-50"}`}
        onClick={() => onPageChange(page + 1)}
        disabled={isLastPage}
        aria-label="다음 페이지"
      >
        {">"}
      </button>
    </nav>
  );
}
