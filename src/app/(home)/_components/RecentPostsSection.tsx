"use client";
import Heading from "@/app/_components/Heading";
import { useId } from "react";
import InfinitePostList from "@/app/_components/InfinitePostList";

export default function RecentPostsSection() {
  const headerId = useId();

  return (
    <section aria-labelledby={headerId}>
      <Heading
        text="최신 글"
        id={headerId}
        variant="h1"
        className="mb-5 px-4"
      />
      <InfinitePostList type="all" />
    </section>
  );
}
