import RatingViewer from "@/app/_components/RatingViewer";
import getUserOnClient from "@/app/_lib/getUserOnClient";
import { PostWithBook } from "@/app/_types/supabaseTypes";
import PostActionButtons from "./PostPreviewButtons";
import dayjs from "dayjs";

export default function CompactPostPreviewForManage({ post, isOwner }: { post: PostWithBook; isOwner: boolean }) {
  return (
    <article className="last:border-none border-b-2 h-[130px] px-4 py-4 flex group">
      <div className="flex flex-col w-full">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <h2 className="text-md font-semibold">{post.book.title}</h2>
            <p className="text-xs">{post.book.author}</p>
          </div>
          <time dateTime={post.created_at || ""}>{dayjs(post.created_at).format("YYYY-MM-DD")}</time>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <RatingViewer rating={post.rating!} />
            <h1>{post.title}</h1>
          </div>
          {isOwner && <PostActionButtons postId={post.id} />}
        </div>
        <p className="w-full overflow-hidden text-sm text-ellipsis line-clamp-1 ">{post.content}</p>
      </div>
    </article>
  );
}
