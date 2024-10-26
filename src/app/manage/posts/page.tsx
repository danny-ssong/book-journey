import React from "react";
import { Database, Tables, Enums } from "@/types/database.types";
import PostPreview from "./_components/PostPreview";
import getUserPosts from "./_lib/getPosts";
import PaginationButtons from "./_components/PaginationButtons";
import getUserOnServer from "@/app/_lib/getUserOnServer";
import { notFound } from "next/navigation";

type Props = {
  params: {
    page: string;
  };
};

export default async function page({ params }: Props) {
  let page = parseInt(params.page || "1");
  if (!page) page = 1;

  const user = await getUserOnServer();
  if (!user) notFound();

  const size = 10;
  const { postsWithBook, isLastPage } = await getUserPosts(user.id, size, page);

  return (
    <div className="mt-5">
      <h2 className="mb-5 text-xl px-4">글 관리</h2>
      <div>
        <ul className="min-h-[500px] bg-white border">
          {[...postsWithBook.reverse()].map((post, index) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </ul>
        <PaginationButtons baseURL={"/manage/posts"} currentPage={page} isLastPage={isLastPage} />
      </div>
    </div>
  );
}
