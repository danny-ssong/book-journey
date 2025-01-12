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
    <article className="group flex h-44 gap-4 border-b-2 px-4 py-4 last:border-none">
      <figure className="flex items-center justify-center border">
        <Image
          src={post.book.thumbnail || ""}
          alt={post.book.title}
          width={120}
          height={160}
          className="h-[160px] w-[120px]"
        />
      </figure>
      <div className="flex w-full flex-col">
        <div className="flex w-full justify-between">
          <div className="flex w-[400px] items-center gap-2">
            <h2 className="text-md line-clamp-1 font-semibold">
              {post.book.title}
            </h2>
            <p className="text-nowrap text-xs">{post.book.author}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs">최근 수정일</p>
            <time dateTime={post.updated_at || ""}>
              {dayjs(post.updated_at).format("YYYY-MM-DD")}
            </time>
          </div>
        </div>
        <div className="flex items-center justify-between py-1">
          <div>
            <RatingViewer rating={post.rating!} />
            <h1>{post.title}</h1>
          </div>
          {isOwner && <PostActionButtons postId={post.id} />}
        </div>
        <p className="line-clamp-3 w-full overflow-hidden text-ellipsis text-sm">
          {post.content}
        </p>
      </div>
    </article>
  );
}

export default ExpandedPostPreviewForManage;
