import RatingViewer from "@/app/_components/RatingViewer";
import { PostWithUserProfileAndBook } from "@/app/_types/supabaseTypes";
import dayjs from "dayjs";
import Link from "next/link";

export default function PostPreview({ post }: { post: PostWithUserProfileAndBook }) {
  return (
    <div className="last:border-none flex-col border-b-2 h-[200px] px-2 py-2">
      <div className="flex justify-between w-full mb-2">
        <div>
          <Link href={`books/${post.book.isbn}`}>
            <p className="hover:underline font-semibold">{post.book.title}</p>
          </Link>
          <RatingViewer rating={post.rating!} />
          <Link className="hover:underline" href={`/users/${post.user_id}`}>
            <p className="text-sm">{post.profile.username}</p>
          </Link>
        </div>
        <div>{dayjs(post.created_at).format("YYYY-MM-DD")}</div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <Link href={`/posts/${post.id}`}>
          <p className="hover:underline text-lg">{post.title}</p>
        </Link>
      </div>
      <Link href={`/posts/${post.id}`}>
        <p className="hover:underline w-full flex-1 overflow-hidden text-sm text-ellipsis line-clamp-3 ">
          {post.content}
        </p>
      </Link>
    </div>
  );
}
