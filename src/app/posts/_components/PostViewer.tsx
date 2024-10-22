import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";
import { Database, Tables, Enums } from "@/types/database.types";
import RatingViewer from "../../_components/RatingViewer";
import Link from "next/link";

type PostWithBook = Tables<"posts"> & {
  books: {
    title: string;
    author: string;
  };
};

export default async function PostViewer({ post }: { post: PostWithBook }) {
  const supabse = createClient();
  const { data, error } = await supabse.auth.getUser();
  const isOwner = data.user?.id === post.user_id;

  return (
    <>
      <article className="border min-h-[800px] px-4 py-8 flex flex-col">
        <header className="flex flex-col mb-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl">{post.books.title}</h3>
            <div>{`${dayjs(post.startDate).format("YYYY-MM-DD")} ~ ${dayjs(post.endDate).format("YYYY-MM-DD")}`}</div>
          </div>
          <RatingViewer rating={post.rating!} />
        </header>
        <div className="flex-1">
          <h3 className="text-xl mb-4">{post.title}</h3>
          <p className="w-full ">{post.content}</p>
        </div>
      </article>
      {isOwner && (
        <div className="w-full flex justify-end items-center">
          <Link href={`/posts/edit/${post.id}`} className="px-4 py-2 border border-black rounded-full">
            수정
          </Link>
        </div>
      )}
    </>
  );
}
