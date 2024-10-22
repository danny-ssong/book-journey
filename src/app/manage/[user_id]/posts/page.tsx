import React from "react";
import { Database, Tables, Enums } from "@/types/database.types";
import PostPreview from "./_components/PostPreview";
import getUserPosts from "./_lib/getPosts";
import PaginationButtons from "./_components/PaginationButtons";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function page({ searchParams }: Props) {
  let page = parseInt(searchParams.page || "1");
  if (!page) page = 1;

  const size = 10;
  const { posts, isLastPage } = await getUserPosts(size, page);

  return (
    <div className="px-10">
      <h2 className="mb-5 text-xl ">글 관리</h2>
      <div className="">
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
        <PaginationButtons baseURL={"/manage/posts"} currentPage={page} isLastPage={isLastPage} />
      </div>
    </div>
  );
}
