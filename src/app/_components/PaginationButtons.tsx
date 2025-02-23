"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function PaginationButtons({
  baseURL,
  currentPage: initPage,
  isLastPage,
}: {
  baseURL: string;
  currentPage: number;
  isLastPage: boolean;
}) {
  const [currentPage, setCurrentPage] = useState<number>(initPage);
  const router = useRouter();

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    router.push(`${baseURL}?page=${pageNumber}`);
  };

  return (
    <div className="mt-4 flex justify-center gap-4">
      <Button
        className={`px-4 py-2 ${currentPage === 1 && "opacity-50"}`}
        onClick={() => goToPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        {"<"}
      </Button>
      <Button
        className={`px-4 py-2 ${isLastPage && "opacity-50"}`}
        onClick={() => goToPage(currentPage + 1)}
        disabled={isLastPage}
      >
        {">"}
      </Button>
    </div>
  );
}

export default PaginationButtons;
