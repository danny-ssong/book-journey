import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";
import RatingViewer from "../../_components/RatingViewer";
import Link from "next/link";
import { PostWithBook } from "@/app/_types/supabaseTypes";
import getUserOnServer from "@/app/_lib/getUserOnServer";

export default async function PostViewer({ post }: { post: PostWithBook }) {
  const user = await getUserOnServer();
  const isOwner = user?.id === post.user_id;

  return (
    <div>
      <article className="border min-h-[800px] flex flex-col">
        <header className="flex flex-col border-b px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl">{post.books.title}</h3>
            <div>{`${dayjs(post.startDate).format("YYYY-MM-DD")} ~ ${dayjs(post.endDate).format("YYYY-MM-DD")}`}</div>
          </div>
          <RatingViewer rating={post.rating!} />
        </header>
        <div className="flex-1 px-4 py-8">
          <h3 className="text-xl ">{post.title}</h3>
          <p className="w-full ">{post.content}</p>
        </div>
      </article>
      {isOwner && (
        <div className="w-full flex justify-end items-center mt-5">
          <Link href={`/posts/edit/${post.id}`} className="px-4 py-2 border border-black rounded-full">
            수정
          </Link>
        </div>
      )}
    </div>
  );
}
