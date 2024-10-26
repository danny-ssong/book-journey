"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function PaginationButtons({ baseURL, currentPage: initPage, isLastPage }: { baseURL: string; currentPage: number; isLastPage: boolean }) {
  const [currentPage, setCurrentPage] = useState<number>(initPage);
  const router = useRouter();

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    router.push(`${baseURL}?page=${pageNumber}`);
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        className={`px-4 py-2 bg-gray-200 ${currentPage === 1 && "opacity-50"}`}
        onClick={() => goToPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      <button
        className={`px-4 py-2 bg-gray-200 ${isLastPage && "opacity-50"}`}
        onClick={() => goToPage(currentPage + 1)}
        disabled={isLastPage}
      >
        {">"}
      </button>
    </div>
  );
}

export default PaginationButtons;
