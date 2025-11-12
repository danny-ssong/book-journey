"use client";

import { useId } from "react";

import Heading from "@/components/common/Heading";
import InfinitePostList from "@/components/post/InfinitePostList";

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
