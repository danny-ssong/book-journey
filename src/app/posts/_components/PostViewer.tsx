import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";
import RatingViewer from "../../_components/RatingViewer";
import Link from "next/link";
import { PostWithBook } from "@/app/_types/supabaseTypes";
import getUserOnServer from "@/app/_lib/getUserOnServer";
import Button from "@/app/_components/Button";

export default async function PostViewer({ post }: { post: PostWithBook }) {
  const user = await getUserOnServer();
  const isOwner = user?.id === post.user_id;

  return (
    <div className="w-[800px]">
      <article className="flex flex-col ">
        <header className="flex flex-col px-4 py-4 mb-5 border bg-white">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-2xl">{post.book.title}</h3>
            <div>{`${dayjs(post.startDate).format("YYYY-MM-DD")} ~ ${dayjs(post.endDate).format("YYYY-MM-DD")}`}</div>
          </div>
          <RatingViewer rating={post.rating!} />
        </header>
        <div className="flex-1 px-4 py-4 bg-white border min-h-[500px]">
          <h3 className="text-xl mb-5">{post.title}</h3>
          <p className="w-full ">{post.content}</p>
        </div>
      </article>
      {isOwner && (
        <div className="w-full flex justify-end items-center mt-5">
          <Button>
            <Link href={`/posts/edit/${post.id}`}>수정</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
