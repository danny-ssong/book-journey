import RatingViewer from "@/app/_components/RatingViewer";
import { PostWithBook } from "@/types/post";
import PostActionButtons from "./PostPreviewButtons";
import dayjs from "dayjs";

export default function CompactPostPreviewForManage({
  post,
  isOwner,
}: {
  post: PostWithBook;
  isOwner: boolean;
}) {
  return (
    <article className="group flex border-b-2 px-4 py-4 last:border-none">
      <div className="flex w-full flex-col">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-md font-semibold">{post.book.title}</h2>
            <p className="text-xs">{post.book.author.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs">최근 수정일</p>
            <time dateTime={post.updatedAt.toString()}>
              {dayjs(post.updatedAt).format("YYYY-MM-DD")}
            </time>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="my-2">
            <RatingViewer rating={post.rating} />
            <h1>{post.title || "\u00A0"}</h1>
          </div>
          {isOwner && <PostActionButtons postId={post.id} />}
        </div>
        <p className="line-clamp-1 w-full overflow-hidden text-ellipsis text-sm">
          {post.content}
        </p>
      </div>
    </article>
  );
}
