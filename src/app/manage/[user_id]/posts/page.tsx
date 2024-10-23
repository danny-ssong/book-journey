import React from "react";
import { Database, Tables, Enums } from "@/types/database.types";
import PostPreview from "./_components/PostPreview";
import getUserPosts from "./_lib/getPosts";
import PaginationButtons from "./_components/PaginationButtons";

type Props = {
  params: {
    page: string;
  };
};

export default async function page({ params }: Props) {
  let page = parseInt(params.page || "1");
  if (!page) page = 1;

  const size = 10;
  const { posts, isLastPage } = await getUserPosts(size, page);

  return (
    <div className="flex justify-center">
      <div className="px-4">
        <h2 className="mb-5 text-xl px-4">글 관리</h2>
        <div className="">
          {[...posts.reverse()].map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
          <PaginationButtons baseURL={"/manage/posts"} currentPage={page} isLastPage={isLastPage} />
        </div>
      </div>
    </div>
  );
}
