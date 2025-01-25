import { createClient } from "@/utils/supabase/server";
import dayjs from "dayjs";
import RatingViewer from "../../_components/RatingViewer";
import Link from "next/link";
import { PostWithUserProfileAndBook } from "@/app/_models/supabaseTypes";
import getUserOnServer from "@/app/_lib/getUserOnServer";
import Button from "@/app/_components/Button";
import EditIcon from "@/app/_components/_icons/EditIcon";

export default async function PostViewer({
  post,
}: {
  post: PostWithUserProfileAndBook;
}) {
  const user = await getUserOnServer();
  const isOwner = user?.id === post.user_id;

  return (
    <div className="h-full w-[800px]">
      <article className="flex h-full flex-col">
        <header className="mb-5 flex flex-col border bg-white px-4 py-4">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-end gap-2">
              <h2 className="text-2xl">{post.book.title}</h2>
              <p className="text-sm text-gray-600">{post.book.author}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs">읽은 날짜</p>
              <p>{`${dayjs(post.start_date).format("YYYY")}년 ${dayjs(post.start_date).format("MM")}월`}</p>
            </div>
          </div>
          <p className="mt-2">{post.profile.username}</p>
          <RatingViewer rating={post.rating!} />
        </header>
        <div className="flex flex-1 flex-col border bg-white px-4 py-4">
          <main className="flex-1">
            <h1 className="mb-5 text-xl">{post.title}</h1>
            <p className="w-full whitespace-pre-line">{post.content}</p>
          </main>
          <footer>
            {isOwner && (
              <div className="mt-5 flex w-full items-center justify-end">
                <Link
                  href={`/posts/edit/${post.id}`}
                  className="relative rounded-md hover:bg-slate-100"
                >
                  <EditIcon width={36} height={36} />
                </Link>
              </div>
            )}
          </footer>
        </div>
      </article>
    </div>
  );
}
