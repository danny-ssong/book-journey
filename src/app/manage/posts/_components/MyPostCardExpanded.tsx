import dayjs from "dayjs";
import RatingViewer from "../../../_components/RatingViewer";
import MyPostActionButtons from "./MyPostActionButtons";
import { PostWithBook } from "@/types/post";
import { Card } from "@/components/ui/card";

type Props = {
  post: PostWithBook;
};

function MyPostCardExpanded({ post }: Props) {
  const updatedAtId = `post-${post.id}-updated-at`;

  return (
    <Card>
      <article className="group flex gap-4 p-4">
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

          <div className="flex items-center justify-between py-1">
            <div className="mb-2">
              <h1 className="mt-2 line-clamp-1">{post.title || "\u00A0"}</h1>
              <RatingViewer rating={post.rating!} />
            </div>
            <MyPostActionButtons postId={post.id} />
          </div>
          <p className="line-clamp-3 text-sm">{post.content}</p>
        </div>
      </article>
    </Card>
  );
}

export default MyPostCardExpanded;
