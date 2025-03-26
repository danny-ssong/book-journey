import dayjs from "dayjs";
import RatingViewer from "../../../_components/RatingViewer";
import PostActionButtons from "./PostPreviewButtons";
import { PostWithBook } from "@/app/_models/supabaseTypes";
import Image from "next/image";

function ExpandedPostPreviewForManage({
  post,
  isOwner,
}: {
  post: PostWithBook;
  isOwner: boolean;
}) {
  return (
    <article className="group flex gap-4 border-b-2 px-4 py-4 last:border-none">
      <figure className="overflow-hidden rounded-md border">
        <Image
          src={post.book.thumbnail || ""}
          alt={post.book.title}
          width={120}
          height={174}
          className="h-full"
        />
      </figure>
      <div className="flex w-full flex-col">
        <div className="flex w-full justify-between">
          <div className="flex w-[400px] items-center gap-2">
            <h2 className="text-md line-clamp-1 font-semibold">
              {post.book.title}
            </h2>
            <p className="text-nowrap text-xs text-muted-foreground">
              {post.book.author}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs">최근 수정일</p>
            <time dateTime={post.updated_at || ""}>
              {dayjs(post.updated_at).format("YYYY-MM-DD")}
            </time>
          </div>
        </div>
        <div className="flex items-center justify-between py-1">
          <div className="mb-2">
            <RatingViewer rating={post.rating!} />
            <h1 className="mt-2 line-clamp-1">{post.title || "\u00A0"}</h1>
          </div>
          {isOwner && <PostActionButtons postId={post.id} />}
        </div>
        <p className="line-clamp-3 min-h-[3.75rem] w-full overflow-hidden text-ellipsis text-sm">
          {post.content}
        </p>
      </div>
    </article>
  );
}

export default ExpandedPostPreviewForManage;
