import RatingViewer from "@/app/_components/RatingViewer";
import { PostWithBook } from "@/types/post";
import MyPostActionButtons from "./MyPostActionButtons";
import dayjs from "dayjs";

export default function MyPostCardCompact({ post }: { post: PostWithBook }) {
  const updatedAtId = `post-${post.id}-updated-at`;

  return (
    <article className="group flex border-b-2 px-4 py-4 last:border-none">
      <div className="flex w-full flex-col">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-md font-semibold">{post.book.title}</h2>
            <p className="text-xs">{post.book.author.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs" id={updatedAtId}>
              최근 수정일
            </span>
            <time
              dateTime={post.updatedAt.toString()}
              aria-labelledby={updatedAtId}
            >
              {dayjs(post.updatedAt).format("YYYY-MM-DD")}
            </time>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="my-2">
            <RatingViewer rating={post.rating!} />
            <h1>{post.title || "\u00A0"}</h1>
          </div>
          <MyPostActionButtons postId={post.id} />
        </div>

        <p className="line-clamp-1 text-sm">{post.content}</p>
      </div>
    </article>
  );
}
