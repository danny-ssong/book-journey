"use client";
import { useEffect, useRef } from "react";

type InfiniteScrollProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
};

export default function InfiniteScroll({
  fetchNextPage,
  hasNextPage,
  isLoading,
  children,
}: InfiniteScrollProps) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef, hasNextPage, fetchNextPage]);

  return (
    <>
      {children}
      <div ref={loaderRef} style={{ height: 40 }} />
      {isLoading && <div>로딩중...</div>}
    </>
  );
}
