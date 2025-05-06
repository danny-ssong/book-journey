import RatingViewer from "@/app/_components/RatingViewer";
import { Post } from "@/types/post";
import dayjs from "dayjs";
import Link from "next/link";

type Props = {
  post: Post;
};

export default function PostPreviewForBook({ post }: Props) {
  return (
    <div className="h-[180px] flex-col border-b-2 px-2 py-2 last:border-none">
      <div className="mb-2 flex w-full justify-between">
        <div>
          <RatingViewer rating={post.rating} />
          <p className="text-sm hover:underline">
            <Link href={`/users/${post.user.id}`}>
              {post.user.profile.nickname}
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs">최근 수정일</p>
          <time dateTime={post.updatedAt.toString()}>
            {dayjs(post.updatedAt).format("YYYY-MM-DD")}
          </time>
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-lg hover:underline">
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </p>
      </div>
      <p className="line-clamp-3 w-full flex-1 overflow-hidden text-ellipsis text-sm hover:underline">
        <Link href={`/posts/${post.id}`}>{post.content}</Link>
      </p>
    </div>
  );
}
