import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  isLastPage: boolean;
  onPageChange: (page: number) => void;
}

export default function PaginationButtonsForClient({
  page,
  isLastPage,
  onPageChange,
}: PaginationProps) {
  return (
    <nav
      className="mt-4 flex justify-center gap-10"
      aria-label="페이지 네비게이션"
    >
      <Button
        className={`px-4 py-2 ${page === 1 && "opacity-50"}`}
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        aria-label="이전 페이지"
      >
        {"<"}
      </Button>
      <Button
        className={`px-4 py-2 ${isLastPage && "opacity-50"}`}
        onClick={() => onPageChange(page + 1)}
        disabled={isLastPage}
        aria-label="다음 페이지"
      >
        {">"}
      </Button>
    </nav>
  );
}
