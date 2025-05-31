import dayjs from "dayjs";
import RatingViewer from "../../../_components/RatingViewer";
import PostActionButtons from "./PostPreviewButtons";
import { PostWithBook } from "@/types/post";

function ExpandedPostPreviewForManage({
  post,
  isOwner,
}: {
  post: PostWithBook;
  isOwner: boolean;
}) {
  return (
    <>
      {/* 데스크탑 레이아웃 */}
      <article className="group hidden gap-4 border-b-2 px-4 py-4 last:border-none sm:flex">
        <figure className="h-[160px] w-[120px] overflow-hidden rounded-md border">
          <img
            src={post.book.thumbnailUrl || ""}
            alt={post.book.title}
            className="h-full w-full object-fill"
          />
        </figure>
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-between">
            <div className="flex w-[400px] items-center gap-2">
              <h2 className="text-md line-clamp-1 font-semibold">
                {post.book.title}
              </h2>
              <p className="text-nowrap text-xs text-muted-foreground">
                {post.book.author.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs">최근 수정일</p>
              <time dateTime={post.updatedAt.toString()}>
                {dayjs(post.updatedAt).format("YYYY-MM-DD")}
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
      {/* 모바일 레이아웃 */}
      <article className="group flex flex-col gap-4 border-b-2 px-4 py-4 last:border-none sm:hidden">
        <div className="flex w-full">
          <figure className="mr-4 h-[140px] w-[120px] overflow-hidden rounded-md border">
            <img
              src={post.book.thumbnailUrl || ""}
              alt={post.book.title}
              className="h-full w-full object-fill"
            />
          </figure>
          <div className="flex w-full flex-col justify-between">
            <h2 className="text-md line-clamp-1 font-semibold">
              {post.book.title}
            </h2>
            <p className="text-nowrap text-xs text-muted-foreground">
              {post.book.author.name}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <p>최근 수정일</p>
              <time dateTime={post.updatedAt.toString()}>
                {dayjs(post.updatedAt).format("YYYY-MM-DD")}
              </time>
            </div>
            <div className="relative py-1">
              <RatingViewer rating={post.rating!} />
              <h1 className="mt-2 line-clamp-1">{post.title || "\u00A0"}</h1>
              <div className="absolute right-0 top-0">
                {isOwner && <PostActionButtons postId={post.id} />}
              </div>
            </div>
          </div>
        </div>
        <p className="line-clamp-3 min-h-[3.75rem] w-full overflow-hidden text-ellipsis text-sm">
          {post.content}
        </p>
      </article>
    </>
  );
}

export default ExpandedPostPreviewForManage;
